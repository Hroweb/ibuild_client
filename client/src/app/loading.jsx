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
        const animation = lottie.loadAnimation({
            container: containerRef.current,
            animationData: loadingAnim,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        let progress = 0;

        const interval = setInterval(() => {
            setLoadingProgress(progress);
            progress += 1;
            if (progress > 100) {
                clearInterval(interval);
                setLoadingVisible(false);
            }
        }, 50);

        return () => {
            animation.destroy();
            clearInterval(interval);
        };
    }, []);

    return loadingVisible ? (
        <div className="loading-wrap fx fx-jc fx-ac fx-wrap">
            <div className="loading-wrapper">
                <div className="loader-anim lt-anim-ts" ref={containerRef}></div>
                <div className="loader-txt fx fx-wrap">
                    <span>{`${loadingProgress}%`}</span>
                    <div className="loader-bar" style={{ width: `${loadingProgress}%` }}></div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Loading;