import React from 'react';
import { motion } from 'framer-motion';

const CircularTimer = ({
    timeLeft,
    totalTime = 600,
    size = 120,
    strokeWidth = 8,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = timeLeft / totalTime;
    const offset = circumference - (progress * circumference);

    // Color transitions based on time remaining
    const getColor = () => {
        if (timeLeft <= 30) return '#EF4444'; // Red - critical
        if (timeLeft <= 60) return '#F59E0B'; // Orange - warning
        if (timeLeft <= 120) return '#EAB308'; // Yellow - caution
        return '#22C55E'; // Green - plenty of time
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return { mins, secs: secs.toString().padStart(2, '0') };
    };

    const { mins, secs } = formatTime(timeLeft);
    const color = getColor();
    const isCritical = timeLeft <= 30;
    const isWarning = timeLeft <= 60;

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            {/* Background circle */}
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
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
                    animate={{
                        strokeDashoffset: offset,
                        stroke: color,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                        filter: isCritical ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))' : 'none',
                    }}
                />
            </svg>

            {/* Time display */}
            <motion.div
                animate={isCritical ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}
            >
                <div style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: size * 0.28,
                    fontWeight: 'bold',
                    color: color,
                    lineHeight: 1,
                }}>
                    {mins}:{secs}
                </div>
                <div style={{
                    fontSize: size * 0.09,
                    color: '#9CA3AF',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: 4,
                }}>
                    {isCritical ? 'HURRY!' : isWarning ? 'TIME LOW' : 'REMAINING'}
                </div>
            </motion.div>

            {/* Pulse effect for critical time */}
            {isCritical && (
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        border: `2px solid ${color}`,
                    }}
                />
            )}
        </div>
    );
};

export default CircularTimer;
