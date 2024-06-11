"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation'
import Testimonial from './Testimonial';
import styles from './Testimonials.module.scss';
import {getRandomTestimonials} from "@/context/Testimonials";
import CustomNextButton from '@/components/(Site)/(Pages)/(Home)/CustomNextButton/CustomNextButton';
import CustomPrevButton from '@/components/(Site)/(Pages)/(Home)/CustomPrevButton/CustomPrevButton';
import {useState, useEffect} from "react";

const Testimonials = ({singleTestimonial, post, list}) => {
    //console.log(post); return false;
    /*const [randomTestimonials, setRandomTestimonials] = useState([]);
    useEffect(() => {
        setRandomTestimonials(getRandomTestimonials(3));
    }, []);*/
    let testimonialHeading = '';
    if (typeof singleTestimonial !== 'undefined') {
        testimonialHeading = "client's feedback";
    }else{
        testimonialHeading = "What our clients say";
    }
    //console.log(post);
    if (singleTestimonial && post) {
        return (
            <section className={`pg-section pg-section-pd swiper-testimonials ${styles.testimonials} bg-dark`}>
                <div className="container">
                    <div className={`${styles['tst-wrap']} sc-wrap`}>
                        <h2>
                            {testimonialHeading}
                        </h2>
                        <div className={styles['tst-slider']}>
                            <div className={`${styles['tst-quote']} ${styles['tst-quote-sg']}`}></div>
                                <SwiperSlide className={`tst-item`}>
                                    <Testimonial
                                        desc={post[0].description}
                                        src={post[0].avatar}
                                        alt={post[0].name}
                                        author_name={post[0].name}
                                        author_designation={post[0].designation}
                                        logo_src={post[0].logo_src}
                                        logo_alt={post[0].logo_alt}
                                    />
                                </SwiperSlide>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
        const randomTestimonials = (list && list.success && true) ? list.data : null;
        return (
            <section className={`pg-section pg-section-pd swiper-testimonials ${styles.testimonials} bg-dark`}>
                <div className="container">
                    <div className={`${styles['tst-wrap']} sc-wrap`}>
                        <h2>
                            {testimonialHeading}
                        </h2>
                        <div className={`${styles['tst-slider']} tst-slider-cnt`}>
                            <div className={styles['tst-quote']}></div>
                            <Swiper
                                pagination={{
                                    type: 'fraction',
                                    el: '.tst-slider-cnt .tst-pg'
                                }}
                                navigation={{
                                    nextEl: '.tst-slider-cnt .sl-next',
                                    prevEl: '.tst-slider-cnt .sl-prev'
                                }}
                                modules={[Pagination, Navigation]}
                                effect={'fade'}
                                grabCursor={true}
                                slidesPerView={1}
                                loop={true}
                            >
                                {
                                    Array.isArray(randomTestimonials) && randomTestimonials.length > 0 ? (
                                        randomTestimonials.map((event, index) => (
                                            <SwiperSlide key={index} className={`tst-item`}>
                                                <Testimonial
                                                    desc={event.description}
                                                    src={event.avatar}
                                                    alt={event.name}
                                                    author_name={event.name}
                                                    author_designation={event.designation}
                                                    logo_src={event.logo_src}
                                                    logo_alt={event.logo_alt}
                                                />
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <p>No testimonials were found</p>
                                    )
                                }
                            </Swiper>
                            <div className="tst-nav fx fx-jc">
                                <CustomPrevButton/>
                                <div className="tst-pg fx fx-jc fx-ac"></div>
                                <CustomNextButton/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Testimonials;