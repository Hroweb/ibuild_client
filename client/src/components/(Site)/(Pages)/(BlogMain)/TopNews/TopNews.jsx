"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
//import TopNewsPosts from '@/context/TopNews';
import styles from '@/components/(Site)/(Pages)/(Home)/Blog/Blog.module.scss';
import NewsItem from './NewsItem';
import {getTopNewsArticles} from "@/hooks/helpers";

const TopNews = ({ title, posts }) => {
    const topNews = posts && posts.length > 0 ? getTopNewsArticles(3, posts) : [];
    return (
        <section className={`pg-section pg-section-pd ${styles['tp-news']} bg-light`}>
            <div className="container">
                <h2> { title }</h2>
            </div>
            <div className={`${styles['tp-news-sl-wrap']}`}>
                <Swiper
                    effect={'slide'}
                    grabCursor={true}
                    spaceBetween={20}
                    breakpoints={{
                        1: {
                            slidesPerView: 1.1,
                            spaceBetween:10
                          },
                          440: {
                              slidesPerView: 1.5,
                              spaceBetween:8
                          },
                          550: {
                            slidesPerView: 2.2,
                            spaceBetween:6
                          },
                          700: {
                              slidesPerView: 2.5,
                              spaceBetween:10
                          },
                          850: {
                              slidesPerView: 2.9,
                          },
                    }}
                    loop={true}
                >
                    {
                        Array.isArray(topNews) && topNews.length > 0 ? (
                            topNews.map((post, index) => (
                                <SwiperSlide key={index}>
                                    <NewsItem
                                        post={post}
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <p>No posts were found</p>
                        )
                    }
                </Swiper>
            </div>
        </section>
    );
}

export default TopNews;