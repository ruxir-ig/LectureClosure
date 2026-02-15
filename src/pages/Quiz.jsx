import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import CircularTimer from '../components/CircularTimer';
import Confetti from '../components/Confetti';
import AnimatedCounter from '../components/AnimatedCounter';
import { getQuiz, saveAttempt } from '../services/quizService';

const Quiz = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const studentName = location.state?.studentName || '';

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await getQuiz(id);
                if (data) {
                    setQuiz(data);
                    setTimeLeft(data.time_limit || 600);
                    setStartTime(Date.now());
                    setAnswers(new Array(data.questions.length).fill(null));
                } else {
                    setError('Quiz not found');
                }
            } catch (err) {
                setError('Failed to load quiz');
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    useEffect(() => {
        if (timeLeft === null || showResult) return;
        if (timeLeft <= 0) {
            finishQuiz();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, showResult]);

    const handleSelect = (optionIdx) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(optionIdx);
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIdx;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = async () => {
        if (!quiz) return;
        let correct = 0;
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correct) correct++;
        });
        const finalScore = Math.round((correct / quiz.questions.length) * 100);
        setScore(finalScore);
        setShowResult(true);

        if (finalScore >= 70) setShowConfetti(true);

        setSaving(true);
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        await saveAttempt({
            quiz_id: id,
            student_name: studentName,
            score: finalScore,
            answers: answers,
            time_taken: timeTaken,
        });
        setSaving(false);
    };

    /* === Loading === */
    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Loader2 size={24} style={{ color: 'var(--accent)', marginBottom: '1rem' }} className="animate-spin" />
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>Loading quiz...</p>
                </div>
            </div>
        );
    }

    /* === Error === */
    if (error) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{ textAlign: 'center', maxWidth: '360px' }}>
                    <AlertCircle size={24} style={{ color: 'var(--error)', marginBottom: '1rem' }} />
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>{error}</p>
                    <Link to="/" className="btn btn-outline">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const question = quiz?.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz?.questions.length) * 100;

    /* === Results === */
    if (showResult) {
        const totalQ = quiz.questions.length;
        const correctCount = quiz.questions.filter((q, i) => answers[i] === q.correct).length;
        const performance = score >= 90 ? 'Exceptional' : score >= 70 ? 'Strong' : score >= 50 ? 'Average' : 'Needs work';

        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}>
                {showConfetti && <Confetti />}

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        textAlign: 'center',
                        maxWidth: '420px',
                        width: '100%',
                    }}
                >
                    <p style={{
                        fontSize: '0.6875rem',
                        fontWeight: '600',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                        marginBottom: '2rem',
                    }}>
                        Results
                    </p>

                    <div style={{
                        fontSize: '5rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '300',
                        lineHeight: 1,
                        color: score >= 70 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--error)',
                        marginBottom: '0.5rem',
                    }}>
                        <AnimatedCounter value={score} />%
                    </div>

                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.25rem',
                    }}>
                        {performance}
                    </p>
                    <p style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-dim)',
                        marginBottom: '3rem',
                    }}>
                        {correctCount} of {totalQ} correct
                    </p>

                    {/* Question Breakdown */}
                    <div style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: '6px',
                        padding: '1.25rem',
                        marginBottom: '2rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                            justifyContent: 'center',
                        }}>
                            {quiz.questions.map((q, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.6875rem',
                                        fontWeight: '700',
                                        fontFamily: 'var(--font-mono)',
                                        background: answers[idx] === q.correct ? 'var(--success-muted)' : 'var(--error-muted)',
                                        color: answers[idx] === q.correct ? 'var(--success)' : 'var(--error)',
                                        border: `1px solid ${answers[idx] === q.correct ? 'var(--success)' : 'var(--error)'}`,
                                    }}
                                >
                                    {idx + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Link to={`/leaderboard/${id}`} className="btn btn-primary" style={{ flex: 1, padding: '0.875rem' }}>
                            View Leaderboard
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    /* === Active Quiz === */
    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Top Progress Bar */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'var(--bg-secondary)',
                zIndex: 50,
            }}>
                <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        height: '100%',
                        background: 'var(--accent)',
                    }}
                />
            </div>

            {/* Quiz Header */}
            <div style={{
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-subtle)',
            }}>
                <div>
                    <p style={{
                        fontSize: '0.6875rem',
                        fontWeight: '600',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                        fontFamily: 'var(--font-mono)',
                    }}>
                        Question {currentQuestion + 1} of {quiz.questions.length}
                    </p>
                </div>
                <CircularTimer
                    timeLeft={timeLeft}
                    totalTime={quiz?.time_limit || 600}
                    size={56}
                    strokeWidth={2}
                />
            </div>

            {/* Question Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                maxWidth: '640px',
                margin: '0 auto',
                width: '100%',
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ width: '100%' }}
                    >
                        {/* Question */}
                        <h2 style={{
                            fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '400',
                            color: 'var(--text-primary)',
                            lineHeight: 1.4,
                            marginBottom: '2.5rem',
                            textAlign: 'center',
                        }}>
                            {question?.text}
                        </h2>

                        {/* Options */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.625rem',
                        }}>
                            {question?.options?.map((option, idx) => {
                                const isSelected = selectedAnswer === idx;
                                const isCorrect = selectedAnswer !== null && idx === question.correct;
                                const isWrong = isSelected && idx !== question.correct;

                                let bg = 'var(--bg-card)';
                                let border = 'var(--border-primary)';
                                let textColor = 'var(--text-secondary)';

                                if (isCorrect && selectedAnswer !== null) {
                                    bg = 'var(--success-muted)';
                                    border = 'var(--success)';
                                    textColor = 'var(--success)';
                                } else if (isWrong) {
                                    bg = 'var(--error-muted)';
                                    border = 'var(--error)';
                                    textColor = 'var(--error)';
                                } else if (isSelected) {
                                    bg = 'var(--accent-muted)';
                                    border = 'var(--accent)';
                                    textColor = 'var(--accent)';
                                }

                                return (
                                    <motion.button
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                                        disabled={selectedAnswer !== null}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1.25rem',
                                            textAlign: 'left',
                                            background: bg,
                                            border: `1px solid ${border}`,
                                            borderRadius: '4px',
                                            color: textColor,
                                            fontSize: '0.9375rem',
                                            fontWeight: '500',
                                            fontFamily: 'var(--font-body)',
                                            cursor: selectedAnswer === null ? 'pointer' : 'default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.875rem',
                                            transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                                        }}
                                    >
                                        <span style={{
                                            minWidth: '24px',
                                            height: '24px',
                                            borderRadius: '3px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.6875rem',
                                            fontWeight: '700',
                                            fontFamily: 'var(--font-mono)',
                                            background: isSelected || isCorrect ? 'transparent' : 'var(--bg-elevated)',
                                            border: `1px solid ${isSelected || isCorrect ? 'transparent' : 'var(--border-primary)'}`,
                                            color: isSelected || isCorrect ? textColor : 'var(--text-dim)',
                                        }}>
                                            {isCorrect && selectedAnswer !== null ? (
                                                <CheckCircle2 size={14} />
                                            ) : (
                                                String.fromCharCode(65 + idx)
                                            )}
                                        </span>
                                        {option}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Bar */}
            <div style={{
                padding: '1rem 2rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <motion.button
                    onClick={nextQuestion}
                    disabled={selectedAnswer === null}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedAnswer !== null ? 1 : 0.3 }}
                    className="btn btn-primary"
                    style={{
                        padding: '0.75rem 1.5rem',
                        cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                    }}
                >
                    {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                    <ArrowRight size={16} />
                </motion.button>
            </div>
        </div>
    );
};

export default Quiz;
