"use client"
import {BtnArrUp} from '@/components/svgs';
import { useState } from 'react';
import Link from 'next/link'

const Button = ({classList, link, buttonText, toggleQuotePPClass}) => {
    const [isHovered, setIsHovered] = useState(false);
    if (!toggleQuotePPClass) {
        return (
            <Link 
                className={`${classList} ${isHovered ? 'hovered' : ''}`}
                href={link}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
            >
                <span>{buttonText}</span>
                <div className="btn-arr">
                    <BtnArrUp />
                </div>
            </Link>
        );
    }else{
        return (
            <Link 
                className={`${classList} ${isHovered ? 'hovered' : ''}`}
                href={link}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                onClick={toggleQuotePPClass}
            >
                <span>{buttonText}</span>
                <div className="btn-arr fx">
                    <BtnArrUp />
                </div>
            </Link>
        );
    }
}

export default Button;