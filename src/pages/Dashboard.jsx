import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, Users, BarChart2, Share2, Trash2, ExternalLink, Clock, ChevronRight, Loader2, LayoutDashboard, Zap, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTeacherQuizzes, getTeacherStats, getQuizShareUrl } from '../services/quizService';

const Dashboard = () => {
    const { user, profile } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [stats, setStats] = useState({ totalQuizzes: 0, totalAttempts: 0, avgScore: 0 });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const [q, s] = await Promise.all([
                getTeacherQuizzes(user.id),
                getTeacherStats(user.id),
            ]);
            if (q) setQuizzes(q);
            if (s) setStats(s);
            setLoading(false);
        };
        fetchData();
    }, [user]);

    const filteredQuizzes = quizzes.filter(q =>
        q.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sidebarLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: Zap, label: 'Create', href: '/create' },
        { icon: BarChart2, label: 'Analytics' },
        { icon: Settings, label: 'Settings' },
    ];

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

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>

            {/* ── Sidebar ── */}
            <motion.aside
                onMouseEnter={() => setSidebarExpanded(true)}
                onMouseLeave={() => setSidebarExpanded(false)}
                animate={{ width: sidebarExpanded ? 200 : 60 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="desktop-header"
                style={{
                    borderRight: '1px solid var(--border-subtle)',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.25rem 0',
                    overflow: 'hidden',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    flexShrink: 0,
                }}
            >
                <div>
                    {sidebarLinks.map((link, idx) => {
                        const Comp = link.href ? Link : 'div';
                        return (
                            <Comp
                                key={idx}
                                to={link.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.625rem 1.25rem',
                                    margin: '2px 0.5rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    background: link.active ? 'var(--bg-card)' : 'transparent',
                                    transition: 'background 150ms ease',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <link.icon
                                    size={17}
                                    strokeWidth={1.6}
                                    style={{
                                        color: link.active ? 'var(--text-primary)' : 'var(--text-dim)',
                                        flexShrink: 0,
                                    }}
                                />
                                <motion.span
                                    animate={{ opacity: sidebarExpanded ? 1 : 0 }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        fontSize: '0.8125rem',
                                        fontWeight: '500',
                                        color: link.active ? 'var(--text-primary)' : 'var(--text-muted)',
                                    }}
                                >
                                    {link.label}
                                </motion.span>
                            </Comp>
                        );
                    })}
                </div>

                {/* User at bottom */}
                <div style={{
                    padding: '0 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}>
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        background: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.6875rem',
                        fontWeight: '700',
                        color: '#fff',
                        flexShrink: 0,
                    }}>
                        {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <motion.span
                        animate={{ opacity: sidebarExpanded ? 1 : 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    >
                        {profile?.full_name || 'Teacher'}
                    </motion.span>
                </div>
            </motion.aside>

            {/* ── Main Content ── */}
            <main style={{ flex: 1, padding: '2rem 2.5rem', minWidth: 0 }}>

                {/* Top Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '2.5rem',
                    }}
                >
                    <div>
                        <p style={{
                            fontSize: '0.6875rem',
                            fontWeight: '600',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--text-dim)',
                            marginBottom: '0.5rem',
                        }}>
                            Dashboard
                        </p>
                        <h1 style={{
                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '400',
                            color: 'var(--text-primary)',
                        }}>
                            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}.
                        </h1>
                    </div>
                    <Link to="/create" className="btn btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.8125rem' }}>
                        <Plus size={16} />
                        New Quiz
                    </Link>
                </motion.div>

                {/* Stats Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1px',
                    background: 'var(--border-subtle)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '2.5rem',
                }}>
                    {[
                        { icon: FileText, label: 'Quizzes', value: stats.totalQuizzes },
                        { icon: Users, label: 'Total Attempts', value: stats.totalAttempts },
                        { icon: BarChart2, label: 'Avg Score', value: `${stats.avgScore}%` },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            style={{
                                padding: '1.5rem',
                                background: 'var(--bg-card)',
                            }}
                        >
                            <stat.icon size={15} style={{ color: 'var(--text-dim)', marginBottom: '0.75rem' }} />
                            <div style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                fontFamily: 'var(--font-mono)',
                                fontVariantNumeric: 'tabular-nums',
                                color: 'var(--text-primary)',
                                marginBottom: '0.125rem',
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', fontWeight: '500' }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Search & Label */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                }}>
                    <p style={{
                        fontSize: '0.8125rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)',
                    }}>
                        Your Quizzes
                    </p>
                    <div style={{ position: 'relative' }}>
                        <Search size={14} style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-dim)',
                        }} />
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                paddingLeft: '32px',
                                padding: '0.5rem 0.75rem 0.5rem 32px',
                                fontSize: '0.75rem',
                                width: '220px',
                            }}
                        />
                    </div>
                </div>

                {/* Quiz Cards Grid */}
                {filteredQuizzes.length === 0 ? (
                    <div style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: '6px',
                        padding: '4rem 2rem',
                        textAlign: 'center',
                    }}>
                        <FileText size={28} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            No quizzes yet
                        </p>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: '2rem' }}>
                            Create your first quiz to get started.
                        </p>
                        <Link to="/create" className="btn btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.8125rem' }}>
                            <Plus size={15} />
                            Create Quiz
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1px',
                        background: 'var(--border-subtle)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                    }}>
                        {filteredQuizzes.map((quiz, idx) => {
                            const questionsCount = quiz.questions?.length || 0;
                            const createdAt = new Date(quiz.created_at);
                            const timeAgo = Math.round((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

                            return (
                                <motion.div
                                    key={quiz.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.04 }}
                                    style={{
                                        padding: '1.5rem',
                                        background: 'var(--bg-card)',
                                        transition: 'background 150ms ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '1rem',
                                    }}>
                                        <h3 style={{
                                            fontSize: '0.9375rem',
                                            fontWeight: '600',
                                            fontFamily: 'var(--font-body)',
                                            color: 'var(--text-primary)',
                                            lineHeight: 1.4,
                                            flex: 1,
                                            paddingRight: '1rem',
                                        }}>
                                            {quiz.title}
                                        </h3>
                                        <Link
                                            to={`/leaderboard/${quiz.id}`}
                                            style={{
                                                color: 'var(--text-dim)',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        fontSize: '0.6875rem',
                                        color: 'var(--text-dim)',
                                        fontFamily: 'var(--font-mono)',
                                    }}>
                                        <span>{questionsCount} Q</span>
                                        <span>{timeAgo === 0 ? 'Today' : `${timeAgo}d ago`}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        marginTop: '1rem',
                                    }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigator.clipboard.writeText(getQuizShareUrl(quiz.id));
                                            }}
                                            style={{
                                                padding: '4px 10px',
                                                fontSize: '0.625rem',
                                                fontWeight: '600',
                                                color: 'var(--accent)',
                                                background: 'var(--accent-muted)',
                                                border: 'none',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}
                                        >
                                            <Share2 size={10} />
                                            Copy Link
                                        </button>
                                        <Link
                                            to={`/leaderboard/${quiz.id}`}
                                            style={{
                                                padding: '4px 10px',
                                                fontSize: '0.625rem',
                                                fontWeight: '600',
                                                color: 'var(--text-muted)',
                                                background: 'var(--bg-elevated)',
                                                borderRadius: '3px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                border: '1px solid var(--border-primary)',
                                            }}
                                        >
                                            <BarChart2 size={10} />
                                            Results
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
