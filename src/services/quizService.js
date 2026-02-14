import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Create a new quiz and save to Supabase
 * @param {Object} quizData - { title, questions, timeLimit, teacherId }
 * @returns {Promise<{id: string} | null>}
 */
export async function createQuiz({ title, questions, timeLimit = 600, teacherId = null }) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Quiz will not be saved.');
        return null;
    }

    const insertData = {
        title,
        questions,
        time_limit: timeLimit
    };

    // Only add teacher_id if provided
    if (teacherId) {
        insertData.teacher_id = teacherId;
    }

    const { data, error } = await supabase
        .from('quizzes')
        .insert([insertData])
        .select('id')
        .single();

    if (error) {
        console.error('Error creating quiz:', error);
        return null;
    }

    return data;
}

/**
 * Get a quiz by ID
 * @param {string} id - Quiz ID
 * @returns {Promise<Object | null>}
 */
export async function getQuiz(id) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot fetch quiz.');
        return null;
    }

    const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching quiz:', error);
        return null;
    }

    return data;
}

/**
 * Save a quiz attempt
 * @param {Object} attemptData - { quizId, studentName, score, total, timeTaken }
 * @returns {Promise<Object | null>}
 */
export async function saveAttempt({ quizId, studentName, score, total, timeTaken }) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Attempt will not be saved.');
        return null;
    }

    const { data, error } = await supabase
        .from('attempts')
        .insert([
            {
                quiz_id: quizId,
                student_name: studentName,
                score,
                total,
                time_taken: timeTaken
            }
        ])
        .select()
        .single();

    if (error) {
        console.error('Error saving attempt:', error);
        return null;
    }

    return data;
}

/**
 * Get leaderboard for a quiz (sorted by score desc, then time asc)
 * @param {string} quizId - Quiz ID
 * @returns {Promise<Array>}
 */
export async function getLeaderboard(quizId) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Returning empty leaderboard.');
        return [];
    }

    const { data, error } = await supabase
        .from('attempts')
        .select('*')
        .eq('quiz_id', quizId)
        .order('score', { ascending: false })
        .order('time_taken', { ascending: true });

    if (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }

    return data || [];
}

/**
 * Generate shareable quiz URL
 * @param {string} quizId - Quiz ID
 * @returns {string}
 */
export function getQuizShareUrl(quizId) {
    return `${window.location.origin}/quiz/${quizId}/start`;
}

/**
 * Get all quizzes for a specific teacher
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<Array>}
 */
export async function getTeacherQuizzes(teacherId) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Returning empty quizzes list.');
        return [];
    }

    const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching teacher quizzes:', error);
        return [];
    }

    return data || [];
}

/**
 * Get quiz count stats for a teacher
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<{totalQuizzes: number, totalAttempts: number}>}
 */
export async function getTeacherStats(teacherId) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Returning zero stats.');
        return { totalQuizzes: 0, totalAttempts: 0 };
    }

    // Get quizzes
    const { data: quizzes, error: quizError } = await supabase
        .from('quizzes')
        .select('id')
        .eq('teacher_id', teacherId);

    if (quizError) {
        console.error('Error fetching stats:', quizError);
        return { totalQuizzes: 0, totalAttempts: 0 };
    }

    const quizIds = quizzes?.map(q => q.id) || [];

    if (quizIds.length === 0) {
        return { totalQuizzes: 0, totalAttempts: 0 };
    }

    // Get attempts for those quizzes
    const { count, error: attemptError } = await supabase
        .from('attempts')
        .select('*', { count: 'exact', head: true })
        .in('quiz_id', quizIds);

    if (attemptError) {
        console.error('Error fetching attempt stats:', attemptError);
        return { totalQuizzes: quizIds.length, totalAttempts: 0 };
    }

    return {
        totalQuizzes: quizIds.length,
        totalAttempts: count || 0
    };
}

/**
 * Update a quiz
 * @param {string} quizId - Quiz ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object | null>}
 */
export async function updateQuiz(quizId, updates) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Quiz will not be updated.');
        return null;
    }

    const { data, error } = await supabase
        .from('quizzes')
        .update(updates)
        .eq('id', quizId)
        .select()
        .single();

    if (error) {
        console.error('Error updating quiz:', error);
        return null;
    }

    return data;
}

/**
 * Delete a quiz
 * @param {string} quizId - Quiz ID
 * @returns {Promise<boolean>}
 */
export async function deleteQuiz(quizId) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Quiz will not be deleted.');
        return false;
    }

    const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', quizId);

    if (error) {
        console.error('Error deleting quiz:', error);
        return false;
    }

    return true;
}
