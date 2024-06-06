"use client"
import st from './Blog.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import BlogArticle from './BlogArticle';
import {getRecentNews} from "@/context/Blog";
import Button from '@/components/(Site)/Button/Button'

const Blog = ({data, posts}) => {
    const blogNews = getRecentNews(4);
    return(
        <section className={`pg-section pg-section-pd ${st.blog} bg-light`}>
            <div className="container">
                <div className={`blog-wrap sc-wrap`}>
                    <h2>{data?.['blog_title']?.['meta_value']}</h2>
                    <div className={`sc-inner fx fx-jb`}>
                        <div className={`sc-lcol`}>
                            <div className={`sc-txt sc-txt-dk`}>
                                <p>{data?.['blog_desc']?.['meta_value']}</p>
                            </div>
                        </div>
                        <div className={`${st['section-btn']} sc-rcol`}>
                            {/* 
                                <Button 
                                    classList="btn-primary btn-primary-dk fx fx-ac fx-jc"
                                    link="/blog"
                                    buttonText="See All Articles"
                                />
                            */
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={st['blog-articles']}>
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
                                    <BlogArticle
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

export default Blog;