import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Sparkles, Share2, Trophy, BarChart3, Users, Check, GraduationCap, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
    const { theme, toggleTheme } = useTheme();
    const features = [
        { icon: Upload, title: "Upload Anything", desc: "PDFs, PPTs, notes — any lecture content." },
        { icon: Sparkles, title: "AI Generation", desc: "Intelligent MCQs with adaptive distractors." },
        { icon: Share2, title: "Instant Share", desc: "One link. WhatsApp, email, or classroom." },
        { icon: Trophy, title: "Live Rankings", desc: "Real-time leaderboards that drive engagement." },
        { icon: BarChart3, title: "Deep Analytics", desc: "Question-level performance breakdowns." },
        { icon: Users, title: "Unlimited Students", desc: "No cap on participants. Scale freely." },
    ];

    const testimonials = [
        { name: "Priya Sharma", role: "Mathematics, Delhi Public School", quote: "LectureClosure saves me 2+ hours every week. The leaderboard keeps my students motivated.", avatar: "PS" },
        { name: "Rahul Mehta", role: "Science Faculty, Pune", quote: "Finally, a tool that understands Indian educators. The WhatsApp sharing is brilliant.", avatar: "RM" },
        { name: "Anita Desai", role: "English, Mumbai", quote: "My class participation has doubled since I started using live quizzes.", avatar: "AD" },
    ];

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

            {/* ── Hero ── */}
            <section className="landing-hero" style={{
                position: 'relative',
                padding: '8rem 2rem 6rem',
                maxWidth: '1200px',
                margin: '0 auto',
                overflow: 'hidden',
            }}>
                {/* Subtle Grid Background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(var(--border-subtle) 1px, transparent 1px),
                        linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    opacity: 0.35,
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    style={{ position: 'relative', textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}
                >
                    {/* Eyebrow */}
                    <motion.div variants={fadeUp} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.6875rem',
                        fontWeight: '600',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        marginBottom: '2rem',
                        padding: '6px 14px',
                        background: 'var(--accent-muted)',
                        borderRadius: '3px',
                    }}>
                        AI-Powered Assessment
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 variants={fadeUp} style={{
                        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                        lineHeight: 1.05,
                        fontFamily: 'var(--font-display)',
                        fontWeight: '400',
                        color: 'var(--text-primary)',
                        marginBottom: '1.75rem',
                        letterSpacing: '-0.02em',
                    }}>
                        Close the lecture<br />
                        <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>with clarity.</span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p variants={fadeUp} style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                        marginBottom: '3rem',
                        fontWeight: '400',
                        maxWidth: '480px',
                        margin: '0 auto 3rem',
                    }}>
                        Upload. Generate. Share. Measure.
                    </motion.p>

                    {/* CTA */}
                    <motion.div variants={fadeUp}>
                        <Link
                            to="/create"
                            className="btn btn-primary"
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '0.9375rem',
                                fontWeight: '600',
                                letterSpacing: '0.01em',
                            }}
                        >
                            Create a Quiz
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── How It Works ── */}
            <section className="landing-section" style={{
                padding: '6rem 2rem',
                borderTop: '1px solid var(--border-subtle)',
            }}>
                <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="landing-section-header"
                        style={{ marginBottom: '4rem' }}
                    >
                        <p style={{
                            fontSize: '0.6875rem',
                            fontWeight: '600',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--text-dim)',
                            marginBottom: '0.75rem',
                        }}>
                            Process
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '400',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.01em',
                        }}>
                            From upload to live quiz<br />
                            <span style={{ color: 'var(--text-muted)' }}>in under a minute.</span>
                        </h2>
                    </motion.div>

                    <div className="landing-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border-subtle)', borderRadius: '6px', overflow: 'hidden' }}>
                        {[
                            { num: '01', title: 'Upload Content', desc: 'Drop your PDF, PPT, or notes. Paste any text.' },
                            { num: '02', title: 'AI Generates', desc: 'Get MCQs with smart distractors in seconds.' },
                            { num: '03', title: 'Share & Track', desc: 'One link to students. Watch the live leaderboard.' },
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    padding: '2.5rem 2rem',
                                    background: 'var(--bg-card)',
                                }}
                            >
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: '400',
                                    color: 'var(--border-primary)',
                                    marginBottom: '1.5rem',
                                    lineHeight: 1,
                                }}>
                                    {step.num}
                                </div>
                                <h3 style={{
                                    fontSize: '1.0625rem',
                                    fontWeight: '600',
                                    fontFamily: 'var(--font-body)',
                                    color: 'var(--text-primary)',
                                    marginBottom: '0.5rem',
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.6,
                                }}>
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="landing-section" style={{
                padding: '6rem 2rem',
                borderTop: '1px solid var(--border-subtle)',
            }}>
                <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="landing-section-header"
                        style={{ marginBottom: '4rem' }}
                    >
                        <p style={{
                            fontSize: '0.6875rem',
                            fontWeight: '600',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--text-dim)',
                            marginBottom: '0.75rem',
                        }}>
                            Capabilities
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '400',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.01em',
                        }}>
                            Everything you need,<br />
                            <span style={{ color: 'var(--text-muted)' }}>nothing you don't.</span>
                        </h2>
                    </motion.div>

                    <div className="landing-features-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1px',
                        background: 'var(--border-subtle)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                    }}>
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    padding: '2rem',
                                    background: 'var(--bg-card)',
                                    cursor: 'default',
                                    transition: 'background 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
                            >
                                <feature.icon
                                    size={20}
                                    strokeWidth={1.5}
                                    style={{ color: 'var(--text-dim)', marginBottom: '1.25rem' }}
                                />
                                <h3 style={{
                                    fontSize: '0.9375rem',
                                    fontWeight: '600',
                                    fontFamily: 'var(--font-body)',
                                    color: 'var(--text-primary)',
                                    marginBottom: '0.375rem',
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.55,
                                    fontSize: '0.8125rem',
                                }}>
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="landing-section" style={{
                padding: '6rem 2rem',
                borderTop: '1px solid var(--border-subtle)',
            }}>
                <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="landing-section-header"
                        style={{ marginBottom: '4rem' }}
                    >
                        <p style={{
                            fontSize: '0.6875rem',
                            fontWeight: '600',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--text-dim)',
                            marginBottom: '0.75rem',
                        }}>
                            Testimonials
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '400',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.01em',
                        }}>
                            Trusted by educators<br />
                            <span style={{ color: 'var(--text-muted)' }}>across India.</span>
                        </h2>
                    </motion.div>

                    <div className="landing-testimonials-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1px',
                        background: 'var(--border-subtle)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                    }}>
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    padding: '2rem',
                                    background: 'var(--bg-card)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.65,
                                    marginBottom: '1.75rem',
                                    fontStyle: 'italic',
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.0625rem',
                                }}>
                                    "{t.quote}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '4px',
                                        background: 'var(--bg-elevated)',
                                        border: '1px solid var(--border-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '600',
                                        fontSize: '0.6875rem',
                                        color: 'var(--text-muted)',
                                        fontFamily: 'var(--font-mono)',
                                    }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                                            {t.name}
                                        </div>
                                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)' }}>
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Pricing ── */}
            <section className="landing-section" style={{
                padding: '6rem 2rem',
                borderTop: '1px solid var(--border-subtle)',
            }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="landing-section-header"
                        style={{ marginBottom: '4rem' }}
                    >
                        <p style={{
                            fontSize: '0.6875rem',
                            fontWeight: '600',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--text-dim)',
                            marginBottom: '0.75rem',
                        }}>
                            Pricing
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '400',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.01em',
                        }}>
                            Simple, honest pricing.
                        </h2>
                    </motion.div>

                    <div className="landing-pricing-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1px',
                        background: 'var(--border-subtle)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                    }}>
                        {/* Free */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ padding: '2.5rem 2rem', background: 'var(--bg-card)' }}
                        >
                            <p style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Free</p>
                            <div style={{ fontSize: '2.5rem', fontWeight: '300', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: '2rem' }}>
                                ₹0 <span style={{ fontSize: '0.875rem', color: 'var(--text-dim)', fontFamily: 'var(--font-body)', fontWeight: '400' }}>forever</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                {['5 quizzes / month', 'Up to 50 students', 'Basic analytics', 'PDF export'].map((f, i) => (
                                    <li key={i} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.625rem',
                                        color: 'var(--text-muted)',
                                        marginBottom: '0.75rem',
                                        fontSize: '0.8125rem',
                                    }}>
                                        <Check size={14} style={{ color: 'var(--text-dim)', flexShrink: 0 }} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/create" className="btn btn-outline" style={{ width: '100%', padding: '0.875rem' }}>
                                Get Started
                            </Link>
                        </motion.div>

                        {/* Pro */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{
                                padding: '2.5rem 2rem',
                                background: 'var(--bg-card)',
                                position: 'relative',
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                fontSize: '0.5625rem',
                                fontWeight: '700',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--accent)',
                                background: 'var(--accent-muted)',
                                padding: '4px 10px',
                                borderRadius: '3px',
                            }}>
                                Recommended
                            </div>
                            <p style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Pro</p>
                            <div style={{ fontSize: '2.5rem', fontWeight: '300', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: '2rem' }}>
                                ₹199 <span style={{ fontSize: '0.875rem', color: 'var(--text-dim)', fontFamily: 'var(--font-body)', fontWeight: '400' }}>/month</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                {['Unlimited quizzes', 'Unlimited students', 'Advanced analytics', 'All export formats', 'Priority support'].map((f, i) => (
                                    <li key={i} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.625rem',
                                        color: 'var(--text-muted)',
                                        marginBottom: '0.75rem',
                                        fontSize: '0.8125rem',
                                    }}>
                                        <Check size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/create" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
                                Upgrade to Pro
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="landing-cta-section" style={{
                padding: '6rem 2rem',
                borderTop: '1px solid var(--border-subtle)',
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '400',
                            color: 'var(--text-primary)',
                            marginBottom: '1rem',
                            letterSpacing: '-0.01em',
                        }}>
                            Ready to begin?
                        </h2>
                        <p style={{
                            color: 'var(--text-muted)',
                            marginBottom: '2.5rem',
                            fontSize: '1rem',
                        }}>
                            Join 500+ teachers transforming their classrooms.
                        </p>
                        <Link
                            to="/create"
                            className="btn btn-primary"
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '0.9375rem',
                            }}
                        >
                            Create Your First Quiz
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer style={{
                padding: '2.5rem 2rem',
                borderTop: '1px solid var(--border-subtle)',
            }}>
                <div className="landing-footer-inner" style={{
                    maxWidth: '960px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Lecture</span>
                        <span style={{ fontWeight: '400', fontSize: '0.875rem', color: 'var(--text-dim)' }}>Closure</span>
                    </div>
                    <div className="landing-footer-links" style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', alignItems: 'center' }}>
                        <a href="#" style={{ color: 'var(--text-dim)' }}>Privacy</a>
                        <a href="#" style={{ color: 'var(--text-dim)' }}>Terms</a>
                        <a href="#" style={{ color: 'var(--text-dim)' }}>Contact</a>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                width: '56px',
                                height: '28px',
                                borderRadius: '14px',
                                background: theme === 'dark' ? 'var(--bg-elevated)' : 'var(--border-primary)',
                                border: '1px solid var(--border-primary)',
                                cursor: 'pointer',
                                padding: '3px',
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                            }}
                        >
                            <motion.div
                                layout
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: 'var(--accent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: theme === 'dark' ? '0px' : 'auto',
                                }}
                            >
                                {theme === 'dark' ? (
                                    <Moon size={11} style={{ color: '#fff' }} />
                                ) : (
                                    <Sun size={11} style={{ color: '#fff' }} />
                                )}
                            </motion.div>
                        </button>
                    </div>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-dim)' }}>© 2026 LectureClosure</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
