import React, { useEffect, useRef, useState } from 'react';
import styles from '@/components/(Site)/(Pages)/LoadMore/LoadMore.module.scss';

function LoadingAnimFull() {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized && typeof window !== 'undefined' && containerRef.current) {
            import('lottie-web')
                .then((lottie) => {
                    import('@animations/build-loader-anim-full.json')
                        .then((loaderAnim) => {
                            const animation = lottie.default.loadAnimation({
                                container: containerRef.current,
                                animationData: loaderAnim.default,
                                renderer: 'svg',
                                loop: true,
                                autoplay: false,
                            });

                            animation.play();
                            animationRef.current = animation;
                            setIsInitialized(true);

                            return () => {
                                animation.destroy();
                                animationRef.current = null;
                            };
                        })
                        .catch((error) => {
                            console.error('Failed to load animation data:', error);
                        });
                })
                .catch((error) => {
                    console.error('Failed to load Lottie:', error);
                });
        }
    }, [isInitialized]);

    return <div className={`${styles['loader-anim-f']}`} ref={containerRef}></div>;
}

export default LoadingAnimFull;