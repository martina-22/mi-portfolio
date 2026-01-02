import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { cvData } from '../data/cv';

const Footer = () => {
    return (
        <footer style={{
            padding: '40px 20px',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            background: 'var(--bg-secondary)',
            marginTop: '50px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

                {/* Social Links */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    <motion.a
                        href={cvData.personalInfo.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        whileHover={{ y: -3, color: 'var(--accent-primary)' }}
                        style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
                    >
                        <Linkedin size={20} />
                    </motion.a>
                    <motion.a
                        href={cvData.personalInfo.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        whileHover={{ y: -3, color: 'var(--accent-primary)' }}
                        style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
                    >
                        <Github size={20} />
                    </motion.a>
                </div>

                {/* Copyright & Made With */}
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <p style={{ marginBottom: '5px' }}>© {new Date().getFullYear()} {cvData.personalInfo.name}. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
