import React from 'react';
import { motion } from 'framer-motion';

const Confetti = ({ isActive = false }) => {
    if (!isActive) return null;

    // Muted, dark-theme-appropriate palette
    const colors = ['#4C7DFF', '#2E7D5B', '#C4841D', '#8B8F98', '#5E8CFF', '#D94452'];

    const pieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
        size: Math.random() * 6 + 3,
    }));

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden',
        }}>
            {pieces.map((piece) => (
                <motion.div
                    key={piece.id}
                    initial={{
                        x: `${piece.x}vw`,
                        y: -20,
                        rotate: 0,
                        opacity: 0.8,
                    }}
                    animate={{
                        y: '110vh',
                        rotate: piece.rotation + 720,
                        opacity: [0.8, 0.6, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        delay: piece.delay,
                        ease: 'linear',
                    }}
                    style={{
                        position: 'absolute',
                        width: piece.size,
                        height: piece.size * 0.6,
                        backgroundColor: piece.color,
                        borderRadius: '1px',
                    }}
                />
            ))}
        </div>
    );
};

export default Confetti;
