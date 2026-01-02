import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let lastTouchTime = 0;

        const mouseMove = (e) => {
            // If touch event happened recently (within 1s), ignore mouse movement
            // This prevents mobile browsers from triggering the cursor with emulated mouse events
            if (Date.now() - lastTouchTime < 1000) return;

            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
            setIsVisible(true);
        };

        const touchStart = (e) => {
            lastTouchTime = Date.now();
            const touch = e.touches[0];
            setMousePosition({
                x: touch.clientX,
                y: touch.clientY
            });
            setIsVisible(true);
        };

        const touchMove = (e) => {
            lastTouchTime = Date.now();
            const touch = e.touches[0];
            setMousePosition({
                x: touch.clientX,
                y: touch.clientY
            });
        };

        const touchEnd = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("touchstart", touchStart);
        window.addEventListener("touchmove", touchMove);
        window.addEventListener("touchend", touchEnd);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("touchstart", touchStart);
            window.removeEventListener("touchmove", touchMove);
            window.removeEventListener("touchend", touchEnd);
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
                opacity: { duration: 0.2 }
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
