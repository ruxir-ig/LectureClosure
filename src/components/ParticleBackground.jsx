import React, { useEffect, useRef, useMemo } from 'react';

const ParticleBackground = ({ particleCount = 35 }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null });
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    // Subtle color palette
    const colors = useMemo(() => [
        'rgba(67, 97, 238, 0.4)',   // Blue
        'rgba(124, 58, 237, 0.35)', // Purple
        'rgba(244, 63, 94, 0.3)',   // Pink
        'rgba(245, 158, 11, 0.35)', // Orange
        'rgba(34, 197, 94, 0.3)',   // Green
        'rgba(6, 182, 212, 0.35)',  // Cyan
    ], []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2.5 + 1;
                this.baseSize = this.size;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                // For smooth orbiting around cursor
                this.angle = Math.random() * Math.PI * 2;
                this.orbitSpeed = (Math.random() - 0.5) * 0.015;
            }

            update() {
                const mouse = mouseRef.current;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance < maxDistance) {
                        // Create orbit effect around cursor
                        this.angle += this.orbitSpeed;
                        const orbitRadius = 80 * (distance / maxDistance);
                        const orbitX = mouse.x + Math.cos(this.angle) * orbitRadius;
                        const orbitY = mouse.y + Math.sin(this.angle) * orbitRadius;

                        // Smooth interpolation towards orbit position
                        this.x += (orbitX - this.x) * 0.015;
                        this.y += (orbitY - this.y) * 0.015;

                        // Increase size when near cursor
                        this.size = this.baseSize + (1 - distance / maxDistance) * 1.5;
                    } else {
                        // Normal floating movement
                        this.x += this.speedX;
                        this.y += this.speedY;
                        this.size = this.baseSize;
                    }
                } else {
                    // Normal floating movement when no mouse
                    this.x += this.speedX;
                    this.y += this.speedY;
                }

                // Wrap around edges
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particlesRef.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: null, y: null };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [particleCount, colors]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default ParticleBackground;
