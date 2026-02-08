import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, Users, BarChart2, Share2, Trash2, ExternalLink, TrendingUp, Clock, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const stats = [
        {
            label: 'Total Quizzes',
            value: 12,
            icon: FileText,
            trend: '+3 this week',
            gradient: 'linear-gradient(135deg, #4361EE 0%, #7C3AED 100%)',
            bgLight: '#EEF2FF',
        },
        {
            label: 'Students Reached',
            value: 458,
            icon: Users,
            trend: '+24% vs last month',
            gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
            bgLight: '#F3E8FF',
        },
        {
            label: 'Average Score',
            value: 72,
            suffix: '%',
            icon: BarChart2,
            trend: '↑ 5% improvement',
            gradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            bgLight: '#F0FDF4',
        },
    ];

    const recentQuizzes = [
        { id: '1', title: 'Calculus III - Integration', date: 'Oct 12, 2024', students: 42, avgScore: 84, status: 'active' },
        { id: '2', title: 'Macroeconomics Intro', date: 'Oct 10, 2024', students: 120, avgScore: 68, status: 'active' },
        { id: '3', title: 'Genetics Lab Quiz', date: 'Oct 08, 2024', students: 25, avgScore: 92, status: 'closed' },
        { id: '4', title: 'Modern History - WW2', date: 'Oct 05, 2024', students: 85, avgScore: 75, status: 'active' },
    ];

    const filteredQuizzes = recentQuizzes.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Mini sparkline data
    const sparklineData = [3, 5, 2, 8, 4, 6, 9, 7, 11, 8, 12, 10];

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%)', padding: '2rem 0 4rem' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2.5rem' }}
                >
                    <div>
                        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                            Welcome back, Professor!
                        </h1>
                        <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
                            Here's what's happening with your quizzes.
                        </p>
                    </div>
                    <Link
                        to="/create"
                        className="btn btn-primary"
                        style={{
                            padding: '1rem 1.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 8px 24px rgba(67, 97, 238, 0.25)',
                        }}
                    >
                        <Plus size={20} />
                        Create New Quiz
                    </Link>
                </motion.div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            style={{
                                background: 'white',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Gradient accent */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: stat.gradient,
                            }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: stat.gradient,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}>
                                    <stat.icon size={24} />
                                </div>

                                {/* Mini sparkline */}
                                <svg width="60" height="24" style={{ opacity: 0.6 }}>
                                    <polyline
                                        fill="none"
                                        stroke="#4361EE"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points={sparklineData.map((v, i) => `${i * 5},${24 - v * 2}`).join(' ')}
                                    />
                                </svg>
                            </div>

                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                                {stat.label}
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1A1A2E', lineHeight: 1, marginBottom: '0.5rem' }}>
                                <AnimatedCounter value={stat.value} duration={1.5} suffix={stat.suffix || ''} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: '#22C55E' }}>
                                <TrendingUp size={14} />
                                {stat.trend}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2.5rem'
                    }}
                >
                    {[
                        { icon: Sparkles, label: 'AI Quiz from Notes', desc: 'Upload & generate' },
                        { icon: Calendar, label: 'Schedule Quiz', desc: 'Set a date' },
                        { icon: Users, label: 'Invite Students', desc: 'Share link' },
                    ].map((action, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '14px',
                                padding: '1rem 1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = '#4361EE';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(67, 97, 238, 0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#E5E7EB';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: '#EEF2FF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <action.icon size={18} style={{ color: '#4361EE' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#1A1A2E' }}>{action.label}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{action.desc}</div>
                            </div>
                            <ChevronRight size={16} style={{ color: '#D1D5DB' }} />
                        </div>
                    ))}
                </motion.div>

                {/* Recent Quizzes Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        background: 'white',
                        borderRadius: '20px',
                        border: '1px solid #E5E7EB',
                        overflow: 'hidden',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    }}
                >
                    {/* Table Header */}
                    <div style={{
                        padding: '1.25rem 1.5rem',
                        borderBottom: '1px solid #F3F4F6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Recent Quizzes</h2>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                            <input
                                type="text"
                                placeholder="Search quizzes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '0.625rem 1rem 0.625rem 2.25rem',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '10px',
                                    fontSize: '0.875rem',
                                    width: '220px',
                                    outline: 'none',
                                }}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#FAFBFC' }}>
                                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quiz</th>
                                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Created</th>
                                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Students</th>
                                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Score</th>
                                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredQuizzes.map((quiz, idx) => (
                                    <motion.tr
                                        key={quiz.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + idx * 0.05 }}
                                        style={{ borderBottom: '1px solid #F3F4F6' }}
                                    >
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                                                <div style={{
                                                    width: '42px',
                                                    height: '42px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <FileText size={20} style={{ color: '#4361EE' }} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600', color: '#1A1A2E' }}>{quiz.title}</div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                                                        <span style={{
                                                            width: '6px',
                                                            height: '6px',
                                                            borderRadius: '50%',
                                                            background: quiz.status === 'active' ? '#22C55E' : '#9CA3AF',
                                                        }} />
                                                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'capitalize' }}>{quiz.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.875rem' }}>
                                                <Clock size={14} />
                                                {quiz.date}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.875rem' }}>
                                                <Users size={14} />
                                                {quiz.students}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '0.375rem 0.75rem',
                                                borderRadius: '8px',
                                                background: quiz.avgScore >= 80 ? '#F0FDF4' : quiz.avgScore >= 60 ? '#FFFBEB' : '#FEF2F2',
                                                color: quiz.avgScore >= 80 ? '#22C55E' : quiz.avgScore >= 60 ? '#F59E0B' : '#EF4444',
                                                fontWeight: '600',
                                                fontSize: '0.875rem',
                                            }}>
                                                {quiz.avgScore}%
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                                                <button style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF' }} title="Share">
                                                    <Share2 size={16} />
                                                </button>
                                                <Link to={`/leaderboard/${quiz.id}`} style={{ padding: '0.5rem', borderRadius: '8px', background: 'transparent', color: '#9CA3AF', display: 'flex' }} title="View Results">
                                                    <BarChart2 size={16} />
                                                </Link>
                                                <button style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF' }} title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '1rem', background: '#FAFBFC', textAlign: 'center' }}>
                        <button style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#4361EE',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                        }}>
                            View all quizzes
                            <ExternalLink size={14} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
