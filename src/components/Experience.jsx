import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { cvData } from '../data/cv';
import { GraduationCap, BookOpen, Calendar, Award } from 'lucide-react';

const EducationCard = ({ data, type, index }) => {
    return (
        <Tilt options={{ max: 15, scale: 1.02, speed: 400 }} style={{ height: '100%' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                style={{
                    background: 'var(--bg-secondary)',
                    padding: '2rem',
                    borderRadius: '15px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'default'
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            padding: '10px',
                            borderRadius: '10px',
                            color: 'var(--accent-primary)'
                        }}>
                            {type === 'education' ? <GraduationCap size={24} /> : <Award size={24} />}
                        </div>
                        {data.period && (
                            <span style={{
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '6px 12px',
                                borderRadius: '20px'
                            }}>
                                {data.period}
                            </span>
                        )}
                    </div>

                    <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                        {data.role || data.degree || data.name}
                    </h4>

                    {data.company && (
                        <p style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                            {data.company}
                        </p>
                    )}

                    {data.institution && (
                        <p style={{ color: 'var(--accent-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                            {data.institution}
                        </p>
                    )}

                    {data.description && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            {data.description}
                        </p>
                    )}
                </div>

                {data.status && (
                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--accent-secondary)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            Estado: {data.status}
                        </span>
                    </div>
                )}
            </motion.div>
        </Tilt>
    );
};

const Experience = () => {
    return (
        <section id="experience" style={{ padding: '100px 20px' }}>
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
                    Educación
                </span>
                <span style={{
                    height: '2px',
                    flex: 1,
                    background: 'linear-gradient(90deg, var(--accent-primary), transparent)',
                    maxWidth: '200px',
                    borderRadius: '2px'
                }}></span>
            </motion.h2>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Education Section */}
                <div style={{ marginBottom: '5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {cvData.education.map((edu, i) => (
                            <EducationCard key={i} data={edu} type="education" index={i} />
                        ))}
                    </div>
                </div>

                {/* Courses Section */}
                <div>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-primary)' }}>
                        <BookOpen color="var(--accent-secondary)" />
                        <span style={{ background: 'linear-gradient(90deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Cursos & Certificaciones
                        </span>
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {cvData.courses.map((course, i) => (
                            <EducationCard key={i} data={course} type="course" index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
