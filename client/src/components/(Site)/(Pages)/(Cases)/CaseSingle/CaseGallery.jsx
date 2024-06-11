"use client"
import styles from "./CaseSingle.module.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import Image from "next/image";

const CaseGallery = ({gallery, additionalClass}) => {
    const galW = 500;
    const galH = 382;
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio`;
    return (
        <div className={`bg-white ${additionalClass ? additionalClass : ''}`}>
            <div className={`${styles['case-gal']} fx`}>
                <Swiper
                    effect={"slide"}
                    grabCursor={true}
                    spaceBetween={20}
                    slidesPerView={"auto"}
                    loop={true}
                >
                    {
                        gallery.map((gal, index) => (
                            <SwiperSlide className={styles['gal-item']} key={index}>
                                <div className={styles['gal-thumb']}>
                                    <Image src={`${imgPath}${gal.src}`} alt={gal.alt} width={galW} height={galH} />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default CaseGallery;