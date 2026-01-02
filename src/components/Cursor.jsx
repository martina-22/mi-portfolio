import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect if the device primarily uses touch
        const checkMobile = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            const hasTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            // Disable if it's strictly a coarse pointer OR if it looks like a mobile phone
            setIsMobile(isTouch || (hasTouchEvents && isMobileUA));
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Do not add listeners on mobile

        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, [isMobile]);

    // If it's a mobile device (touch), do not render the custom cursor at all
    if (isMobile) return null;

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
