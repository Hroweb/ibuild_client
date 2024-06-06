import {useState, useEffect, useCallback} from 'react';

const useCustomCursor = (blockCursors) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [activeBlock, setActiveBlock] = useState(null);

    const determineActiveCursor = useCallback(() => {
        let topMostBlock = null;
        for (const { id } of blockCursors) {
            const blockElement = document.getElementById(id);

            if (!blockElement) continue;

            const blockRect = blockElement.getBoundingClientRect();
            const threshold = 100;

            if (
                position.x >= blockRect.left &&
                position.x <= blockRect.right - threshold &&
                position.y >= blockRect.top &&
                position.y <= blockRect.bottom
            ) {
                topMostBlock = id;
                break;
            }
        }

        setActiveBlock(topMostBlock);
    });

    useEffect(() => {
        const handleScroll = () => {
            // Update cursor styles based on new position
            determineActiveCursor();
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [determineActiveCursor]);

    useEffect(() => {
        const updateCursorPosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            // Update cursor styles based on new position
            determineActiveCursor();
        };

        document.addEventListener('mousemove', updateCursorPosition);

        return () => {
            document.removeEventListener('mousemove', updateCursorPosition);
        };
    }, [determineActiveCursor]);

    const cursorStyle = () => {
        const activeBlockCursor = blockCursors.find((cursor) => cursor.id === activeBlock);
        return activeBlockCursor ? activeBlockCursor.cursorClass : 'default-cursor';
    };

    return { position, cursorStyle };
};

export default useCustomCursor;