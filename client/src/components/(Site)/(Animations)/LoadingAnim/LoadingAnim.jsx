import React, { useEffect, useRef } from 'react';
import lottie from "lottie-web";
import loaderAnim from "@animations/build-loader-anim.json";
import styles from "@/components/(Site)/(Pages)/LoadMore/LoadMore.module.scss";

function LoadingAnim() {
    const containerRef = useRef(null);

    useEffect(() => {
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
    }, []);

    return (
        <div className={`${styles['loader-anim']}`} ref={containerRef}></div>
    );
}

export default LoadingAnim;