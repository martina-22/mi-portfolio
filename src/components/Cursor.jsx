import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateCursor = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handlePointerUp = (e) => {
            // Only hide if it was a touch event
            if (e.pointerType === 'touch') {
                setIsVisible(false);
            }
        };

        // Pointer Events work for both mouse and touch, and tell us the type
        window.addEventListener("pointermove", updateCursor);
        window.addEventListener("pointerdown", updateCursor);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", updateCursor);
            window.removeEventListener("pointerdown", updateCursor);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);

    useEffect(() => {
        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, []);

    return (
        <motion.div
            className="cursor"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 1.5 : 1,
                opacity: isVisible ? 1 : 0,
                mixBlendMode: 'difference'
            }}
            transition={{
                x: { duration: 0 },
                y: { duration: 0 },
                scale: { duration: 0.2 },
                opacity: { duration: 0.15 }
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
