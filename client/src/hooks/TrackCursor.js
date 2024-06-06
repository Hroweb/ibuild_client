import { useState, useEffect } from 'react';

const useCursorTracker = (isVideo) => {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        setIsMuted((prevMuted) => !prevMuted);
    };

    const handleVideoClick = () => {
        toggleMute();
    };

    const [cursorX, setCursorX] = useState(-1000);
    const [cursorY, setCursorY] = useState(-1000);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const updateCursorPosition = (e) => {
        if (isHovered) {
            const rect = e.target.getBoundingClientRect();
            setCursorX(e.clientX - rect.left);
            setCursorY(e.clientY - rect.top);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', updateCursorPosition);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
        };
    }, [isHovered, updateCursorPosition]);

    // Conditionally include isMuted and handleVideoClick in the return object
    const videoFunctions = isVideo ? { isMuted, handleVideoClick } : {};

    return { cursorX, cursorY, isHovered, handleMouseEnter, handleMouseLeave, ...videoFunctions };
}

export default useCursorTracker;
