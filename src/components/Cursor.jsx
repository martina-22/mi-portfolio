import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPC, setIsPC] = useState(false);

    useEffect(() => {
        // Check if device has a fine pointer (like a mouse)
        const checkDevice = () => {
            const match = window.matchMedia('(pointer: fine)');
            setIsPC(match.matches);
            if (match.matches) setIsVisible(true);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseOver = (e) => {
            // Check if target or parent is clickable
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('clickable'); // Add support for custom clickable class

            if (isClickable) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        if (isPC) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseover', onMouseOver);
        }

        return () => {
            window.removeEventListener('resize', checkDevice);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
        };
    }, [isPC]);

    if (!isPC) return null;

    return (
        <motion.div
            className="custom-cursor"
            animate={{
                x: position.x - (isHovering ? 24 : 8),
                y: position.y - (isHovering ? 24 : 8),
                width: isHovering ? 48 : 16,
                height: isHovering ? 48 : 16,
                backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'var(--accent-primary)',
                border: isHovering ? '1px solid var(--accent-primary)' : 'none',
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference',
            }}
        />
    );
};

export default Cursor;
