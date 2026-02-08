import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Share2, Trophy, Clock, FileUp, Check, GraduationCap, Star, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';
import ParticleBackground from '../components/ParticleBackground';

const FeatureCard = ({ icon: Icon, title, desc, color, gradient }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        style={{
            padding: '2rem',
            background: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
        <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
            style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: 'white',
            }}
        >
            <Icon size={26} />
        </motion.div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>{title}</h3>
        <p style={{ color: '#6B7280', lineHeight: 1.7 }}>{desc}</p>
    </motion.div>
);

const PricingCard = ({ name, price, features, popular, buttonText, to }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        style={{
            padding: '2rem',
            borderRadius: '20px',
            border: popular ? '2px solid #1A1A2E' : '1px solid #E5E7EB',
            background: popular ? 'linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%)' : 'white',
            position: 'relative',
            boxShadow: popular ? '0 20px 40px rgba(0,0,0,0.1)' : 'none',
        }}
    >
        {popular && (
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#1A1A2E',
                color: 'white',
                fontSize: '0.625rem',
                fontWeight: '700',
                padding: '0.375rem 0.875rem',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
            }}>
                Most Popular
            </div>
        )}
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{name}</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>
            {price} <span style={{ fontSize: '1rem', fontWeight: '400', color: '#9CA3AF' }}>/mo</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
            {features.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4B5563', marginBottom: '0.75rem' }}>
                    <Check size={18} style={{ color: '#22C55E' }} /> {feature}
                </li>
            ))}
        </ul>
        <Link
            to={to}
            className={`btn ${popular ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'block', textAlign: 'center', padding: '1rem' }}
        >
            {buttonText}
        </Link>
    </motion.div>
);

const Landing = () => {
    const features = [
        { icon: FileUp, title: "Zero-Effort Upload", desc: "Drop your PDFs, PPTs, or raw notes. Our AI parses context instantly.", gradient: 'linear-gradient(135deg, #4361EE 0%, #7C3AED 100%)' },
        { icon: Zap, title: "AI Generation", desc: "Get 10+ high-quality MCQ questions with explanations in under 30 seconds.", gradient: 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)' },
        { icon: Share2, title: "One-Click Share", desc: "Send a magic link to your students via WhatsApp or Google Classroom.", gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' },
        { icon: Trophy, title: "Live Leaderboards", desc: "Fuel healthy competition with real-time rankings and performance metrics.", gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' },
        { icon: Clock, title: "Time Saver", desc: "Reduce 2 hours of quiz prep to just 30 seconds. Focus on teaching.", gradient: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)' },
        { icon: Sparkles, title: "Auto Grading", desc: "Detailed results for every student, automatically graded and analyzed.", gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)' }
    ];

    const testimonials = [
        { name: "Priya Sharma", role: "Math Teacher, Delhi", quote: "LectureClosure cut my quiz prep from 2 hours to 5 minutes. Game changer!", avatar: "PS" },
        { name: "Rahul Mehta", role: "Science Faculty, Pune", quote: "Students love the live leaderboard. Engagement has never been higher.", avatar: "RM" },
        { name: "Anita Desai", role: "English Teacher, Mumbai", quote: "The AI understands context so well. Questions are always relevant.", avatar: "AD" },
    ];

    return (
        <div style={{ background: '#FFFFFF', position: 'relative' }}>
            {/* Interactive Particle Background */}
            <ParticleBackground particleCount={80} />

            {/* Hero Section */}
            <section style={{ padding: '5rem 0 6rem', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
                {/* Background gradient */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(67, 97, 238, 0.08) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }} />

                <div className="container" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'linear-gradient(135deg, #EEF2FF 0%, #FDF4FF 100%)',
                                border: '1px solid #E0E7FF',
                                borderRadius: '999px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#4361EE',
                                marginBottom: '2rem'
                            }}
                        >
                            <motion.span
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4361EE' }}
                            />
                            New: AI-powered Video Analysis
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                                marginBottom: '1.5rem',
                                lineHeight: 1.1,
                                fontFamily: 'var(--font-display)',
                                fontWeight: '800',
                            }}
                        >
                            Turn your lectures into <br />
                            <span style={{
                                background: 'linear-gradient(135deg, #4361EE 0%, #7C3AED 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontStyle: 'italic',
                            }}>
                                quizzes
                            </span> in seconds.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                fontSize: '1.25rem',
                                color: '#6B7280',
                                marginBottom: '2.5rem',
                                maxWidth: '600px',
                                margin: '0 auto 2.5rem',
                                lineHeight: 1.7
                            }}
                        >
                            Upload your notes, PPTs, or PDFs. LectureClosure uses AI to generate engaging quizzes and leaderboards for your students.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}
                        >
                            <Link
                                to="/create"
                                className="btn btn-primary"
                                style={{
                                    fontSize: '1.125rem',
                                    padding: '1.25rem 2.5rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 12px 32px rgba(67, 97, 238, 0.3)',
                                }}
                            >
                                Create a Quiz Now
                                <ArrowRight size={20} />
                            </Link>
                            <a
                                href="#features"
                                className="btn btn-outline"
                                style={{ fontSize: '1.125rem', padding: '1.25rem 2.5rem' }}
                            >
                                Explore Features
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Floating UI Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        style={{ marginTop: '4rem', perspective: '1000px' }}
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
                                padding: '1.5rem',
                                maxWidth: '500px',
                                margin: '0 auto',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.375rem' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E' }} />
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: '500' }}>LectureClosure Quiz</div>
                            </div>
                            <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '1rem' }}>
                                <div style={{ fontSize: '0.625rem', color: '#4361EE', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Question 1 of 10</div>
                                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>What is the primary function of mitochondria?</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {['Energy production (ATP)', 'Protein synthesis', 'Cell division', 'DNA replication'].map((opt, idx) => (
                                        <div key={idx} style={{
                                            padding: '0.625rem 0.875rem',
                                            borderRadius: '8px',
                                            border: idx === 0 ? '2px solid #4361EE' : '1px solid #E5E7EB',
                                            background: idx === 0 ? '#EEF2FF' : 'white',
                                            fontSize: '0.875rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                        }}>
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '6px',
                                                background: idx === 0 ? '#4361EE' : '#F3F4F6',
                                                color: idx === 0 ? 'white' : '#9CA3AF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                            }}>
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section style={{ padding: '3rem 0', background: '#FAFBFC', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
                        {[
                            { value: 10000, suffix: '+', label: 'Quizzes Created' },
                            { value: 500, suffix: '+', label: 'Teachers' },
                            { value: 50000, suffix: '+', label: 'Students Reached' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1A1A2E' }}>
                                    <AnimatedCounter value={stat.value} duration={2} suffix={stat.suffix} />
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: '800' }}>
                            Everything teacher-led.
                        </h2>
                        <p style={{ fontSize: '1.25rem', color: '#6B7280' }}>Built specifically for the modern Indian classroom.</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {features.map((feature, idx) => (
                            <FeatureCard key={idx} {...feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '6rem 0', background: '#FAFBFC' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: '800' }}>
                            Loved by teachers
                        </h2>
                        <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>Join hundreds of educators transforming their classrooms</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    border: '1px solid #E5E7EB',
                                }}
                            >
                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} style={{ fill: '#FBBF24', color: '#FBBF24' }} />)}
                                </div>
                                <p style={{ color: '#374151', lineHeight: 1.6, marginBottom: '1rem' }}>"{t.quote}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #4361EE 0%, #7C3AED 100%)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '600',
                                        fontSize: '0.875rem',
                                    }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{t.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: '800' }}>
                            Simple, transparent pricing.
                        </h2>
                        <p style={{ fontSize: '1.25rem', color: '#6B7280' }}>Fueling education for teachers across India.</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
                        <PricingCard
                            name="Basic"
                            price="₹0"
                            features={['3 Quizzes / month', '30 Students / quiz', 'Basic Analytics']}
                            buttonText="Get Started"
                            to="/create"
                        />
                        <PricingCard
                            name="Teacher Pro"
                            price="₹199"
                            features={['Unlimited Quizzes', '100 Students / quiz', 'Full Analytics', 'PDF Export']}
                            popular={true}
                            buttonText="Go Pro"
                            to="/create"
                        />
                        <PricingCard
                            name="School"
                            price="Custom"
                            features={['Bulk Management', 'Priority Support', 'Custom Branding']}
                            buttonText="Contact Sales"
                            to="/dashboard"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '6rem 0', background: '#FAFBFC' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            padding: '4rem 2rem',
                            background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%)',
                            color: 'white',
                            borderRadius: '24px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Decorative elements */}
                        <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(67, 97, 238, 0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: '800' }}>
                                Ready to revolutionize your classroom?
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '1.125rem' }}>
                                Join 500+ teachers already saving hours on quiz prep
                            </p>
                            <Link
                                to="/create"
                                className="btn"
                                style={{
                                    background: 'white',
                                    color: '#1A1A2E',
                                    padding: '1.25rem 2.5rem',
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                }}
                            >
                                Get Started for Free
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '3rem 0', borderTop: '1px solid #F3F4F6' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '32px', height: '32px', background: '#1A1A2E', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <GraduationCap size={18} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.25rem' }}>LectureClosure</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#6B7280' }}>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>© 2026 LectureClosure AI. Made with ❤️ in India.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
