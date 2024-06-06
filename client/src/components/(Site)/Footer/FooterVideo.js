"use client"
import React, { useRef, useEffect, useState } from "react";

const Video = ({ src }) => {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const videoElement = videoRef.current;
		
		const handleIntersection = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Footer is 50% visible, start playing the video
					videoElement.play();
					setIsPlaying(true);
				} else {
				// Footer is not visible, pause the video
					videoElement.pause();
					setIsPlaying(false);
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersection, {
			root: null, 
			rootMargin: "0px",
			threshold: 0.6,
		});

		observer.observe(videoElement);

		// Cleanup the observer when the component unmounts
		return () => {
			observer.unobserve(videoElement);
		};
  	}, [src]);
    return (
        <video
			ref={videoRef}
          	playsInline
          	autoPlay={isPlaying}
          	muted
			preload="auto"
          	width="100%"
        >
          <source src={src} type="video/mp4" />
        </video>
    );
};

export default Video;