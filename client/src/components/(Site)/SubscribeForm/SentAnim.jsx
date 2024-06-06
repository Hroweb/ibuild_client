import React, { useEffect, useRef } from 'react';
import sentBtnAnim from '@animations/send-btn-anim-v7.json';
import styles from './SubscribeForm.module.scss';

const SentAnim = ({ formSubmitted }) => {
  const containerRef = useRef(null);
  const animationInstance = useRef(null);

  useEffect(() => {
    const loadLottie = async () => {
      const lottie = (await import('lottie-web')).default;

      if (formSubmitted && !animationInstance.current) {
        animationInstance.current = lottie.loadAnimation({
          container: containerRef.current,
          animationData: sentBtnAnim,
          renderer: 'svg',
          loop: false,
          autoplay: true,
        });

        animationInstance.current.play();
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
  }, [formSubmitted]);

  return (
      <div className={`${styles['sentFormAnim']} ${formSubmitted ? styles.visible : styles.hidden}`} ref={containerRef}></div>
  );
};

export default SentAnim;