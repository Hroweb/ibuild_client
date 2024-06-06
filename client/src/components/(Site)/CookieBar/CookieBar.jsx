"use client"
import { useState, useEffect } from 'react';
import styles from './CookieBar.module.scss'
import Link from "next/link"
import {CookieIcon, CookieX} from '@/components/svgs/index'

const CookieBar = ({text}) => {
    const [isVisible, setIsVisible] = useState(false); // Start with the bar hidden
    const [closedByUser, setClosedByUser] = useState(false); // Indicates if user closed the popup
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true); // Set the flag to true after the component mounts
    }, []);

    useEffect(() => {
        if (hasMounted) {
            const hasAcceptedCookies = localStorage.getItem('acceptedCookies');
            setIsVisible(!hasAcceptedCookies && !closedByUser); // Show the bar unless accepted or manually closed
        }
    }, [hasMounted, closedByUser]);

    const acceptCookies = () => {
        localStorage.setItem('acceptedCookies', 'true');
        setIsVisible(false);
    };

    const closeCookieBar = () => {
        setIsVisible(false);
        setClosedByUser(true);
    };

    return (
        <>
            {hasMounted && isVisible ? (
                <div className={`${styles['cookie-bar']} ${isVisible ? styles['visible'] : ''}`}>
                    <div className={`${styles['cookie-bar-wrap']} fx fx-jb fx-wrap`}>
                        <div className={`${styles['ck-close']}`} onClick={closeCookieBar}>
                            <CookieX />
                        </div>
                        <div>
                            <CookieIcon />
                        </div>
                        <p>{text}</p>
                        <div className={`${styles['cookie-btns']} fx fx-jb`}>
                            <Link href="/cookie-policy" className="fx fx-ac fx-jc">Learn More</Link>
                            <button className="fx fx-ac fx-jc" onClick={acceptCookies}>Accept Cookies</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`${styles['cookie-bar']} ${!isVisible ? styles['hidden'] : ''}`}>
                    <div className={`${styles['cookie-bar-wrap']} fx fx-jb fx-wrap`}>
                        <div className={`${styles['ck-close']}`} onClick={closeCookieBar}>
                            <CookieX />
                        </div>
                        <div>
                            <CookieIcon />
                        </div>
                        <p>{text}</p>
                        <div className={`${styles['cookie-btns']} fx fx-jb`}>
                            <Link href="/cookie-policy" className="fx fx-ac fx-jc">Learn More</Link>
                            <button className="fx fx-ac fx-jc" onClick={acceptCookies}>Accept Cookies</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CookieBar;