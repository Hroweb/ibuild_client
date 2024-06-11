'use client';
import styles from "./LatestCases.module.scss";
//import {getLastCases, getServicesFeaturedCases} from '@/context/Cases';
import Project from "@/components/(Site)/(Pages)/(Home)/Projects/Project";
import Button from '@/components/(Site)/Button/Button';
import {useEffect, useState} from "react";

const LatestCases = ({data, cases}) => {
    const [relatedCases, setRelatedCases] = useState([]);
    const title = data?.['ft_cases_title']?.['meta_value'] ?? '';
    const btnTxt = data?.['ft_cases_btn_text']?.['meta_value'] ?? 'See all projects';

    useEffect(() => {
        // Fetch your data here and set it
        setRelatedCases(cases.data);
    }, [cases]);

    return (
        <section className={`pg-section pg-section-pd ${styles['highlighted-projects']} bg-light`}>
            <div className="container">
                <div className={`${styles['lt-cs-wrap']} fx fx-jb fx-wrap`}>
                    <div className={`${styles['lt-cs-lcol']}`}>
                        <h2>{title}</h2>
                    </div>
                    <div className={`${styles['lt-cs-rcol']}`}>
                        <Button 
                            classList="btn-primary btn-primary-dk fx fx-ac fx-jc"
                            link="/portfolio"
                            buttonText={btnTxt}
                        />
                    </div>
                </div>
                <div className={`${styles['lt-cs-list']} fx fx-wrap`}>
                    {
                        Array.isArray(relatedCases) && relatedCases.length > 0 ? (
                            relatedCases.map((post, index) => (
                                <Project 
                                    counter={index + 1}
                                    key={index}
                                    pId={post.id}
                                    addInfo="Yes"
                                    project={post}
                                />
                            ))
                        ) : (
                            <p>No posts were found</p>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestCases;