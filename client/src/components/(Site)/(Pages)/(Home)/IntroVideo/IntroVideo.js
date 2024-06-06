import st from './IntroVideo.module.scss'
import CustomVideo from "@/components/(Site)/(Pages)/(Home)/CustomVideo/CustomVideo"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const IntroVideo = ({data}) => {
    const webM = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/home/${data?.['video']?.['meta_value']}`
    const poster = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/home/${data?.['poster']?.['meta_value']}`
    return(
        <section className={`pg-section ${st['hp-video']}`}>
            <div className="intro-video">
                <CustomVideo
                    src="/video/stands-intro-video-qm.mp4"
                    srcWebM={webM}
                    posterSrc={poster}
                />
            </div>
        </section>
    );
};

export default IntroVideo;