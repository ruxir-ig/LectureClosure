import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, PlusCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Create Quiz', path: '/create' },
    ];

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '1rem 0',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #F3F4F6',
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        background: '#1A1A2E',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}>
                        <GraduationCap size={20} />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.375rem',
                        fontWeight: '700',
                        color: '#1A1A2E',
                        letterSpacing: '-0.02em',
                    }}>
                        LectureClosure
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{
                                fontSize: '0.9375rem',
                                fontWeight: '500',
                                color: location.pathname === link.path ? '#4361EE' : '#6B7280',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/create"
                        className="btn btn-primary"
                        style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
                    >
                        Get Started
                    </Link>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mobile-menu-btn"
                    style={{
                        display: 'none',
                        padding: '0.5rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#1A1A2E',
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-nav"
                        style={{
                            display: 'none',
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            borderBottom: '1px solid #F3F4F6',
                            padding: '1rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    display: 'block',
                                    padding: '0.875rem 1rem',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/create"
                            onClick={() => setIsMenuOpen(false)}
                            className="btn btn-primary"
                            style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', padding: '1rem' }}
                        >
                            Get Started
                        </Link>
                    </motion.nav>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                    .mobile-nav { display: flex !important; flex-direction: column; }
                }
            `}</style>
        </header>
    );
};

export default Header;
