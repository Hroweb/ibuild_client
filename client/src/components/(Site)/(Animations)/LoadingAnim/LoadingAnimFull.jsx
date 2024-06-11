import React, { useEffect, useRef } from 'react';
import styles from '@/components/(Site)/(Pages)/LoadMore/LoadMore.module.scss';
import loaderAnim from '@animations/build-loader-anim-full.json';

function LoadingAnimFull() {
    const containerRef = useRef(null);
    const animationInstance = useRef(null);

    useEffect(() => {
        const loadLottie = async () => {
            const lottie = (await import('lottie-web')).default;

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

        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
                animationInstance.current = null;
            }
        };
    }, []);

    return (
        <div className={`${styles['loader-anim-f']}`} ref={containerRef}></div>
    );
}

export default LoadingAnimFull;
