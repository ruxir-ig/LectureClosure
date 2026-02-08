import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({
    value,
    duration = 1.5,
    className = '',
    prefix = '',
    suffix = '',
}) => {
    const spring = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    useEffect(() => {
        const unsubscribe = spring.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });
        return unsubscribe;
    }, [spring]);

    return (
        <motion.span
            className={className}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {prefix}{displayValue.toLocaleString()}{suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
