"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import styles from './BlogSingle.module.scss'
import NewsItem from '@/components/(Site)/(Pages)/(BlogMain)/TopNews/NewsItem';

const SingleRecentNews = ({ title, posts }) => {
    return (
        <div className={`${styles['blog-rc-wrap']} bg-white`}>
            <div className="container">
                <h2> { title }</h2>
            </div>
            <div className={`${styles['blog-rc-wrapper']}`}>
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
                        Array.isArray(posts) && posts.length > 0 ? (
                            posts.map((post, index) => (
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
        </div>
    );
}

export default SingleRecentNews;