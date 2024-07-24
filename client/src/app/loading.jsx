'use client';

import { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loadingAnim from '@animations/loader-v2.json';
import '@/app/_loading.scss';

const Loading = () => {
    const [loadingVisible, setLoadingVisible] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        //console.log('useEffect called');
        if (typeof window !== 'undefined') {
            //console.log('Initializing animation');
            const animation = lottie.loadAnimation({
                container: containerRef.current,
                animationData: loadingAnim,
                renderer: 'svg',
                loop: true,
                autoplay: true,
            });

            let progress = 0;
            let interval;

            const handlePageLoad = () => {
                //console.log('Page fully loaded');
                clearInterval(interval);
                const completeProgress = () => {
                    if (progress < 100) {
                        progress += 1;
                        setLoadingProgress(progress);
                        requestAnimationFrame(completeProgress);
                    } else {
                        setTimeout(() => setLoadingVisible(false), 500); // Delay to show 100% progress for a brief moment
                    }
                };
                requestAnimationFrame(completeProgress);
            };

            const incrementProgress = () => {
                if (progress < 95) {
                    progress += 1;
                } else if (progress < 99) {
                    progress += 0.5; // Slow down the increment as it gets closer to 100%
                }
                setLoadingProgress(progress);
            };

            interval = setInterval(incrementProgress, 10);

            window.addEventListener('load', handlePageLoad);

            // Check if the page is already loaded
            if (document.readyState === 'complete') {
                setTimeout(handlePageLoad, 300); // Smooth transition if already loaded
            }

            return () => {
                //console.log('Cleaning up animation');
                animation.destroy();
                clearInterval(interval);
                window.removeEventListener('load', handlePageLoad);
            };
        }
    }, []);

    //console.log('Rendering Loading component with progress:', loadingProgress);

    return loadingVisible ? (
        <div className="loading-wrap fx fx-jc fx-ac fx-wrap">
            <div className="loading-wrapper">
                <div className="loader-anim lt-anim-ts" ref={containerRef}></div>
                <div className="loader-txt fx fx-wrap">
                    <span>{`${Math.floor(loadingProgress)}%`}</span>
                    <div className="loader-bar" style={{ width: `${loadingProgress}%` }}></div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Loading;
