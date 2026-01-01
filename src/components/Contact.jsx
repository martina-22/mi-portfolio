import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cv';
import { Mail, Phone, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // IMPORTANTE: Reemplaza "xpwaqzzg" por TU propio ID de formulario de Formspree
            // 1. Ve a https://formspree.io/
            // 2. Crea un "New Form"
            // 3. Copia el código alfanumérico del final de la URL (ej: f/xpwaqzzg -> xpwaqzzg)
            const formId = "xkogoloy";

            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    nombre: formData.name,
                    contacto: formData.email, // Formspree busca 'email' para responder
                    mensaje: formData.message
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (status === 'success') {
        return (
            <section id="contact" style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '15px' }}
                >
                    <div style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }}>
                        <Send size={48} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Mensaje Enviado!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Gracias por contactarme. Te responderé lo antes posible.
                    </p>
                    <button
                        onClick={() => setStatus('')}
                        style={{
                            padding: '10px 24px',
                            background: 'transparent',
                            border: '1px solid var(--accent-primary)',
                            color: 'var(--accent-primary)',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Enviar otro mensaje
                    </button>
                </motion.div>
            </section>
        );
    }

    return (
        <section id="contact" style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}
            >
                Contacto
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Información de Contacto</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                        Estoy abierta a nuevas oportunidades y colaboraciones. ¡No dudes en contactarme!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ padding: '10px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</p>
                                <a href={`mailto:${cvData.personalInfo.contact.email}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
                                    {cvData.personalInfo.contact.email}
                                </a>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ padding: '10px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '10px', color: 'var(--accent-secondary)' }}>
                                <Phone size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Teléfono</p>
                                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{cvData.personalInfo.contact.phone}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: '2rem',
                        borderRadius: '15px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.2)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Contacto</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.2)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Mensaje</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.2)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    resize: 'vertical',
                                    minHeight: '150px',
                                    maxHeight: '300px'
                                }}
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                border: 'none',
                                background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <Send size={18} />
                            Enviar Mensaje
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            <footer style={{ marginTop: '50px', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', fontFamily: 'monospace' }}>

            </footer>
        </section>
    );
};

export default Contact;
