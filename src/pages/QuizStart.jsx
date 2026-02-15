import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, HelpCircle, Loader2, AlertCircle, User } from 'lucide-react';
import { getQuiz } from '../services/quizService';

const QuizStart = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            setLoading(true);
            const quizData = await getQuiz(id);
            if (quizData) {
                setQuiz(quizData);
            } else {
                setError('Quiz not found. The link may be invalid or expired.');
            }
            setLoading(false);
        };
        fetchQuiz();
    }, [id]);

    const handleStart = () => {
        if (!studentName.trim()) return;
        navigate(`/quiz/${id}`, {
            state: {
                studentName: studentName.trim(),
                quiz: quiz
            }
        });
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Loader2 size={24} style={{ color: 'var(--accent)' }} className="animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', maxWidth: '380px' }}
                >
                    <AlertCircle size={24} style={{ color: 'var(--error)', marginBottom: '1rem' }} />
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '400',
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem',
                    }}>
                        Quiz not found
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8125rem', marginBottom: '2rem' }}>
                        {error}
                    </p>
                    <button onClick={() => navigate('/')} className="btn btn-outline">
                        Go to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        return `${mins} min`;
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxWidth: '420px', width: '100%' }}
            >
                {/* Eyebrow */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.6875rem',
                    fontWeight: '600',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '1.5rem',
                    padding: '6px 14px',
                    background: 'var(--accent-muted)',
                    borderRadius: '3px',
                }}>
                    Quiz
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '400',
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                }}>
                    {quiz.title}
                </h1>

                {/* Stats */}
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    padding: '1rem 0',
                    borderTop: '1px solid var(--border-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                }}>
                    <div>
                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-primary)',
                            fontVariantNumeric: 'tabular-nums',
                        }}>
                            {quiz.questions?.length || 0}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', fontWeight: '500' }}>
                            Questions
                        </div>
                    </div>
                    <div>
                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-primary)',
                            fontVariantNumeric: 'tabular-nums',
                        }}>
                            {formatTime(quiz.time_limit)}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', fontWeight: '500' }}>
                            Time Limit
                        </div>
                    </div>
                </div>

                {/* Name Input */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--text-muted)',
                        marginBottom: '0.375rem',
                    }}>
                        Your Name
                    </label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter your name"
                        onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                        style={{ width: '100%', fontSize: '0.875rem' }}
                    />
                </div>

                {/* Start Button */}
                <button
                    onClick={handleStart}
                    disabled={!studentName.trim()}
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '0.9375rem',
                        gap: '0.75rem',
                        opacity: studentName.trim() ? 1 : 0.35,
                        cursor: studentName.trim() ? 'pointer' : 'not-allowed',
                    }}
                >
                    Begin
                    <ArrowRight size={18} />
                </button>

                <p style={{
                    textAlign: 'center',
                    fontSize: '0.6875rem',
                    color: 'var(--text-dim)',
                    marginTop: '1.25rem',
                }}>
                    Your score will appear on the leaderboard.
                </p>
            </motion.div>
        </div>
    );
};

export default QuizStart;
