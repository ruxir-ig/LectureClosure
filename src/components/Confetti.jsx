import React from 'react';
import { motion } from 'framer-motion';

const Confetti = ({ isActive = false, duration = 3000 }) => {
    if (!isActive) return null;

    const colors = ['#4361EE', '#F72585', '#FFD700', '#4CC9F0', '#7209B7', '#3A0CA3'];

    const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
        size: Math.random() * 8 + 4,
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
                        opacity: 1,
                    }}
                    animate={{
                        y: '110vh',
                        rotate: piece.rotation + 720,
                        opacity: [1, 1, 0],
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
                        borderRadius: '2px',
                    }}
                />
            ))}
        </div>
    );
};

export default Confetti;
