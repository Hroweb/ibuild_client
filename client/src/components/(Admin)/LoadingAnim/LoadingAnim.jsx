'use client'
import React, { useEffect, useRef } from 'react';
import loaderAnim from '@animations/build-loader-anim-full.json';
import styles from '@/components/(Admin)/RightBar/RightBar.module.scss';

const LoadingAnim = () => {
    const containerRef = useRef(null);
    const animationInstance = useRef(null);

    useEffect(() => {
        // Dynamic import of lottie-web to ensure it runs only on the client side
        const loadLottie = async () => {
            const lottie = (await import('lottie-web')).default;

            // Ensure only one instance of the animation
            if (!animationInstance.current) {
                animationInstance.current = lottie.loadAnimation({
                    container: containerRef.current,
                    animationData: loaderAnim,
                    renderer: 'svg',
                    loop: true,
                    autoplay: false,
                });

                animationInstance.current.play();
            }
        };

        loadLottie().then(r => '');

        // Cleanup function to destroy the animation
        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
                animationInstance.current = null;
            }
        };
    }, []);

    return (
        <div className={styles['loader-anim']} ref={containerRef}></div>
    );
}

export default LoadingAnim;