import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, profile, signOut, loading } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Create', path: '/create' },
    ];

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <>
            {/* Desktop Header */}
            <header className="desktop-header" style={{
                position: 'relative',
                padding: '0',
                background: 'transparent',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '1.25rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border-subtle)',
                }}>
                    {/* Wordmark */}
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0px',
                        textDecoration: 'none',
                    }}>
                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.03em',
                            fontFamily: 'var(--font-body)',
                        }}>
                            Lecture
                        </span>
                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: '400',
                            color: 'var(--text-muted)',
                            letterSpacing: '-0.03em',
                            fontFamily: 'var(--font-body)',
                        }}>
                            Closure
                        </span>
                    </Link>

                    {/* Center Nav */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        fontSize: '0.8125rem',
                                        fontWeight: '500',
                                        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                                        textDecoration: 'none',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        background: isActive ? 'var(--bg-card)' : 'transparent',
                                        transition: 'all 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                                        position: 'relative',
                                        letterSpacing: '0.01em',
                                    }}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right — Auth */}
                    {!loading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {isAuthenticated ? (
                                <>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '5px 12px 5px 6px',
                                        background: 'var(--bg-card)',
                                        borderRadius: '4px',
                                        border: '1px solid var(--border-subtle)',
                                    }}>
                                        <div style={{
                                            width: '22px',
                                            height: '22px',
                                            borderRadius: '3px',
                                            background: 'var(--accent)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <User size={11} style={{ color: 'white' }} />
                                        </div>
                                        <span style={{
                                            fontSize: '0.8125rem',
                                            fontWeight: '500',
                                            color: 'var(--text-secondary)',
                                        }}>
                                            {profile?.full_name?.split(' ')[0] || 'Account'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        style={{
                                            padding: '6px 12px',
                                            fontSize: '0.8125rem',
                                            fontWeight: '500',
                                            color: 'var(--text-dim)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            letterSpacing: '0.01em',
                                        }}
                                    >
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        style={{
                                            padding: '6px 14px',
                                            fontSize: '0.8125rem',
                                            fontWeight: '500',
                                            color: 'var(--text-muted)',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="btn btn-primary"
                                        style={{
                                            padding: '8px 18px',
                                            fontSize: '0.8125rem',
                                        }}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Header — Floating Dark Island */}
            <header className="mobile-header" style={{
                display: 'none',
                position: 'fixed',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 100,
                width: 'auto',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: 'color-mix(in srgb, var(--bg-primary) 95%, transparent)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '6px',
                        padding: '6px 6px 6px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid var(--border-subtle)',
                    }}
                >
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0px', textDecoration: 'none' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                            Lecture
                        </span>
                        <span style={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--text-muted)' }}>
                            Closure
                        </span>
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '4px',
                            background: 'var(--bg-card)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </motion.div>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.18 }}
                            style={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '220px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '6px',
                                padding: '6px',
                            }}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        display: 'block',
                                        padding: '10px 12px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: location.pathname === link.path ? 'var(--text-primary)' : 'var(--text-muted)',
                                        textDecoration: 'none',
                                        borderRadius: '4px',
                                        background: location.pathname === link.path ? 'var(--bg-elevated)' : 'transparent',
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '6px 8px' }} />

                            {isAuthenticated ? (
                                <button
                                    onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: 'var(--text-muted)',
                                        background: 'transparent',
                                        border: 'none',
                                        borderRadius: '4px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Log out
                                </button>
                            ) : (
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn btn-primary"
                                    style={{
                                        display: 'block',
                                        padding: '10px 12px',
                                        fontSize: '0.875rem',
                                        textAlign: 'center',
                                        margin: '4px',
                                    }}
                                >
                                    Get Started
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Header;
