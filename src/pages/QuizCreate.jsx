import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileUp, Settings, CheckCircle2, Loader2, Sparkles, X, AlertCircle, Brain, Zap, FileText, Share2, GripVertical, Plus, Trash2 } from 'lucide-react';

const QuizCreate = () => {
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

    const stepLabels = ['Upload', 'AI Magic', 'Review'];
    const stepIcons = [FileUp, Brain, CheckCircle2];

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%)', padding: '3rem 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                        Create your Quiz
                    </h1>
                    <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
                        Upload your lecture notes and let AI do the heavy lifting.
                    </p>
                </motion.div>

                {/* Visual Stepper */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
                    {stepLabels.map((label, idx) => {
                        const Icon = stepIcons[idx];
                        const isActive = step === idx + 1;
                        const isComplete = step > idx + 1;

                        return (
                            <React.Fragment key={idx}>
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: isActive ? 1.05 : 1 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: isComplete ? 'linear-gradient(135deg, #22C55E, #16A34A)' :
                                            isActive ? 'linear-gradient(135deg, #4361EE, #7C3AED)' : '#F3F4F6',
                                        color: isComplete || isActive ? 'white' : '#9CA3AF',
                                        transition: 'all 0.3s ease',
                                        boxShadow: isActive ? '0 8px 24px rgba(67, 97, 238, 0.3)' : 'none',
                                    }}>
                                        {isComplete ? <CheckCircle2 size={22} /> : <Icon size={22} />}
                                    </div>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        color: isActive ? '#4361EE' : isComplete ? '#22C55E' : '#9CA3AF',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        {label}
                                    </span>
                                </motion.div>

                                {idx < stepLabels.length - 1 && (
                                    <div style={{
                                        width: '80px',
                                        height: '3px',
                                        margin: '0 0.75rem',
                                        marginBottom: '1.5rem',
                                        borderRadius: '2px',
                                        background: step > idx + 1 ? 'linear-gradient(90deg, #22C55E, #16A34A)' : '#E5E7EB',
                                        transition: 'all 0.3s ease',
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                                style={{
                                    border: isDragging ? '2px solid #4361EE' : '2px dashed #D1D5DB',
                                    borderRadius: '24px',
                                    padding: '4rem 2rem',
                                    textAlign: 'center',
                                    background: isDragging ? 'rgba(67, 97, 238, 0.03)' : 'white',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                }}
                            >
                                <motion.div
                                    animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                    }}
                                >
                                    <FileUp size={36} style={{ color: '#4361EE' }} />
                                </motion.div>

                                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                    Drop your files here
                                </h2>
                                <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                                    Support for PDF, PPT, and DOCX files up to 20MB
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
                                    style={{ padding: '0.875rem 2rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Upload size={18} />
                                    Browse Files
                                </label>
                            </div>

                            {/* Feature Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                                {[
                                    { icon: Sparkles, title: 'AI Context Mapping', desc: 'Maps complex concepts to specific question types', color: '#4361EE', bg: '#EEF2FF' },
                                    { icon: Zap, title: 'Adaptive Distractors', desc: 'LLM-powered distractors targeting misconceptions', color: '#F59E0B', bg: '#FFFBEB' },
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        style={{
                                            background: 'white',
                                            border: '1px solid #F3F4F6',
                                            borderRadius: '16px',
                                            padding: '1.25rem',
                                            display: 'flex',
                                            gap: '1rem',
                                        }}
                                    >
                                        <div style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '12px',
                                            background: feature.bg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <feature.icon size={20} style={{ color: feature.color }} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>{feature.title}</h4>
                                            <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.5 }}>{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
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
                            style={{ textAlign: 'center', padding: '3rem 0' }}
                        >
                            {/* AI Brain Animation */}
                            <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 2rem' }}>
                                {/* Outer ring */}
                                <svg width="140" height="140" style={{ position: 'absolute', top: 0, left: 0 }}>
                                    <circle
                                        cx="70"
                                        cy="70"
                                        r="65"
                                        fill="none"
                                        stroke="#F3F4F6"
                                        strokeWidth="6"
                                    />
                                    <motion.circle
                                        cx="70"
                                        cy="70"
                                        r="65"
                                        fill="none"
                                        stroke="url(#gradient)"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray={408}
                                        strokeDashoffset={408 - (408 * processingProgress / 100)}
                                        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#4361EE" />
                                            <stop offset="100%" stopColor="#7C3AED" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Brain icon */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '80px',
                                        height: '80px',
                                        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Brain size={36} style={{ color: '#4361EE' }} />
                                </motion.div>
                            </div>

                            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                {processingProgress}%
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                AI is cooking your quiz...
                            </h2>
                            <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
                                Analyzing <strong>"{file?.name}"</strong>
                            </p>

                            {/* Processing Steps */}
                            <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
                                {processingSteps.map((pStep, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.875rem 1rem',
                                            background: pStep.done ? '#F0FDF4' : '#FAFBFC',
                                            border: '1px solid',
                                            borderColor: pStep.done ? '#BBF7D0' : '#E5E7EB',
                                            borderRadius: '12px',
                                            marginBottom: '0.5rem',
                                        }}
                                    >
                                        {pStep.done ? (
                                            <CheckCircle2 size={18} style={{ color: '#22C55E' }} />
                                        ) : (
                                            <Loader2 size={18} style={{ color: '#4361EE' }} className="animate-spin" />
                                        )}
                                        <span style={{ color: pStep.done ? '#166534' : '#4B5563', fontSize: '0.875rem' }}>
                                            {pStep.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div style={{
                                background: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                marginBottom: '1.5rem',
                            }}>
                                {/* Review Header */}
                                <div style={{
                                    padding: '1.25rem 1.5rem',
                                    borderBottom: '1px solid #F3F4F6',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Quiz Preview</h2>
                                        <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>3 questions generated</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer' }}>
                                            <Settings size={18} style={{ color: '#6B7280' }} />
                                        </button>
                                        <button onClick={() => { setStep(1); setFile(null); setProcessingProgress(0); }} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer' }}>
                                            <X size={18} style={{ color: '#6B7280' }} />
                                        </button>
                                    </div>
                                </div>

                                {/* Questions */}
                                <div style={{ padding: '1rem' }}>
                                    {[
                                        { q: "What is the primary role of mitochondria in a cell?", type: 'MCQ', difficulty: 'Easy' },
                                        { q: "Which of the following describes anaerobic respiration best?", type: 'MCQ', difficulty: 'Medium' },
                                        { q: "How many ATP molecules are produced in glycolysis?", type: 'MCQ', difficulty: 'Hard' },
                                    ].map((question, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            style={{
                                                padding: '1.25rem',
                                                background: '#FAFBFC',
                                                borderRadius: '14px',
                                                marginBottom: '0.75rem',
                                                border: '1px solid transparent',
                                                cursor: 'grab',
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <GripVertical size={16} style={{ color: '#D1D5DB' }} />
                                                    <span style={{
                                                        fontSize: '0.625rem',
                                                        fontWeight: '700',
                                                        color: '#4361EE',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.1em',
                                                        background: '#EEF2FF',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                    }}>
                                                        Q{idx + 1}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '0.625rem',
                                                        fontWeight: '600',
                                                        color: question.difficulty === 'Easy' ? '#22C55E' : question.difficulty === 'Medium' ? '#F59E0B' : '#EF4444',
                                                        background: question.difficulty === 'Easy' ? '#F0FDF4' : question.difficulty === 'Medium' ? '#FFFBEB' : '#FEF2F2',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                    }}>
                                                        {question.difficulty}
                                                    </span>
                                                </div>
                                                <button style={{ padding: '0.375rem', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                                    <Trash2 size={14} style={{ color: '#9CA3AF' }} />
                                                </button>
                                            </div>

                                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', lineHeight: 1.4 }}>
                                                {question.q}
                                            </h4>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                                {['Energy production (ATP)', 'Protein synthesis', 'Cell division', 'DNA replication'].map((opt, oidx) => (
                                                    <div key={oidx} style={{
                                                        padding: '0.625rem 0.875rem',
                                                        background: 'white',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '8px',
                                                        fontSize: '0.875rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                    }}>
                                                        <div style={{
                                                            width: '18px',
                                                            height: '18px',
                                                            borderRadius: '50%',
                                                            border: oidx === 0 ? '2px solid #22C55E' : '2px solid #D1D5DB',
                                                            background: oidx === 0 ? '#22C55E' : 'transparent',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                            {oidx === 0 && <CheckCircle2 size={12} style={{ color: 'white' }} />}
                                                        </div>
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button className="btn btn-outline" style={{ flex: 1, minWidth: '180px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <Plus size={18} />
                                    Add Question
                                </button>
                                <button className="btn btn-primary" style={{ flex: 1, minWidth: '180px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(67, 97, 238, 0.25)' }}>
                                    <Share2 size={18} />
                                    Generate Quiz Link
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default QuizCreate;
