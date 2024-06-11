"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import {BtnArrUp} from '@/components/svgs';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade';
import './Projects.scss';

import CustomNextButton from '@/components/(Site)/(Pages)/(Home)/CustomNextButton/CustomNextButton';
import CustomPrevButton from '@/components/(Site)/(Pages)/(Home)/CustomPrevButton/CustomPrevButton';
import Image from "next/image";
import Link from "next/link";

const Project = ({counter, pId, addInfo, project}) => {
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio/`;
    const swiperClassName = `pj-slide-${counter}-${pId}`;
    const pj = project;

    const handleClick = (event) => {
        event.preventDefault();
    };
    if(addInfo){
        return (
            <div className="pj-slide-col">
                <div className={`pj-slide ${swiperClassName}`}>
                    <Swiper
                        pagination={{
                            type: 'fraction',
                            el: `.${swiperClassName} .gal-pg`
                        }}
                        effect={'fade'}
                        grabCursor={true}
                        navigation={{
                            nextEl: `.${swiperClassName} .sl-next`,
                            prevEl: `.${swiperClassName} .sl-prev`
                        }}
                        modules={[EffectFade, Pagination, Navigation]}
                        slidesPerView={1}
                        loop={true}
                    >
                        {

                            pj?.thumbs?.map((thumb, index) => (
                                <SwiperSlide className="pj-item" key={index}>
                                    <div className="pj-thumb">
                                        <Link href={`/portfolio/case-study/${pj?.slug}`} className="fx">
                                            <Image src={`${imgPath}${thumb.src}`} alt={thumb.alt} width={320} height={306} />
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                        <div className="pj-dsc-btn">
                            <Link href={`/portfolio/case-study/${pj?.slug}`} className="btn-dsc fx fx-ac fx-jc">
                                <span>Discover</span>
                                <div className="btn-arr fx">
                                    <BtnArrUp />
                                </div>
                            </Link>
                        </div>
                    </Swiper>
                    <div className="gal-nav fx">
                        <CustomPrevButton/>
                        <div className={`gal-pg fx fx-jc fx-ac`}></div>
                        <CustomNextButton/>
                    </div>
                </div>
                <div className="pj-info-row">
                    <h3>{pj.title}</h3>
                    <div className="cs-ft-post-cats fx fx-as fx-wrap">
                        <Link href="#" onClick={handleClick}>
                            {pj.stand_size[0].title}
                        </Link>
                        <Link href="#" onClick={handleClick}>
                            {pj.event_cat[1].title}
                        </Link>
                        <Link href="#" onClick={handleClick}>
                            {pj.event_year[0].title}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div className={`pj-slide ${swiperClassName}`}>
                <Swiper
                    pagination={{
                        type: 'fraction',
                        el: `.${swiperClassName} .gal-pg`
                    }}
                    effect={'fade'}
                    grabCursor={true}
                    navigation={{
                        nextEl: `.${swiperClassName} .sl-next`,
                        prevEl: `.${swiperClassName} .sl-prev`
                    }}
                    modules={[EffectFade, Pagination, Navigation]}
                    slidesPerView={1}
                    loop={true}
                >
                    {

                        pj?.thumbs?.map((thumb, index) => (
                            <SwiperSlide className="pj-item" key={index}>
                                <div className="pj-thumb">
                                    <Link href={`/portfolio/case-study/${pj?.slug}`} className="fx">
                                        <Image src={`${imgPath}${thumb.src}`} alt={thumb.alt} width={320} height={306} />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    <div className="pj-dsc-btn">
                        <Link href={`/portfolio/case-study/${pj?.slug}`} className="btn-dsc fx fx-ac fx-jc">
                            <span>Discover</span>
                            <div className="btn-arr fx">
                                <BtnArrUp />
                            </div>
                        </Link>
                    </div>
                </Swiper>
                <div className="gal-nav fx">
                    <CustomPrevButton/>
                    <div className={`gal-pg fx fx-jc fx-ac`}></div>
                    <CustomNextButton/>
                </div>
            </div>
        );
    }
};

export default Project;