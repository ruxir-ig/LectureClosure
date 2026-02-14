-- ============================================
-- LECTURECLOSURE DATABASE SCHEMA
-- ============================================
-- Run this SQL in your Supabase SQL Editor to set up the database
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TEACHERS TABLE
-- Stores teacher profile information
-- ============================================
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    school_name TEXT,
    subject_area TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_teachers_email ON teachers(email);

-- ============================================
-- 2. QUIZZES TABLE
-- Stores quiz data with questions as JSONB
-- ============================================
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL DEFAULT '[]',
    time_limit INTEGER DEFAULT 600, -- Time in seconds (default: 10 minutes)
    teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_quizzes_teacher_id ON quizzes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_created_at ON quizzes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quizzes_is_active ON quizzes(is_active);

-- ============================================
-- 3. ATTEMPTS TABLE
-- Stores student quiz attempts for leaderboard
-- ============================================
CREATE TABLE IF NOT EXISTS attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    time_taken INTEGER, -- Time in seconds
    answers JSONB, -- Optional: store individual answers
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_attempts_quiz_id ON attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_attempts_score ON attempts(score DESC);
CREATE INDEX IF NOT EXISTS idx_attempts_created_at ON attempts(created_at DESC);

-- ============================================
-- 4. ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- TEACHERS POLICIES
-- ============================================

-- Teachers can view their own profile
CREATE POLICY "Teachers can view own profile"
    ON teachers FOR SELECT
    USING (auth.uid() = id);

-- Teachers can update their own profile
CREATE POLICY "Teachers can update own profile"
    ON teachers FOR UPDATE
    USING (auth.uid() = id);

-- Allow insert during signup (service role handles this via trigger)
CREATE POLICY "Allow insert during signup"
    ON teachers FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ============================================
-- QUIZZES POLICIES
-- ============================================

-- Teachers can view their own quizzes
CREATE POLICY "Teachers can view own quizzes"
    ON quizzes FOR SELECT
    USING (teacher_id = auth.uid());

-- Anyone can view active quizzes (for students taking quiz)
CREATE POLICY "Anyone can view active quizzes"
    ON quizzes FOR SELECT
    USING (is_active = true);

-- Teachers can create quizzes
CREATE POLICY "Teachers can create quizzes"
    ON quizzes FOR INSERT
    WITH CHECK (teacher_id = auth.uid());

-- Teachers can update their own quizzes
CREATE POLICY "Teachers can update own quizzes"
    ON quizzes FOR UPDATE
    USING (teacher_id = auth.uid());

-- Teachers can delete their own quizzes
CREATE POLICY "Teachers can delete own quizzes"
    ON quizzes FOR DELETE
    USING (teacher_id = auth.uid());

-- ============================================
-- ATTEMPTS POLICIES
-- ============================================

-- Anyone can create attempts (students taking quiz)
CREATE POLICY "Anyone can create attempts"
    ON attempts FOR INSERT
    WITH CHECK (true);

-- Anyone can view attempts (for leaderboard)
CREATE POLICY "Anyone can view attempts"
    ON attempts FOR SELECT
    USING (true);

-- ============================================
-- 5. FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to automatically create teacher profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.teachers (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Teacher')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS on_teachers_updated ON teachers;
CREATE TRIGGER on_teachers_updated
    BEFORE UPDATE ON teachers
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_quizzes_updated ON quizzes;
CREATE TRIGGER on_quizzes_updated
    BEFORE UPDATE ON quizzes
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 6. SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment to add sample data after creating a user
-- INSERT INTO quizzes (title, questions, time_limit)
-- VALUES (
--     'Sample Biology Quiz',
--     '[
--         {"id": 1, "text": "What is the primary role of mitochondria?", "options": ["Energy production", "Protein synthesis", "Cell division", "DNA replication"], "correct": 0},
--         {"id": 2, "text": "Which describes anaerobic respiration?", "options": ["Requires oxygen", "Occurs without oxygen", "Produces more ATP", "Only in plants"], "correct": 1}
--     ]'::jsonb,
--     600
-- );