import { motion } from 'framer-motion';
import { cvData } from '../data/cv';
import { Github, Linkedin, FileText, ArrowRight } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0 10%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Gradient Blob */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%)',
                opacity: 0.4,
                zIndex: -1,
                filter: 'blur(50px)',
                pointerEvents: 'none'
            }} />

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: 800,
                    lineHeight: 1.1
                }}
            >
                {cvData.personalInfo.name}<span style={{ color: 'var(--accent-primary)' }}>.</span>
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: 'var(--text-secondary)'
                }}
            >
                <Typewriter
                    options={{
                        strings: [
                            cvData.personalInfo.title,
                            'Estudiante de Informática.',
                        ],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                    }}
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    marginTop: '2rem',
                    maxWidth: '600px',
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)'
                }}
            >
                {cvData.personalInfo.summary}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{ marginTop: '3rem', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}
            >
                <a
                    href="/cv_martina_garcia.pdf"
                    download
                    style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))',
                        borderRadius: '5px',
                        color: 'white',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 4px 15px var(--accent-glow)'
                    }}
                >
                    <FileText size={20} />
                    Descargar CV
                </a>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <a
                        href={cvData.personalInfo.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <Github size={28} />
                    </a>
                    <a
                        href={cvData.personalInfo.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <Linkedin size={28} />
                    </a>
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
