import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trophy, ArrowRight, ArrowLeft, Send, Flame, Zap } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import CircularTimer from '../components/CircularTimer';
import Confetti from '../components/Confetti';
import AnimatedCounter from '../components/AnimatedCounter';

const Quiz = () => {
    const { id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(600);
    const [isFinished, setIsFinished] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [streak, setStreak] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [justAnswered, setJustAnswered] = useState(false);

    const questions = [
        {
            id: 1,
            text: "What is the capital of India?",
            options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
            correct: 0
        },
        {
            id: 2,
            text: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: 1
        },
        {
            id: 3,
            text: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
            correct: 1
        }
    ];

    useEffect(() => {
        if (timeLeft > 0 && !isFinished) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsFinished(true);
            setShowConfetti(true);
        }
    }, [timeLeft, isFinished]);

    const handleOptionSelect = (idx) => {
        setSelectedOption(idx);
        setJustAnswered(true);
        setTimeout(() => setJustAnswered(false), 300);
    };

    const handleNext = () => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = selectedOption;
        setAnswers(newAnswers);

        // Update streak
        if (selectedOption === questions[currentQuestion].correct) {
            setStreak(prev => prev + 1);
        } else {
            setStreak(0);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(newAnswers[currentQuestion + 1] ?? null);
        } else {
            setIsFinished(true);
            setShowConfetti(true);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedOption(answers[currentQuestion - 1]);
        }
    };

    const handleQuestionDotClick = (idx) => {
        if (answers[idx] !== undefined || idx <= currentQuestion) {
            const newAnswers = [...answers];
            if (selectedOption !== null) {
                newAnswers[currentQuestion] = selectedOption;
                setAnswers(newAnswers);
            }
            setCurrentQuestion(idx);
            setSelectedOption(newAnswers[idx] ?? null);
        }
    };

    // Completion screen
    if (isFinished) {
        const score = answers.filter((ans, idx) => ans === questions[idx].correct).length;
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <Confetti isActive={showConfetti} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}
                >
                    {/* Trophy Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        style={{
                            width: '120px',
                            height: '120px',
                            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)',
                        }}
                    >
                        <Trophy size={56} style={{ color: '#F59E0B' }} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}
                    >
                        Quiz Completed!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ color: '#6B7280', fontSize: '1.125rem', marginBottom: '2.5rem' }}
                    >
                        {percentage >= 80 ? "Outstanding performance! 🎉" :
                            percentage >= 60 ? "Good job! Keep practicing! 💪" :
                                "Keep studying, you'll do better next time! 📚"}
                    </motion.p>

                    {/* Score Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        style={{
                            background: 'white',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            marginBottom: '2rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                            border: '1px solid #F3F4F6',
                        }}
                    >
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                            Your Score
                        </div>
                        <div style={{ fontSize: '4rem', fontWeight: '800', color: '#1A1A2E', lineHeight: 1 }}>
                            <AnimatedCounter value={score} duration={1.5} /> <span style={{ fontSize: '2rem', color: '#9CA3AF' }}>/ {questions.length}</span>
                        </div>

                        {/* Progress bar */}
                        <div style={{ marginTop: '1.5rem', height: '12px', background: '#F3F4F6', borderRadius: '6px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                                style={{
                                    height: '100%',
                                    background: percentage >= 80 ? 'linear-gradient(90deg, #22C55E, #16A34A)' :
                                        percentage >= 60 ? 'linear-gradient(90deg, #EAB308, #CA8A04)' :
                                            'linear-gradient(90deg, #EF4444, #DC2626)',
                                    borderRadius: '6px',
                                }}
                            />
                        </div>

                        <div style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#6B7280' }}>
                            <AnimatedCounter value={percentage} suffix="%" duration={1.5} /> accuracy
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        <Link
                            to={`/leaderboard/${id}`}
                            className="btn btn-primary"
                            style={{ padding: '1.25rem 2rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <Trophy size={20} />
                            View Leaderboard
                        </Link>
                        <Link
                            to="/"
                            className="btn btn-outline"
                            style={{ padding: '1.25rem 2rem', fontSize: '1.125rem' }}
                        >
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    // Quiz in progress
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%)', paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                {/* Header with Timer and Progress */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>

                    {/* Left: Question Progress */}
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                            Question
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1A1A2E' }}>
                            {currentQuestion + 1} <span style={{ color: '#D1D5DB' }}>/ {questions.length}</span>
                        </div>

                        {/* Streak indicator */}
                        {streak >= 2 && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    background: 'linear-gradient(135deg, #FEF3C7 0%, #FBBF24 100%)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    marginTop: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    color: '#92400E',
                                }}
                            >
                                <Flame size={16} />
                                {streak} streak!
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Circular Timer */}
                    <CircularTimer timeLeft={timeLeft} totalTime={600} size={100} strokeWidth={6} />
                </div>

                {/* Question Dots Navigator */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    {questions.map((_, idx) => (
                        <motion.button
                            key={idx}
                            onClick={() => handleQuestionDotClick(idx)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: answers[idx] !== undefined || idx <= currentQuestion ? 'pointer' : 'not-allowed',
                                fontWeight: '700',
                                fontSize: '0.875rem',
                                transition: 'all 0.2s',
                                background: idx === currentQuestion
                                    ? '#1A1A2E'
                                    : answers[idx] !== undefined
                                        ? '#22C55E'
                                        : '#F3F4F6',
                                color: idx === currentQuestion || answers[idx] !== undefined
                                    ? 'white'
                                    : '#9CA3AF',
                                opacity: answers[idx] === undefined && idx > currentQuestion ? 0.5 : 1,
                            }}
                        >
                            {answers[idx] !== undefined ? <CheckCircle2 size={18} /> : idx + 1}
                        </motion.button>
                    ))}
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 50, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid #E5E7EB',
                            padding: '2.5rem',
                            marginBottom: '2rem',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                        }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            fontWeight: '700',
                            color: '#1A1A2E',
                            marginBottom: '2rem',
                            lineHeight: 1.4,
                            fontFamily: 'var(--font-display)',
                        }}>
                            {questions[currentQuestion].text}
                        </h2>

                        {/* Options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {questions[currentQuestion].options.map((option, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    whileHover={{ scale: 1.01, y: -2 }}
                                    whileTap={{ scale: 0.99 }}
                                    animate={selectedOption === idx && justAnswered ? { scale: [1, 1.02, 1] } : {}}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '1.25rem 1.5rem',
                                        borderRadius: '16px',
                                        border: selectedOption === idx
                                            ? '2px solid #4361EE'
                                            : '2px solid #F3F4F6',
                                        background: selectedOption === idx
                                            ? 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)'
                                            : 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        transition: 'all 0.2s ease',
                                        boxShadow: selectedOption === idx
                                            ? '0 4px 20px rgba(67, 97, 238, 0.15)'
                                            : '0 2px 8px rgba(0,0,0,0.02)',
                                    }}
                                >
                                    {/* Letter Badge */}
                                    <div style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '800',
                                        fontSize: '1rem',
                                        flexShrink: 0,
                                        background: selectedOption === idx
                                            ? 'linear-gradient(135deg, #4361EE 0%, #7C3AED 100%)'
                                            : '#F9FAFB',
                                        color: selectedOption === idx ? 'white' : '#6B7280',
                                        transition: 'all 0.2s ease',
                                    }}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>

                                    {/* Option Text */}
                                    <span style={{
                                        fontSize: '1.125rem',
                                        fontWeight: selectedOption === idx ? '600' : '500',
                                        color: selectedOption === idx ? '#1A1A2E' : '#4B5563',
                                        flex: 1,
                                    }}>
                                        {option}
                                    </span>

                                    {/* Check icon */}
                                    {selectedOption === idx && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 400 }}
                                        >
                                            <CheckCircle2 size={24} style={{ color: '#4361EE' }} />
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <motion.button
                        onClick={handleBack}
                        disabled={currentQuestion === 0}
                        whileHover={currentQuestion > 0 ? { scale: 1.02 } : {}}
                        whileTap={currentQuestion > 0 ? { scale: 0.98 } : {}}
                        className="btn btn-outline"
                        style={{
                            padding: '1rem 1.5rem',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: currentQuestion === 0 ? 0 : 1,
                            pointerEvents: currentQuestion === 0 ? 'none' : 'auto',
                        }}
                    >
                        <ArrowLeft size={20} />
                        Previous
                    </motion.button>

                    <motion.button
                        onClick={handleNext}
                        disabled={selectedOption === null}
                        whileHover={selectedOption !== null ? { scale: 1.02 } : {}}
                        whileTap={selectedOption !== null ? { scale: 0.98 } : {}}
                        className="btn btn-primary"
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: selectedOption === null ? 0.5 : 1,
                            cursor: selectedOption === null ? 'not-allowed' : 'pointer',
                            boxShadow: selectedOption !== null ? '0 8px 24px rgba(67, 97, 238, 0.25)' : 'none',
                        }}
                    >
                        {currentQuestion === questions.length - 1 ? (
                            <>
                                Finish Quiz
                                <Zap size={20} />
                            </>
                        ) : (
                            <>
                                Next Question
                                <ArrowRight size={20} />
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '3rem' }}>
                    <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '3px', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #4361EE, #7C3AED)',
                                borderRadius: '3px',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
