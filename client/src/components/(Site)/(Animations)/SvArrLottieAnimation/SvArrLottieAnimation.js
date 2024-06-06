import React, { useEffect, useRef } from 'react';

const SvArrLottieAnimation = ({ animationData, containerId, rowId }) => {
  const containerRef = useRef(null);
  const animationInstance = useRef(null);

  useEffect(() => {
    const loadLottie = async () => {
      const lottie = (await import('lottie-web')).default;

      if (!animationInstance.current) {
        const container = document.createElement('div');
        container.className = 'sv-anim-arr';
        containerRef.current = container;

        animationInstance.current = lottie.loadAnimation({
          container,
          animationData,
          renderer: 'svg',
          loop: false,
          autoplay: false,
        });

        const playAnimation = () => animationInstance.current.play();
        const pauseAnimation = () => animationInstance.current.stop();

        const parentContainer = document.getElementById(containerId);
        const rowContainer = document.getElementById(rowId);

        if (parentContainer) {
          parentContainer.appendChild(container);
          rowContainer.addEventListener('mouseenter', playAnimation);
          rowContainer.addEventListener('mouseleave', pauseAnimation);
        }

        return () => {
          if (parentContainer) {
            parentContainer.removeChild(container);
            rowContainer.removeEventListener('mouseenter', playAnimation);
            rowContainer.removeEventListener('mouseleave', pauseAnimation);
          }
        };
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
  }, [animationData, containerId, rowId]);

  return null;
};

export default SvArrLottieAnimation;