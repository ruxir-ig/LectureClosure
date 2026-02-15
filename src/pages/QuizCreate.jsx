import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileUp, Settings, CheckCircle2, Loader2, Sparkles, X, Brain, Zap, Share2, GripVertical, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ShareModal from '../components/ShareModal';
import { createQuiz, getQuizShareUrl } from '../services/quizService';
import { useAuth } from '../context/AuthContext';

const QuizCreate = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [processingSteps, setProcessingSteps] = useState([
        { text: 'Extracting text content...', done: false },
        { text: 'Identifying core concepts...', done: false },
        { text: 'Generating questions...', done: false },
        { text: 'Creating smart distractors...', done: false },
    ]);
    const [expandedQuestion, setExpandedQuestion] = useState(0);

    const [showShareModal, setShowShareModal] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setStep(2);
            simulateProcessing();
        }
    };

    const simulateProcessing = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            setProcessingProgress(progress);

            if (progress >= 25) setProcessingSteps(prev => prev.map((s, i) => i === 0 ? { ...s, done: true } : s));
            if (progress >= 50) setProcessingSteps(prev => prev.map((s, i) => i === 1 ? { ...s, done: true } : s));
            if (progress >= 75) setProcessingSteps(prev => prev.map((s, i) => i === 2 ? { ...s, done: true } : s));
            if (progress >= 100) {
                setProcessingSteps(prev => prev.map((s, i) => i === 3 ? { ...s, done: true } : s));
                clearInterval(interval);
                setTimeout(() => setStep(3), 500);
            }
        }, 80);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave = () => setIsDragging(false);
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setStep(2);
            simulateProcessing();
        }
    };

    const demoQuestions = [
        { q: "What is the primary role of mitochondria in a cell?", type: 'MCQ', difficulty: 'Easy', options: ['Energy production (ATP)', 'Protein synthesis', 'Cell division', 'DNA replication'] },
        { q: "Which of the following describes anaerobic respiration best?", type: 'MCQ', difficulty: 'Medium', options: ['Requires oxygen', 'Occurs without oxygen', 'Produces more ATP than aerobic', 'Only happens in plants'] },
        { q: "How many ATP molecules are produced in glycolysis?", type: 'MCQ', difficulty: 'Hard', options: ['2 ATP', '4 ATP', '36 ATP', '38 ATP'] },
    ];

    // Subtle AI sparkle SVG
    const AiSparkle = () => (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.5 }}>
            <path d="M8 0L9.5 5.5L16 8L9.5 10.5L8 16L6.5 10.5L0 8L6.5 5.5L8 0Z" fill="var(--accent)" />
        </svg>
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            padding: '2rem 0 4rem',
        }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: '2rem' }}
                >
                    <p style={{
                        fontSize: '0.6875rem',
                        fontWeight: '600',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                        marginBottom: '0.5rem',
                    }}>
                        Create
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '400',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                    }}>
                        Generate your quiz
                    </h1>
                </motion.div>

                {/* Step Indicator */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0',
                    marginBottom: '2.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '1.5rem',
                }}>
                    {['Upload', 'Processing', 'Review'].map((label, idx) => {
                        const isActive = step === idx + 1;
                        const isComplete = step > idx + 1;
                        return (
                            <React.Fragment key={idx}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.6875rem',
                                        fontWeight: '700',
                                        fontFamily: 'var(--font-mono)',
                                        background: isComplete ? 'var(--success)' : isActive ? 'var(--accent)' : 'var(--bg-card)',
                                        color: isComplete || isActive ? '#fff' : 'var(--text-dim)',
                                        border: !isComplete && !isActive ? '1px solid var(--border-primary)' : 'none',
                                        transition: 'all 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}>
                                        {isComplete ? <CheckCircle2 size={13} /> : idx + 1}
                                    </div>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        color: isActive ? 'var(--text-primary)' : isComplete ? 'var(--success)' : 'var(--text-dim)',
                                    }}>
                                        {label}
                                    </span>
                                </div>
                                {idx < 2 && (
                                    <div style={{
                                        flex: 1,
                                        height: '1px',
                                        background: isComplete ? 'var(--success)' : 'var(--border-primary)',
                                        margin: '0 1rem',
                                        transition: 'background 300ms ease',
                                    }} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">

                    {/* Step 1: Upload */}
                    {step === 1 && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                                style={{
                                    border: `1px ${isDragging ? 'solid' : 'dashed'} ${isDragging ? 'var(--accent)' : 'var(--border-primary)'}`,
                                    borderRadius: '6px',
                                    padding: '4rem 2rem',
                                    textAlign: 'center',
                                    background: isDragging ? 'var(--accent-muted)' : 'var(--bg-card)',
                                    transition: 'all 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                                    cursor: 'pointer',
                                }}
                            >
                                <motion.div
                                    animate={isDragging ? { y: -4 } : { y: 0 }}
                                    transition={{ duration: 0.18 }}
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--bg-elevated)',
                                        border: '1px solid var(--border-primary)',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.25rem',
                                    }}
                                >
                                    <FileUp size={22} style={{ color: 'var(--text-dim)' }} />
                                </motion.div>

                                <h2 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    fontFamily: 'var(--font-body)',
                                    color: 'var(--text-primary)',
                                    marginBottom: '0.5rem',
                                }}>
                                    Drop your files here
                                </h2>
                                <p style={{
                                    color: 'var(--text-dim)',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.8125rem',
                                }}>
                                    PDF, PPT, DOCX — up to 20MB
                                </p>

                                <input
                                    type="file"
                                    id="file-upload"
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                    accept=".pdf,.ppt,.pptx,.docx"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="btn btn-primary"
                                    style={{ padding: '0.75rem 1.75rem', cursor: 'pointer' }}
                                >
                                    <Upload size={16} />
                                    Browse Files
                                </label>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Processing */}
                    {step === 2 && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ padding: '2rem 0' }}
                        >
                            <div style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '6px',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                            }}>
                                {/* Progress bar */}
                                <div style={{
                                    maxWidth: '400px',
                                    margin: '0 auto 2rem',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.5rem',
                                    }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            color: 'var(--text-muted)',
                                        }}>
                                            Analyzing "{file?.name}"
                                        </span>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--accent)',
                                        }}>
                                            {processingProgress}%
                                        </span>
                                    </div>
                                    <div style={{
                                        height: '3px',
                                        background: 'var(--bg-elevated)',
                                        borderRadius: '2px',
                                        overflow: 'hidden',
                                    }}>
                                        <motion.div
                                            animate={{ width: `${processingProgress}%` }}
                                            transition={{ duration: 0.15 }}
                                            style={{
                                                height: '100%',
                                                background: 'var(--accent)',
                                                borderRadius: '2px',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Processing Steps */}
                                <div style={{ maxWidth: '360px', margin: '0 auto', textAlign: 'left' }}>
                                    {processingSteps.map((pStep, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.08 }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.625rem 0',
                                                borderBottom: idx < processingSteps.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                            }}
                                        >
                                            {pStep.done ? (
                                                <CheckCircle2 size={15} style={{ color: 'var(--success)', flexShrink: 0 }} />
                                            ) : (
                                                <Loader2 size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} className="animate-spin" />
                                            )}
                                            <span style={{
                                                color: pStep.done ? 'var(--text-secondary)' : 'var(--text-muted)',
                                                fontSize: '0.8125rem',
                                                fontWeight: '500',
                                            }}>
                                                {pStep.text}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                marginBottom: '1.5rem',
                            }}>
                                {/* Review Header */}
                                <div style={{
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid var(--border-subtle)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <AiSparkle />
                                        <div>
                                            <h2 style={{ fontSize: '0.9375rem', fontWeight: '600', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                                                Generated Questions
                                            </h2>
                                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-dim)' }}>
                                                {demoQuestions.length} questions from your content
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setStep(1); setFile(null); setProcessingProgress(0); }}
                                        style={{
                                            padding: '6px',
                                            borderRadius: '4px',
                                            border: '1px solid var(--border-primary)',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--text-dim)',
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>

                                {/* Questions List */}
                                <div>
                                    {demoQuestions.map((question, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: idx * 0.08 }}
                                            style={{
                                                borderBottom: idx < demoQuestions.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                            }}
                                        >
                                            {/* Question Header (clickable) */}
                                            <div
                                                onClick={() => setExpandedQuestion(expandedQuestion === idx ? -1 : idx)}
                                                style={{
                                                    padding: '1rem 1.5rem',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'background 150ms ease',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                                                    <span style={{
                                                        fontSize: '0.625rem',
                                                        fontWeight: '700',
                                                        fontFamily: 'var(--font-mono)',
                                                        color: 'var(--accent)',
                                                        background: 'var(--accent-muted)',
                                                        padding: '3px 8px',
                                                        borderRadius: '3px',
                                                        letterSpacing: '0.05em',
                                                    }}>
                                                        Q{idx + 1}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500',
                                                        color: 'var(--text-primary)',
                                                        flex: 1,
                                                    }}>
                                                        {question.q}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '0.5625rem',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.08em',
                                                        color: question.difficulty === 'Easy' ? 'var(--success)' : question.difficulty === 'Medium' ? 'var(--warning)' : 'var(--error)',
                                                        background: question.difficulty === 'Easy' ? 'var(--success-muted)' : question.difficulty === 'Medium' ? 'var(--warning-muted)' : 'var(--error-muted)',
                                                        padding: '3px 8px',
                                                        borderRadius: '3px',
                                                        flexShrink: 0,
                                                    }}>
                                                        {question.difficulty}
                                                    </span>
                                                </div>
                                                <div style={{ marginLeft: '0.75rem', color: 'var(--text-dim)' }}>
                                                    {expandedQuestion === idx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                </div>
                                            </div>

                                            {/* Expanded Options */}
                                            <AnimatePresence>
                                                {expandedQuestion === idx && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <div style={{
                                                            padding: '0 1.5rem 1.25rem',
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr',
                                                            gap: '0.5rem',
                                                        }}>
                                                            {question.options.map((opt, oidx) => (
                                                                <div key={oidx} style={{
                                                                    padding: '0.5rem 0.75rem',
                                                                    background: oidx === 0 ? 'var(--success-muted)' : 'var(--bg-elevated)',
                                                                    border: `1px solid ${oidx === 0 ? 'var(--success)' : 'var(--border-primary)'}`,
                                                                    borderRadius: '4px',
                                                                    fontSize: '0.8125rem',
                                                                    color: oidx === 0 ? 'var(--success)' : 'var(--text-muted)',
                                                                    fontWeight: oidx === 0 ? '600' : '400',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.5rem',
                                                                }}>
                                                                    <span style={{
                                                                        fontSize: '0.625rem',
                                                                        fontFamily: 'var(--font-mono)',
                                                                        fontWeight: '700',
                                                                        opacity: 0.6,
                                                                    }}>
                                                                        {String.fromCharCode(65 + oidx)}
                                                                    </span>
                                                                    {opt}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button className="btn btn-outline" style={{
                                    flex: 1,
                                    padding: '0.875rem',
                                }}>
                                    <Plus size={16} />
                                    Add Question
                                </button>
                                <button
                                    onClick={async () => {
                                        setIsGenerating(true);
                                        const quizQuestions = demoQuestions.map((q, i) => ({
                                            id: i + 1,
                                            text: q.q,
                                            options: q.options,
                                            correct: 0,
                                        }));

                                        const title = file?.name?.replace(/\.[^/.]+$/, "") || 'Untitled Quiz';
                                        setQuizTitle(title);

                                        const result = await createQuiz({
                                            title,
                                            questions: quizQuestions,
                                            timeLimit: 600,
                                            teacherId: user?.id
                                        });

                                        setIsGenerating(false);

                                        if (result) {
                                            setShareUrl(getQuizShareUrl(result.id));
                                            setShowShareModal(true);
                                        } else {
                                            alert('Failed to create quiz. Please check your Supabase configuration.');
                                        }
                                    }}
                                    disabled={isGenerating}
                                    className="btn btn-primary"
                                    style={{
                                        flex: 1,
                                        padding: '0.875rem',
                                        opacity: isGenerating ? 0.6 : 1,
                                    }}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Share2 size={16} />
                                            Generate Quiz Link
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <ShareModal
                    isOpen={showShareModal}
                    onClose={() => setShowShareModal(false)}
                    quizUrl={shareUrl}
                    quizTitle={quizTitle}
                />
            </div>
        </div>
    );
};

export default QuizCreate;
