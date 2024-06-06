"use client"
import React, { useEffect, useRef } from 'react';
import styles from './LetsGrow.module.scss'
import GrowItem from './GrowItem'
import Button from '@/components/(Site)/Button/Button'

const LetsGrow = ({data}) => {
    const sectionRef = useRef(null);
    const title1 = data?.['cp_gr_title_1']?.['meta_value'] ?? null;
    const title2 = data?.['cp_gr_title_2']?.['meta_value'] ?? null;

    const GrowItems = [];
    [...Array(3)].forEach((_, index) => {
        GrowItems[index] = {
            title: data?.[`cp_grow_${index + 1}_title`]?.['meta_value'] || '',
            desc: data?.[`cp_grow_${index + 1}_text`]?.['meta_value'] || '',
            src: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/about-us/${data?.[`box${index + 1}_icon`]?.['meta_value']}` || ''
        };
    });

    useEffect(() => {
        const section = sectionRef.current;

        if (section) {
            const handleScroll = () => {
                const sectionRect = section.getBoundingClientRect();
                if (sectionRect.top < window.innerHeight && sectionRect.bottom >= 0) {
                    section.classList.add(styles['lg-anim-active']);
                } else {
                    section.classList.remove(styles['lg-anim-active']);
                }
            };
        
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <section ref={sectionRef} className={`pg-section pg-section-pd bg-light ${styles['motto-text']} `}>
            <div className={`${styles['lg-anim']}`}>
                <div className={`${styles['lg-anim-row-1']}`}>
                    <h6>{title1}</h6>
                </div>
                <div className={`${styles['lg-anim-row-2']}`}>
                    <h6>{title2}</h6>
                </div>
            </div>
            <div className={`${styles['lg-wrap']}`}>
                <div className="container">
                    <div className="fx fx-jb fx-wrap">
                        {
                            Array.isArray(GrowItems) && GrowItems.length > 0 ? (
                                GrowItems.map((grow, index) => (
                                        <GrowItem
                                            key={index}
                                            src={grow.src}
                                            alt={grow.title}
                                            width={grow.width ?? 98}
                                            height={grow.height ?? 100}
                                            title={grow.title}
                                            desc={grow.desc}
                                        />
                                ))
                            ) : (
                                <p>No items were found</p>
                            )
                        }
                    </div>
                    <div className={`${styles['btn-row']} fx fx-jc`}>
                        <Button 
                            classList="btn-primary btn-primary-dk fx fx-ac fx-jc"
                            link="/contact-us"
                            buttonText={data?.['grow_btn']?.['meta_value'] ?? `Let’s work together`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LetsGrow;