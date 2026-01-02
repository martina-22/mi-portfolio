import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { projects as projectsData } from '../data/projects';
import { X } from 'lucide-react';

const Projects = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <section id="projects" style={{ padding: '100px 20px' }}>
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
                    Experiencia Laboral
                </span>
                <span style={{
                    height: '2px',
                    flex: 1,
                    background: 'linear-gradient(90deg, var(--accent-primary), transparent)',
                    maxWidth: '200px',
                    borderRadius: '2px'
                }}></span>
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {projectsData.map((project) => (
                    <div key={project.id} style={{ height: '100%' }}>
                        <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.02} transitionSpeed={400} style={{ height: '100%' }}>
                            <motion.div
                                onClick={() => setSelectedId(project.id)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    padding: '2rem',
                                    borderRadius: '15px',
                                    cursor: 'none',
                                    height: '100%',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '5px',
                                    background: `linear-gradient(90deg, ${project.color.split(' ')[1].replace('to-', '') === 'blue-600' ? '#2563eb' : '#9333ea'}, transparent)`
                                }} />
                                <div style={{ marginBottom: '1.5rem', overflow: 'hidden', borderRadius: '10px' }}>
                                    {/* Placeholder for project image if we had one, keeping structure clean */}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{project.description}</p>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {project.tech.map((tech) => (
                                        <span key={tech} style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', background: 'rgba(139, 92, 246, 0.1)', padding: '5px 10px', borderRadius: '5px' }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </Tilt>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2000,
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(5px)',
                        padding: '20px'
                        onclick={() => setSelectedId(null)}>
                <motion.div
                    layoutId={selectedId}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        maxHeight: '90vh', // Prevent going off-screen
                        overflowY: 'auto', // Enable scrolling inside modal
                        background: 'var(--bg-secondary)',
                        padding: '40px',
                        borderRadius: '15px',
                        position: 'relative',
                        border: '1px solid var(--accent-primary)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        margin: '20px' // Ensure gap on mobile
                    }}
                >
                    <button
                        onClick={() => setSelectedId(null)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        <X />
                    </button>

                    {projectsData.map(project => {
                        if (project.id === selectedId) {
                            return (
                                <div key={project.id}>
                                    <motion.h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>
                                        {project.title}
                                    </motion.h2>
                                    <motion.p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                                        {project.details}
                                    </motion.p>

                                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                        <h5 style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Tecnologías:</h5>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                            {project.tech.map(t => (
                                                <span key={t} style={{
                                                    fontSize: '0.9rem',
                                                    color: 'var(--accent-primary)',
                                                    background: 'rgba(139, 92, 246, 0.1)',
                                                    padding: '5px 10px',
                                                    borderRadius: '5px'
                                                }}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </motion.div>
            </div>
                )}
        </AnimatePresence>
        </section >
    );
};

export default Projects;
