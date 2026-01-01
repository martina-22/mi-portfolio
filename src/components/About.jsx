import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cv';
import { Code, User, Globe, Cpu } from 'lucide-react';

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

                {/* 3. Tech Stack - Full Width Grid inside */}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                        <Code size={24} />
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Habilidades Técnicas</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                        {/* Lenguajes */}
                        <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>
                                Lenguajes
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {cvData.skills.languages?.map((skill, i) => (
                                    <motion.span
                                        key={i}
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
                                ))}
                            </div>
                        </div>

                        {/* Frameworks & Libs */}
                        <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>
                                Frameworks
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {cvData.skills.frameworks?.map((skill, i) => (
                                    <motion.span
                                        key={i}
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
                                ))}
                            </div>
                        </div>

                        {/* Tools */}
                        <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>
                                Herramientas
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {cvData.skills.tools?.map((skill, i) => (
                                    <motion.span
                                        key={i}
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
