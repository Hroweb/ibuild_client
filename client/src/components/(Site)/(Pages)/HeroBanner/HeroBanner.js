"use client"
import React, { useState } from 'react';
import styles from './HeroBanner.module.scss';
import Image from "next/image";
import { PlayIcon, CloseIcon } from '@/components/svgs';
import ButtonVideo from "@/components/(Site)/(Pages)/(About)/ButtonVideo/ButtonVideo";
import PortfolioBannerAnim from "@/components/(Site)/(Animations)/PortfolioBannerAnim/PortfolioBannerAnim";

const HeroBanner = ({ themeColor, title, text, src, alt, width, height, align, additionalClass, additionalClass2, isAboutPage, data, page, animated, anim }) => {
    //console.log(data)
    const addtClass = additionalClass ? ` ${styles[additionalClass]}` : '';
    const addtClass2 = additionalClass2 ? ` ${styles[additionalClass2]}` : '';
    const [isVideoPPVisible, setVideoPPVisible] = useState(false);

    const bannerName = (page === 'portfolio') ? data?.['pf_banner_anim']?.['meta_value'] : data?.['banner']?.['meta_value'];
    const videoSrc = data?.['cp_video_link']?.['meta_value'] ?? null;
    const bannerSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${page}/${bannerName}` ?? null;

    const togglePopup = () => {
        setVideoPPVisible(!isVideoPPVisible);
    };

    const closePopup = () => {
        setVideoPPVisible(false);
    };

    return (
        <>
            <section className={`pg-section ${styles['hero-banner']} ${styles[`banner-bg-${themeColor}`]} ${addtClass} ${addtClass2}`}>
                <div className="container">
                    <div className={`fx fx-jb fx-wrap ${align}`}>
                        <div className={`${styles['bn-lcol']}`}>
                            <div className={`${styles['bn-hd']}`}>
                                <h1>{title}</h1>
                            </div>
                            {isAboutPage && (
                                <div
                                    className={`${styles['vd-btn']}`}
                                    onClick={togglePopup}
                                >
                                    <div className={`${styles['vd-btn-wrap']} fx fx-ac fx-jc fx-jb`}>
                                        <span>Play video</span>
                                        <PlayIcon />
                                    </div>
                                    <div className={`${styles['about-vd']}`}>
                                        <ButtonVideo src="/video/button-video.mp4" />
                                    </div>
                                </div>
                            )}
                            {text && <p>{text}</p>}
                        </div>
                        <div className={`${styles['bn-rcol']}`}>
                            <div className={`${styles['bn-graphic']}`}>
                                {
                                    animated ?
                                    <PortfolioBannerAnim pfBannerAnim={anim} />
                                    :
                                    <Image
                                        src={bannerSrc}
                                        alt={alt}
                                        width={width}
                                        height={height}
                                        priority // Ensures the image is loaded eagerly
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isAboutPage && (
                <div className={`${styles['vd-pp']} ${isVideoPPVisible ? styles['visible'] : styles['hidden']}`}>
                    <div
                        className={`${styles['vd-pp-overlay']}`}
                        onClick={closePopup}
                    ></div>
                    <div className="container">
                        <div className={`${styles['vd-pp-wrap']}`}>
                            <div
                                className={`${styles['vd-pp-close']} fx fx-je`}
                                onClick={closePopup}
                            >
                                <CloseIcon />
                            </div>
                            <div className={`${styles['vd-pp-wrapper']}`}>
                                {isVideoPPVisible && (
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={videoSrc}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy" // Add lazy loading
                                    ></iframe>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeroBanner;