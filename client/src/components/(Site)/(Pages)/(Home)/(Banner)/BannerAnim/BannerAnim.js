"use client";
import React, { useEffect, useRef } from 'react';

function BannerAnim({data}) {
    const containerRef = useRef(null);
    const animationInstance = useRef(null);

    useEffect(() => {
        // Dynamic import of lottie-web to ensure it runs only on the client side
        const loadLottie = async () => {
            const lottie = (await import('lottie-web')).default;

            // Ensure only one instance of the animation
            if (!animationInstance.current && undefined !== data && !data.error) {

                animationInstance.current = lottie.loadAnimation({
                    container: containerRef.current,
                    animationData: data,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                });
            }
        };

        loadLottie().then(() => '');

        // Cleanup function to destroy the animation
        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
                animationInstance.current = null;
            }
        };
    }, []);

    return (
        <div /*style={{height: 132}}*/ className="hp-anim-elem lt-anim-ts" ref={containerRef}></div>
    );
}

export default BannerAnim;