"use client"
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade, FreeMode, Thumbs } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/effect-fade'
import styles from './Gallery.module.scss'

import CustomNextButton from '@/components/(Site)/(Pages)/(Home)/CustomNextButton/CustomNextButton';
import CustomPrevButton from '@/components/(Site)/(Pages)/(Home)/CustomPrevButton/CustomPrevButton';
import Image from "next/image";

const GallerySlider = ({photos}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/gallery/`;
    const thumbPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/gallery/thumbs/`;

    const handleThumbsSwiper = (swiper) => {
        setThumbsSwiper(swiper);
    };

    return (
        <div>
            <div className="gl-slider-main">
                <Swiper
                    pagination={{
                        type: 'fraction',
                        el: '.gl-slider-main .gal-pg'
                    }}
                    effect={'fade'}
                    grabCursor={true}
                    navigation={{
                        nextEl: '.gl-slider-main .sl-next',
                        prevEl: '.gl-slider-main .sl-prev'
                    }}
                    loop={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Pagination, Navigation, Thumbs]}
                    className="gl-slider"
                >
                    {photos.map((photo, index) => (
                        <SwiperSlide key={index} className={`${styles['gal-item']}`}>
                            <div className={`${styles['gal-image']}`}>
                                <Image src={imgPath+photo.image} alt={`ipoint build gallery`} width={1000} height={560} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="gal-nav gal-man-nav fx fx-jc">
                    <CustomPrevButton/>
                    <div className="gal-pg fx fx-jc fx-ac"></div>
                    <CustomNextButton/>
                </div>
            </div>
            <div className={`${styles['gl-thumb-sl']}`}>
                <Swiper
                    onSwiper={handleThumbsSwiper}
                    spaceBetween={10}
                    breakpoints={{
                        1: {
                          slidesPerView: 3.5,
                        },
                        550: {
                          slidesPerView: 7,
                        },
                    }}
                    freeMode={true}
                    grabCursor={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="gl-thumb-sw"
                >
                    {photos.map((photo, index) => (
                        <SwiperSlide key={index} className={`${styles['gal-thumb']}`}>
                            <Image src={thumbPath+photo.thumb} alt='ipoint build gallery' width={200} height={200} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default GallerySlider;