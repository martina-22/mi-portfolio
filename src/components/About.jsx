import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cv';
import { Code, User, Globe, Cpu } from 'lucide-react';

const SkillTag = ({ skill }) => (
    <motion.span
        whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-primary)', color: 'white' }}
        style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--bg-primary)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            cursor: 'default',
            fontWeight: 500,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s, color 0.2s'
        }}
    >
        {skill}
    </motion.span>
);

// Helper component for skill rows
const SkillRow = ({ title, skills, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: delay, duration: 0.4 }}
        style={{
            display: 'grid',
            gridTemplateColumns: '150px 1fr',
            gap: '20px',
            alignItems: 'start',
            padding: '15px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
    >
        <h4 style={{
            color: 'var(--accent-primary)',
            fontSize: '0.95rem',
            margin: 0,
            paddingTop: '6px', // Align with tags
            fontWeight: 600
        }}>
            {title}
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills?.map((skill, i) => (
                <SkillTag key={i} skill={skill} />
            ))}
        </div>
    </motion.div>
);

const About = () => {
    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
            }
        })
    };

    return (
        <section id="about" style={{ padding: '100px 20px' }}>
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '3rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}
            >
                <span style={{
                    background: 'linear-gradient(45deg, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Sobre Mí
                </span>
                <span style={{
                    height: '2px',
                    flex: 1,
                    background: 'linear-gradient(90deg, var(--accent-primary), transparent)',
                    maxWidth: '200px',
                    borderRadius: '2px'
                }}></span>
            </motion.h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                {/* 1. Bio Card - Main Info */}
                <motion.div
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariants}
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: '2rem',
                        borderRadius: '15px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        gridColumn: 'span 2' // Tries to take more space if available
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                        <User size={24} />
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Perfil Profesional</h3>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{cvData.personalInfo.summary}</p>
                </motion.div>

                {/* 2. Languages Card - Compact */}
                <motion.div
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariants}
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: '2rem',
                        borderRadius: '15px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                        <Globe size={24} />
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Idiomas</h3>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {cvData.languages.map((lang, i) => (
                            <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lang.name}</span>
                                <span style={{ fontSize: '0.85em', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                                    {lang.level}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* 3. Tech Stack - Structured List */}
                <motion.div
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariants}
                    style={{
                        background: 'rgba(139, 92, 246, 0.05)', // Subtle tint
                        padding: '2rem',
                        borderRadius: '15px',
                        border: '1px solid var(--accent-glow)',
                        gridColumn: '1 / -1' // Full width
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', color: 'var(--accent-primary)' }}>
                        <Code size={24} />
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Habilidades Técnicas</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <SkillRow title="Lenguajes" skills={cvData.skills.languages} delay={0.1} />
                        <SkillRow title="Frameworks" skills={cvData.skills.frameworks} delay={0.2} />
                        <SkillRow title="Librerías" skills={cvData.skills.libraries} delay={0.3} />
                        <SkillRow title="Bases de Datos" skills={cvData.skills.databases} delay={0.4} />
                        <SkillRow title="Arquitecturas" skills={cvData.skills.concepts} delay={0.5} />
                        {/* Remove border from last item */}
                        <div style={{ paddingTop: '15px', display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px' }}>
                            <h4 style={{ color: 'var(--accent-primary)', fontSize: '0.95rem', margin: 0, paddingTop: '6px', fontWeight: 600 }}>
                                Herramientas
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {cvData.skills.tools?.map((skill, i) => (
                                    <SkillTag key={i} skill={skill} />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
