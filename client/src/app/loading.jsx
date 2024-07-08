'use client';

import { useState, useEffect, useRef } from 'react';
import loadingAnim from '@animations/loader-v2.json';
import '@/app/_loading.scss';

const Loading = () => {
    const [loadingVisible, setLoadingVisible] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const containerRef = useRef(null);
    const animationInstance = useRef(null);

    useEffect(() => {
        let totalResources = 0;
        let loadedResources = 0;
        let incrementProgressInterval;

        const updateProgress = () => {
            const progress = Math.min((loadedResources / totalResources) * 100, 100);
            setLoadingProgress(progress);
            if (progress === 100) {
                setTimeout(() => setLoadingVisible(false), 500); // Delay to show 100% progress for a brief moment
            }
        };

        const handleResourceLoad = () => {
            loadedResources += 1;
            updateProgress();
        };

        const loadLottie = async () => {
            const lottie = (await import('lottie-web')).default;

            if (!animationInstance.current) {
                animationInstance.current = lottie.loadAnimation({
                    container: containerRef.current,
                    animationData: loadingAnim,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                });
            }

            const resources = document.querySelectorAll('img, video, iframe, script, link[rel="stylesheet"]:not([href*="/admin/"])');
            totalResources = resources.length;

            if (totalResources === 0) {
                setLoadingProgress(100);
                setTimeout(() => setLoadingVisible(false), 500); // Delay to show 100% progress for a brief moment
                return;
            }

            resources.forEach((resource) => {
                if (resource.complete) {
                    handleResourceLoad();
                } else {
                    resource.addEventListener('load', handleResourceLoad);
                    resource.addEventListener('error', handleResourceLoad);
                }
            });

            incrementProgressInterval = setInterval(() => {
                setLoadingProgress((prev) => {
                    if (prev < 99) {
                        return Math.min(prev + 0.5, 99);
                    }
                    return prev;
                });
            }, 10);

            /*window.addEventListener('load', () => {
                clearInterval(incrementProgressInterval);
                loadedResources = totalResources;
                const completeProgress = () => {
                    setLoadingProgress((prev) => {
                        if (prev < 100) {
                            return prev + 1;
                        } else {
                            setTimeout(() => setLoadingVisible(false), 500); // Delay to show 100% progress for a brief moment
                            return prev;
                        }
                    });
                };
                const interval = setInterval(completeProgress, 20);
                return () => clearInterval(interval);
            });*/

            if (document.readyState === 'complete') {
                //clearInterval(incrementProgressInterval);
                //loadedResources = totalResources;
                const completeProgress = () => {
                    setLoadingProgress((prev) => {
                        if (prev < 100) {
                            return prev + 1;
                        } else {
                            setTimeout(() => setLoadingVisible(false), 500); // Delay to show 100% progress for a brief moment
                            return prev;
                        }
                    });
                };
                const interval = setInterval(completeProgress, 20);
                return () => clearInterval(interval);
            }

            return () => {
                if (animationInstance.current) {
                    animationInstance.current.destroy();
                    animationInstance.current = null;
                }
                clearInterval(incrementProgressInterval);
                resources.forEach((resource) => {
                    resource.removeEventListener('load', handleResourceLoad);
                    resource.removeEventListener('error', handleResourceLoad);
                });
            };
        };

        loadLottie();

    }, []);

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
