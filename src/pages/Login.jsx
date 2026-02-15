import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { user, error } = await signIn({ email, password });

        setLoading(false);

        if (error) {
            setError(error);
        } else if (user) {
            navigate(from, { replace: true });
        }
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
                        Welcome back
                    </p>
                    <h1 style={{
                        fontSize: '2rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '400',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        marginBottom: '0.5rem',
                    }}>
                        Sign in
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>
                        Enter your credentials to continue.
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
                                placeholder="••••••••"
                                required
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
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: 'var(--text-dim)',
                    fontSize: '0.8125rem',
                }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: '600' }}>
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
