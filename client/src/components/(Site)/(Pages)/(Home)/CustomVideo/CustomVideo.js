"use client"
import st from '@/components/(Site)/(Pages)/(Home)/IntroVideo/IntroVideo.module.scss'
import useCursorTracker from "@/hooks/TrackCursor"
import CursorAnimation from "@/components/(Site)/(Animations)/CursorAnimation/CursorAnimation"

const CustomVideo = ({ src, srcWebM, posterSrc }) => {
    const {
        cursorX,
        cursorY,
        isHovered,
        handleMouseEnter,
        handleMouseLeave,
        isMuted,
        handleVideoClick,
    } = useCursorTracker(true);
  
    return (
        <div 
            className={st['custom-video']}
            onClick={handleVideoClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video 
                preload="auto" 
                autoPlay
                playsInline 
                loop 
                muted={isMuted}
                width="100%"
                height="100%"
                poster={posterSrc}
            >
                <source src={srcWebM} type="video/webm" />
                <source src={src} type="video/mp4" />
            </video>
            <CursorAnimation
                cursorClass={`ct-intro-cursor`}
                cursorX={cursorX}
                cursorY={cursorY}
                isHovered={isHovered}
                cursorText={`Music ${isMuted ? 'On' : 'Off'}`}
                styles={st}
            />
        </div>
    );
};

export default CustomVideo;