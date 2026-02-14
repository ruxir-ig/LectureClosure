import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Sign up a new teacher
 */
export const signUp = async ({ email, password, fullName }) => {
    if (!isSupabaseConfigured) {
        return { user: null, error: 'Supabase is not configured. Please set up your .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' };
    }

    try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (authError) throw authError;

        // Note: Teacher profile is automatically created via database trigger
        // But we can still try to create it here as a fallback
        if (authData.user) {
            // Check if profile already exists (trigger may have created it)
            const { data: existingProfile } = await supabase
                .from('teachers')
                .select('id')
                .eq('id', authData.user.id)
                .single();

            if (!existingProfile) {
                // Create teacher profile manually if trigger didn't work
                const { error: profileError } = await supabase
                    .from('teachers')
                    .insert({
                        id: authData.user.id,
                        email: email,
                        full_name: fullName,
                    });

                if (profileError) {
                    console.warn('Could not create profile (may be created by trigger):', profileError);
                }
            }
        }

        return { user: authData.user, error: null };
    } catch (error) {
        console.error('Signup error:', error);
        return { user: null, error: error.message };
    }
};

/**
 * Sign in an existing teacher
 */
export const signIn = async ({ email, password }) => {
    if (!isSupabaseConfigured) {
        return { user: null, session: null, error: 'Supabase is not configured. Please set up your .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' };
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        return { user: data.user, session: data.session, error: null };
    } catch (error) {
        console.error('Login error:', error);
        return { user: null, session: null, error: error.message };
    }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
    if (!isSupabaseConfigured) {
        return { error: null }; // Gracefully handle demo mode
    }

    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Logout error:', error);
        return { error: error.message };
    }
};

/**
 * Get current session
 */
export const getSession = async () => {
    if (!isSupabaseConfigured) {
        return { session: null, error: null }; // Gracefully handle demo mode
    }

    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return { session, error: null };
    } catch (error) {
        console.error('Session error:', error);
        return { session: null, error: error.message };
    }
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
    if (!isSupabaseConfigured) {
        return { user: null, error: null }; // Gracefully handle demo mode
    }

    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { user, error: null };
    } catch (error) {
        console.error('Get user error:', error);
        return { user: null, error: error.message };
    }
};

/**
 * Get teacher profile
 */
export const getTeacherProfile = async (userId) => {
    if (!isSupabaseConfigured) {
        return { profile: null, error: null }; // Gracefully handle demo mode
    }

    try {
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return { profile: data, error: null };
    } catch (error) {
        console.error('Get profile error:', error);
        return { profile: null, error: error.message };
    }
};

/**
 * Subscribe to auth state changes
 */
export const onAuthStateChange = (callback) => {
    if (!isSupabaseConfigured || !supabase) {
        // Return a mock subscription for demo mode
        return {
            data: {
                subscription: {
                    unsubscribe: () => {}
                }
            }
        };
    }
    return supabase.auth.onAuthStateChange(callback);
};

/**
 * Send password reset email
 * @param {string} email - User's email address
 * @returns {Promise<{error: string | null}>}
 */
export const resetPassword = async (email) => {
    if (!isSupabaseConfigured) {
        return { error: 'Supabase is not configured. Please set up your .env file.' };
    }

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Password reset error:', error);
        return { error: error.message };
    }
};

/**
 * Update password after reset
 * @param {string} newPassword - New password
 * @returns {Promise<{error: string | null}>}
 */
export const updatePassword = async (newPassword) => {
    if (!isSupabaseConfigured) {
        return { error: 'Supabase is not configured. Please set up your .env file.' };
    }

    try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Update password error:', error);
        return { error: error.message };
    }
};

/**
 * Update teacher profile
 * @param {string} userId - User ID
 * @param {Object} updates - Profile updates { full_name, avatar_url, school_name, subject_area }
 * @returns {Promise<{profile: Object | null, error: string | null}>}
 */
export const updateProfile = async (userId, updates) => {
    if (!isSupabaseConfigured) {
        return { profile: null, error: 'Supabase is not configured. Please set up your .env file.' };
    }

    try {
        const { data, error } = await supabase
            .from('teachers')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return { profile: data, error: null };
    } catch (error) {
        console.error('Update profile error:', error);
        return { profile: null, error: error.message };
    }
};
