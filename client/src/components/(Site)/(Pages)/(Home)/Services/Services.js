'use client'
import React, { useContext } from 'react';
import ServiceItem from './ServiceItem';
import ServiceCursor from "@/components/(Site)/(Pages)/(Home)/Services/ServiceCursor";
import svArrowAnim from "@animations/sv-arrow-anim.json";
import st from './Services.module.scss';
//import {servicesList} from '@/context/Services';
import Button from '@/components/(Site)/Button/Button';

import { QuoteModalContext } from '@/providers/QuoteModalContext'

const Services = ({themeColor, isGeneral, title, text, data, servicesList}) => {
    const { isQuotePPVisible, toggleQuotePPClass } = useContext(QuoteModalContext);
    if(isGeneral){
        return (
            <section className={`pg-section pg-section-pd services ${st.services} ${st[`service-list`]} ${st[`bg-${themeColor}`]} bg-light`}>
                <div className="container">
                    <div className={`${st['sv-wrap']} sc-wrap`}>
                        <h2>{title}</h2>
                    </div>
                    <div className={st['sv-items-gn']}>
                        <ServiceCursor />
                        {Array.isArray(servicesList) && servicesList.length > 0 ? (
                            servicesList.map((event, index) => (
                                <ServiceItem
                                    key={index}
                                    title={event.title}
                                    description={event.description}
                                    animationData={svArrowAnim}
                                    isGeneral="Yes"
                                    subtitle={event.subtitle}
                                    fulltext={event.fulltext}
                                    containerId={event.id}
                                />
                            ))
                        ) : (
                            <p>No services available</p>
                        )}
                    </div>
                    <div className={`${st['sv-btn-row']} fx fx-jc`}>
                        <Button 
                            classList={`btn-primary btn-primary-red fx fx-ac fx-jc ${isQuotePPVisible ? 'hid' : 'vis'}`}
                            link="#"
                            toggleQuotePPClass={toggleQuotePPClass}
                            buttonText="Get a Quote"
                        />
                    </div>
                </div>
            </section>
        );
    }else{
        return (
            <section className={`pg-section pg-section-pd services ${st.services} ${st[`bg-${themeColor}`]} bg-dark`}>
                <div className="container">
                    <div className={`${st['sv-wrap']} sc-wrap`}>
                        <h2>{data?.['services_title']?.['meta_value']}</h2>
                        <div className={`sc-inner fx fx-jb`}>
                            <div className={`sc-lcol`}>
                                <div className={`${st['sc-txt-sv']} sc-txt`}>
                                    <p>{data?.['services_desc']?.['meta_value']}</p>
                                </div>
                            </div>
                            <div className={`${st['service-btn']} sc-rcol`}>
                                <Button 
                                    classList="btn-primary btn-primary-wh sv-action-btn fx fx-ac fx-jc"
                                    link="/services"
                                    buttonText={data?.['services_btn']?.['meta_value']}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={st['sv-items']}>
                        <ServiceCursor />
                        {Array.isArray(servicesList) && servicesList.length > 0 ? (
                            servicesList.map((event, index) => (
                                <ServiceItem
                                    key={index}  // Don't forget to add a unique key for each item in the array
                                    title={event.title}  // Assuming 'title' and other properties come from the 'event' object
                                    description={event.description}
                                    animationData={svArrowAnim}
                                    containerId={event.id}
                                />
                            ))
                        ) : (
                            // Handle the case where servicesList is not iterable (e.g., it's null or undefined)
                            <p>No services available</p>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

export default Services;
