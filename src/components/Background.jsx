import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = `rgba(${Math.random() > 0.5 ? '139, 92, 246' : '56, 189, 248'}, ${Math.random() * 0.3 + 0.1})`; // Violet or Cyan
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const mouse = { x: null, y: null, radius: 200 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient blobs
            const time = Date.now() * 0.0005;
            const gradient1 = ctx.createRadialGradient(
                canvas.width * 0.2 + Math.sin(time) * 100, canvas.height * 0.3 + Math.cos(time * 0.8) * 100, 0,
                canvas.width * 0.2 + Math.sin(time) * 100, canvas.height * 0.3 + Math.cos(time * 0.8) * 100, 600
            );
            gradient1.addColorStop(0, 'rgba(139, 92, 246, 0.05)'); // Low opacity violet
            gradient1.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gradient2 = ctx.createRadialGradient(
                canvas.width * 0.8 + Math.cos(time * 0.5) * 100, canvas.height * 0.7 + Math.sin(time * 0.9) * 100, 0,
                canvas.width * 0.8 + Math.cos(time * 0.5) * 100, canvas.height * 0.7 + Math.sin(time * 0.9) * 100, 500
            );
            gradient2.addColorStop(0, 'rgba(56, 189, 248, 0.05)'); // Low opacity blue
            gradient2.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw lines between particles (Constellation effect)
            ctx.lineWidth = 0.5;
            for (let a = 0; a < particles.length; a++) {
                // Inter-particle connection
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 - distance / 1000})`; // Fade out with distance
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                // Mouse connection
                if (mouse.x != null) {
                    const dx = particles[a].x - mouse.x;
                    const dy = particles[a].y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 - distance / mouse.radius})`; // Stronger connection near mouse
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();

                        // Optional: Slight attraction or repulsion
                        // const forceDirectionX = dx / distance;
                        // const forceDirectionY = dy / distance;
                        // const force = (mouse.radius - distance) / mouse.radius;
                        // const directionX = forceDirectionX * force * 0.5;
                        // const directionY = forceDirectionY * force * 0.5;
                        // particles[a].vx -= directionX; // Attraction
                        // particles[a].vy -= directionY;
                    }
                }
            }

            // Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'var(--bg-primary)',
                pointerEvents: 'none'
            }}
        />
    );
};

export default Background;
