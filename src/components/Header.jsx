import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Inicio', path: '/' },
        { name: 'Sobre Mí', path: '/about' },
        { name: 'Experiencia', path: '/projects' },
        { name: 'Educación', path: '/experience' },
        { name: 'Contacto', path: '/contact' },
    ];

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: scrolled ? '15px 5% ' : '25px 5%',
            background: scrolled || menuOpen ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
            backdropFilter: scrolled || menuOpen ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <NavLink to="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', zIndex: 1001 }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'monospace' }}
                >
                    MG<span style={{ color: 'var(--accent-primary)' }}>.</span>
                </motion.div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" style={{ display: 'none', gap: '30px' }}> {/* Requires CSS media query to show */}
                <ul style={{ display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0 }}>
                    {links.map((link, i) => (
                        <motion.li
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <NavLink
                                to={link.path}
                                style={({ isActive }) => ({
                                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                })}
                            >
                                <span style={{ color: 'var(--accent-primary)', fontSize: '0.8em' }}>0{i + 1}.</span>
                                {link.name}
                            </NavLink>
                        </motion.li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Menu Button - Visible only on mobile via CSS ideally, or we use window width. For now, assuming direct JS control or CSS class */}
            <div
                className="mobile-toggle"
                style={{ zIndex: 1001, cursor: 'pointer' }}
                onClick={toggleMenu}
                role="button"
                tabIndex={0}
                aria-label="Menú de navegación"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        toggleMenu();
                    }
                }}
            >
                {menuOpen ? <X size={28} color="var(--text-primary)" /> : <Menu size={28} color="var(--text-primary)" />}
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '70%',
                            height: '100vh',
                            background: '#111',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'center', padding: 0 }}>
                            {links.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setMenuOpen(false)}
                                        style={({ isActive }) => ({
                                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            fontSize: '1.2rem',
                                            fontWeight: '500',
                                            transition: 'color 0.3s ease',
                                            display: 'block'
                                        })}
                                    >
                                        <span style={{ color: 'var(--accent-primary)', display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>0{i + 1}.</span>
                                        {link.name}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Style Injection for Responsiveness - Since we can't edit CSS right now easily without context switch */}
            <style>{`
                @media (min-width: 768px) {
                    .desktop-nav { display: flex !important; }
                    .mobile-toggle { display: none !important; }
                }
                @media (max-width: 767px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}</style>
        </header>
    );
};

export default Header;
