'use client'
import useCustomCursor from "@/hooks/UseCustomCursor";
import st from './ServiceCursor.module.scss';

const ServiceCursor = () => {
    const blockCursors = [
        { id: 'sv-item-1', cursorClass: 'cursor-style-1' },
        { id: 'sv-item-2', cursorClass: 'cursor-style-2' },
        { id: 'sv-item-3', cursorClass: 'cursor-style-3' },
        { id: 'sv-item-4', cursorClass: 'cursor-style-4' },
        { id: 'sv-item-5', cursorClass: 'cursor-style-5' },
        { id: 'sv-item-6', cursorClass: 'cursor-style-6' },
        { id: 'sv-item-7', cursorClass: 'cursor-style-7' }
    ];

    const { position, cursorStyle } = useCustomCursor(blockCursors);

    return (
        <div
            className={`${st['custom-cursor']} ${st[cursorStyle()]}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'fixed',
            }}
        ></div>
    );
}

export default ServiceCursor