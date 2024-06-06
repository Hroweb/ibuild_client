import React, { useEffect, useRef } from 'react';
import styles from '@/components/(Site)/(Pages)/HeroBanner/HeroBanner.module.scss';

function PortfolioBannerAnim({ pfBannerAnim }) {
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
                    animationData: pfBannerAnim,
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
    }, [pfBannerAnim]);

    return (
        <div className={`${styles['pf-banner-anim']}`} ref={containerRef}></div>
    );
}

export default PortfolioBannerAnim;
