import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Share2, Clock, Target, Users, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getLeaderboard, getQuiz, getQuizShareUrl } from '../services/quizService';

const Leaderboard = () => {
    const { id } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const [lbData, quizData] = await Promise.all([
                getLeaderboard(id),
                getQuiz(id),
            ]);
            if (lbData) setLeaderboard(lbData);
            if (quizData) setQuiz(quizData);
            setShareUrl(getQuizShareUrl(id));
            setLoading(false);
        };
        fetchData();

        // Real-time polling
        const interval = setInterval(async () => {
            const lbData = await getLeaderboard(id);
            if (lbData) setLeaderboard(lbData);
        }, 5000);
        return () => clearInterval(interval);
    }, [id]);

    const filteredEntries = leaderboard.filter(entry =>
        entry.student_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const avgScore = leaderboard.length > 0
        ? Math.round(leaderboard.reduce((sum, e) => sum + e.score, 0) / leaderboard.length)
        : 0;
    const avgTime = leaderboard.length > 0
        ? Math.round(leaderboard.reduce((sum, e) => sum + (e.time_taken || 0), 0) / leaderboard.length)
        : 0;

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
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '2rem 0 4rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: '2rem' }}
                >
                    <Link to="/dashboard" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-dim)',
                        marginBottom: '1.5rem',
                        transition: 'color 180ms ease',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}
                    >
                        <ArrowLeft size={14} />
                        Back
                    </Link>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{
                                fontSize: '0.6875rem',
                                fontWeight: '600',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--text-dim)',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}>
                                Leaderboard
                                {/* Live indicator */}
                                <span style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: 'var(--success)',
                                    display: 'inline-block',
                                    animation: 'livePulse 2s ease-in-out infinite',
                                }} />
                                <span style={{ color: 'var(--success)', fontSize: '0.5625rem', fontWeight: '700' }}>LIVE</span>
                            </p>
                            <h1 style={{
                                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                                fontFamily: 'var(--font-display)',
                                fontWeight: '400',
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.01em',
                            }}>
                                {quiz?.title || 'Quiz Results'}
                            </h1>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(shareUrl)}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                        >
                            <Share2 size={14} />
                            Share
                        </button>
                    </div>
                </motion.div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1px',
                    background: 'var(--border-subtle)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '2rem',
                }}>
                    {[
                        { icon: Users, label: 'Attempts', value: leaderboard.length },
                        { icon: Target, label: 'Avg Score', value: `${avgScore}%` },
                        { icon: Clock, label: 'Avg Time', value: `${Math.floor(avgTime / 60)}m ${avgTime % 60}s` },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            style={{
                                padding: '1.25rem 1.5rem',
                                background: 'var(--bg-card)',
                            }}
                        >
                            <stat.icon size={15} style={{ color: 'var(--text-dim)', marginBottom: '0.75rem' }} />
                            <div style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--text-primary)',
                                fontVariantNumeric: 'tabular-nums',
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

                {/* Search */}
                <div style={{
                    position: 'relative',
                    marginBottom: '1.25rem',
                }}>
                    <Search size={15} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-dim)',
                    }} />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            paddingLeft: '36px',
                            padding: '0.625rem 0.875rem 0.625rem 36px',
                            fontSize: '0.8125rem',
                        }}
                    />
                </div>

                {/* Rankings */}
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                }}>
                    {/* Table header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '60px 1fr 100px 100px',
                        padding: '0.75rem 1.25rem',
                        borderBottom: '1px solid var(--border-subtle)',
                        fontSize: '0.625rem',
                        fontWeight: '700',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                        fontFamily: 'var(--font-mono)',
                    }}>
                        <span>Rank</span>
                        <span>Student</span>
                        <span style={{ textAlign: 'right' }}>Score</span>
                        <span style={{ textAlign: 'right' }}>Time</span>
                    </div>

                    {filteredEntries.length === 0 ? (
                        <div style={{
                            padding: '3rem',
                            textAlign: 'center',
                            color: 'var(--text-dim)',
                            fontSize: '0.8125rem',
                        }}>
                            {leaderboard.length === 0 ? 'No attempts yet.' : 'No results found.'}
                        </div>
                    ) : (
                        filteredEntries.map((entry, idx) => {
                            const rank = idx + 1;
                            const isTop3 = rank <= 3;
                            const maxScore = filteredEntries[0]?.score || 100;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '60px 1fr 100px 100px',
                                        padding: '0.75rem 1.25rem',
                                        borderBottom: idx < filteredEntries.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                        alignItems: 'center',
                                        background: isTop3 ? `rgba(76, 125, 255, ${0.03 - idx * 0.008})` : 'transparent',
                                        transition: 'background 150ms ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = isTop3 ? `rgba(76, 125, 255, ${0.03 - idx * 0.008})` : 'transparent'}
                                >
                                    {/* Rank */}
                                    <span style={{
                                        fontSize: isTop3 ? '1.25rem' : '0.875rem',
                                        fontWeight: isTop3 ? '700' : '500',
                                        fontFamily: 'var(--font-mono)',
                                        color: isTop3 ? 'var(--accent)' : 'var(--text-dim)',
                                        fontVariantNumeric: 'tabular-nums',
                                    }}>
                                        {rank}
                                    </span>

                                    {/* Name + score bar */}
                                    <div>
                                        <span style={{
                                            fontSize: '0.875rem',
                                            fontWeight: isTop3 ? '600' : '500',
                                            color: isTop3 ? 'var(--text-primary)' : 'var(--text-secondary)',
                                            display: 'block',
                                            marginBottom: '4px',
                                        }}>
                                            {entry.student_name || 'Anonymous'}
                                        </span>
                                        {/* Performance bar */}
                                        <div style={{
                                            width: '80%',
                                            maxWidth: '180px',
                                            height: '2px',
                                            background: 'var(--border-primary)',
                                            borderRadius: '1px',
                                        }}>
                                            <div style={{
                                                width: `${(entry.score / maxScore) * 100}%`,
                                                height: '100%',
                                                background: entry.score >= 70 ? 'var(--success)' : entry.score >= 50 ? 'var(--warning)' : 'var(--error)',
                                                borderRadius: '1px',
                                                transition: 'width 300ms ease',
                                            }} />
                                        </div>
                                    </div>

                                    {/* Score */}
                                    <span style={{
                                        textAlign: 'right',
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        fontFamily: 'var(--font-mono)',
                                        fontVariantNumeric: 'tabular-nums',
                                        color: entry.score >= 70 ? 'var(--success)' : entry.score >= 50 ? 'var(--warning)' : 'var(--error)',
                                    }}>
                                        {entry.score}%
                                    </span>

                                    {/* Time */}
                                    <span style={{
                                        textAlign: 'right',
                                        fontSize: '0.75rem',
                                        fontFamily: 'var(--font-mono)',
                                        fontVariantNumeric: 'tabular-nums',
                                        color: 'var(--text-dim)',
                                    }}>
                                        {entry.time_taken ? `${Math.floor(entry.time_taken / 60)}:${(entry.time_taken % 60).toString().padStart(2, '0')}` : '—'}
                                    </span>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
