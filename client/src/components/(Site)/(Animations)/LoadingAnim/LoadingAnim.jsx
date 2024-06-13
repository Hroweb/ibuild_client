import React, { useEffect, useRef, useState } from 'react';
import styles from '@/components/(Site)/(Pages)/LoadMore/LoadMore.module.scss';

function LoadingAnim() {
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        console.log('useEffect triggered');
        let animation = null;

        const loadAnimation = async () => {
            try {
                const [lottie, loaderAnim] = await Promise.all([
                    import('lottie-web'),
                    import('@animations/build-loader-anim.json')
                ]);

                animation = lottie.default.loadAnimation({
                    container: containerRef.current,
                    animationData: loaderAnim.default,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                });

                animationRef.current = animation;
            } catch (error) {
                console.error('Failed to load animation:', error);
            }
        };

        if (typeof window !== 'undefined') {
            loadAnimation();
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.destroy();
                animationRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    return <div className={styles['loader-anim']} ref={containerRef}></div>;
}

export default LoadingAnim;