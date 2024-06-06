"use client"
import React, { useState, useEffect, useRef } from 'react';
import st from './HeroBannerNumbers.module.scss';

const HeroBannerNumbers = ({data}) => {
    const [projectCount, setProjectCount] = useState(0);
    const [experienceCount, setExperienceCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);

    const projectRef = useRef(0);
    const experienceRef = useRef(0);
    const clientRef = useRef(0);

    useEffect(() => {
        const animateNumbers = () => {
        if (projectRef.current < data?.['projects_finished']?.['meta_value']) {
            projectRef.current += 1;
            setProjectCount(projectRef.current);
        }
        if (experienceRef.current < data?.['years_of_experience']?.['meta_value']) {
            experienceRef.current += 1;
            setExperienceCount(experienceRef.current);
        }
        if (clientRef.current < data?.['clients_worldwide']?.['meta_value']) {
            clientRef.current += 1; 
            setClientCount(clientRef.current);
        }

        requestAnimationFrame(animateNumbers);
    };

        animateNumbers();
    }, []);

    return (
        <div className="hb-num-row fx fx-ac fx-jb">
            <div className={st['hb-num-col']}>
                <div className="hb-num-col-wrap fx">
                    <div className={st['hb-num-lcol']}>
                        <div className={`${st['hb-num']} fx fx-wrap`}>
                            <span>+</span>
                            <span>{projectCount}</span>
                        </div>
                        <span className={st['num-txt']}>Projects Finished</span>
                    </div>
                </div>
            </div>
            <div className={st['hb-num-col']}>
                <div className="hb-num-col-wrap fx">
                    <div className={st['hb-num-lcol']}>
                        <div className={`${st['hb-num']} fx fx-wrap`}>
                            <span>+</span>
                            <span>{experienceCount}</span>
                        </div>
                        <span className={st['num-txt']}>Years of Experience</span>
                    </div>
                </div>
            </div>
            <div className={st['hb-num-col']}>
                <div className="hb-num-col-wrap fx">
                    <div className={st['hb-num-lcol']}>
                        <div className={`${st['hb-num']} fx fx-wrap`}>
                            <span>+</span>
                            <span>{clientCount}</span>
                        </div>
                        <span className={st['num-txt']}>Clients Worldwide</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBannerNumbers;