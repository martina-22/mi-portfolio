import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    // Start disabled (hidden) by default
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const checkPointer = () => {
            // Only enable custom cursor if device has a FINE pointer (Mouse/Trackpad)
            // Touch screens are 'coarse'.
            const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
            setIsEnabled(hasFinePointer);
        };

        checkPointer();
        window.addEventListener('resize', checkPointer);
        return () => window.removeEventListener('resize', checkPointer);
    }, []);

    useEffect(() => {
        if (!isEnabled) return;

        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, [isEnabled]);

    useEffect(() => {
        if (!isEnabled) return;

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, [isEnabled]);

    // If not enabled (meaning we didn't confirm a mouse), return null
    if (!isEnabled) return null;

    return (
        <motion.div
            className="cursor"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 1.5 : 1,
                mixBlendMode: 'difference'
            }}
            transition={{
                x: { duration: 0 },
                y: { duration: 0 },
                scale: { duration: 0.2 }
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'white',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference'
            }}
        />
    );
};

export default Cursor;
