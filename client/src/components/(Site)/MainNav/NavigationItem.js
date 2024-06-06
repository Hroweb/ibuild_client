import Link from "next/link";
import {useState} from "react";

const NavigationItem = ({ href, label, currentPath, toggleHeaderClass }) => {
    const isActive = currentPath === href;
    return (
        <li>
            <Link href={href} className={isActive ? 'active' : ''} onClick={toggleHeaderClass}>
                {label}
            </Link>
        </li>
    );
};

export default NavigationItem