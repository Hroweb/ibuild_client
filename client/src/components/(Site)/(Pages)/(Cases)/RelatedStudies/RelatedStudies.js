import styles from './RelatedStudies.module.scss'
//import { getLastCases } from '@/context/Cases'
import Link from "next/link"
import Project from "@/components/(Site)/(Pages)/(Home)/Projects/Project";
import {useEffect, useState} from "react";

const RelatedStudies = ({title, excludeID = false, additionalClass, related}) => {
    //const relatedCases = getLastCases(3, excludeID);
    const [cases, setCases] = useState([]);

    /*useEffect(() => {
        // Fetch your data here and set it
        const relatedCases = getLastCases(3, excludeID);
        setCases(relatedCases);
    }, [excludeID]);*/
    return (
        <section className={`pg-section pg-section-pd bg-light ${additionalClass ? additionalClass : ''}`}>
            <div className="container">
                <div className={`${styles['relCase-wrap']}`}>
                    <h3 className={`${additionalClass ? additionalClass : ''}`}>{title}</h3>
                    <div className={`${styles['relCase-wrapper']} fx fx-jb fx-wrap`}>
                        {
                            Array.isArray(related) && related.length > 0 ? (
                                related.map((post, index) => (
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
            </div>
        </section>
    )
}

export default RelatedStudies