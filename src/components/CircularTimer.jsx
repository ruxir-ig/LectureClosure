import React from 'react';
import { motion } from 'framer-motion';

const CircularTimer = ({
    timeLeft,
    totalTime = 600,
    size = 120,
    strokeWidth = 3,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = timeLeft / totalTime;
    const offset = circumference - (progress * circumference);

    const getColor = () => {
        if (timeLeft <= 30) return 'var(--error)';
        if (timeLeft <= 60) return 'var(--warning)';
        if (timeLeft <= 120) return 'var(--warning)';
        return 'var(--text-muted)';
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return { mins, secs: secs.toString().padStart(2, '0') };
    };

    const { mins, secs } = formatTime(timeLeft);
    const color = getColor();
    const isCritical = timeLeft <= 30;

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                {/* Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--border-primary)"
                    strokeWidth={strokeWidth}
                />
                {/* Progress */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: offset, stroke: color }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </svg>

            {/* Time Display */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: size * 0.24,
                    fontWeight: '500',
                    color: color,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    fontVariantNumeric: 'tabular-nums',
                }}>
                    {mins}:{secs}
                </div>
                <div style={{
                    fontSize: size * 0.08,
                    color: 'var(--text-dim)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: 3,
                    fontFamily: 'var(--font-mono)',
                }}>
                    {isCritical ? 'LOW' : 'REMAINING'}
                </div>
            </div>

            {/* Critical pulse ring */}
            {isCritical && (
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        border: `1px solid ${color}`,
                    }}
                />
            )}
        </div>
    );
};

export default CircularTimer;
