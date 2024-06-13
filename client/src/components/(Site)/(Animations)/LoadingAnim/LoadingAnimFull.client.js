'use client';
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loaderAnim from '@animations/build-loader-anim-full.json';
import styles from '@/components/(Site)/(Pages)/LoadMore/LoadMore.module.scss';

function LoadingAnimFull() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && containerRef.current) {
            const animation = lottie.loadAnimation({
                container: containerRef.current,
                animationData: loaderAnim,
                renderer: 'svg',
                loop: true,
                autoplay: false,
            });

            animation.play();

            return () => {
                animation.destroy();
            };
        }
    }, []);

    return <div className={`${styles['loader-anim-f']}`} ref={containerRef}></div>;
}

export default LoadingAnimFull;