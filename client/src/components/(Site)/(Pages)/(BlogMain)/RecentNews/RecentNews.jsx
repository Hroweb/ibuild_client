"use client"
import { ArrNewsLeft, ArrNewsRight } from '@/components/svgs';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import RecentNewsSlide from './RecentNewsSlide';
import RecentNewsPosts from '@/context/RecentNewsPosts';
import styles from './RecentNews.module.scss';
import {getRecentNews} from "@/hooks/helpers";


const RecentNews = ({ title, posts }) => {
    const recent = posts && posts.length > 0 ? getRecentNews(3, posts, false) : [];
    return (
        <section className={`pg-section ${styles['rc-news']} bg-light`}>
            <div className="container">
                <div className="fx fx-jb fx-ac">
                    <div className={`${styles['rc-info-lcol']}`}>
                        <h2>{ title }</h2>
                    </div>
                    <div className={`${styles['rc-info-rcol']} rc-info-rcol`}>
                        <div className="fx">
                            <div className="rc-sl-nav nw-sl-prev fx fx-ac fx-jc">
                                <ArrNewsLeft/>
                            </div>
                            <div className="rc-sl-nav nw-sl-next fx fx-ac fx-jc">
                                <ArrNewsRight/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles['rc-slider']}`}>
                    <Swiper
                        pagination={{
                            type: 'progressbar',
                        }}
                        navigation={{
                            nextEl: '.nw-sl-next',
                            prevEl: '.nw-sl-prev'
                        }}
                        modules={[Pagination,Navigation]}
                        effect={'fade'}
                        grabCursor={true}
                        slidesPerView={1}
                        loop={true}
                    >
                        {
                            Array.isArray(recent) && recent.length > 0 ? (
                                recent.map((news, index) => (
                                    <SwiperSlide key={index}>
                                        <RecentNewsSlide post={news} />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p>No posts were found</p>
                            )
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default RecentNews;