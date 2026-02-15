import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';

const Signup = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        const { user, error } = await signUp({ email, password, fullName });

        setLoading(false);

        if (error) {
            setError(error);
        } else if (user) {
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        }
    };

    if (success) {
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
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '6px',
                        background: 'var(--success-muted)',
                        border: '1px solid var(--success)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <CheckCircle size={22} style={{ color: 'var(--success)' }} />
                    </div>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '400',
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem',
                    }}>
                        Account created
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>
                        Redirecting to dashboard...
                    </p>
                </motion.div>
            </div>
        );
    }

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
                style={{ maxWidth: '380px', width: '100%' }}
            >
                {/* Header */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <p style={{
                        fontSize: '0.6875rem',
                        fontWeight: '600',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                        marginBottom: '0.75rem',
                    }}>
                        Get Started
                    </p>
                    <h1 style={{
                        fontSize: '2rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '400',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        marginBottom: '0.5rem',
                    }}>
                        Create account
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>
                        Sign up as a teacher to start creating quizzes.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'var(--error-muted)',
                            border: '1px solid var(--error)',
                            borderRadius: '4px',
                            padding: '0.75rem 1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                        }}
                    >
                        <AlertCircle size={15} style={{ color: 'var(--error)', flexShrink: 0 }} />
                        <span style={{ color: 'var(--error)', fontSize: '0.8125rem' }}>{error}</span>
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--text-muted)',
                            marginBottom: '0.375rem',
                        }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Prof. John Smith"
                            required
                            style={{ width: '100%', fontSize: '0.875rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--text-muted)',
                            marginBottom: '0.375rem',
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="teacher@school.edu"
                            required
                            style={{ width: '100%', fontSize: '0.875rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--text-muted)',
                            marginBottom: '0.375rem',
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 6 characters"
                                required
                                minLength={6}
                                style={{ width: '100%', paddingRight: '2.5rem', fontSize: '0.875rem' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    color: 'var(--text-dim)',
                                }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            fontSize: '0.875rem',
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <p style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: 'var(--text-dim)',
                    fontSize: '0.8125rem',
                }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600' }}>
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
