const ButtonVideo = ({ src }) => {
    return (
        <div>
            <video autoPlay playsInline loop muted width="100%" preload="auto">
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
};

export default ButtonVideo;