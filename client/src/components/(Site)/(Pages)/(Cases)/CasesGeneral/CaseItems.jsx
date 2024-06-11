import styles from './CasesByYear.module.scss';
import styles2 from './FeaturedCase.module.scss';
import Project from "@/components/(Site)/(Pages)/(Home)/Projects/Project";
import { useState } from 'react';
import LoadMore from "@/components/(Site)/(Pages)/LoadMore/LoadMore";

const CaseItems = ({ title, cases, perPage }) => {
    const [visiblePosts, setVisiblePosts] = useState(perPage);

    const loadMorePosts = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + perPage);
    };

    return (
        <div className={`${styles['cs-group']}`}>
            <div className={`fx fx-jb`}>
                <div className={`${styles2['cs-lcol']} ${styles2['cs-lcol-f']}`}>
                    <h2>{title}</h2>
                </div>
            </div>
            <div className={`${styles['cs-posts']} fx fx-jb`}>
                <div className="fx fx-wrap">
                    {
                        Array.isArray(cases) && cases.length > 0 ? (
                            cases.slice(0, visiblePosts).map((event, index) => (
                                <Project key={index} counter={event.id} pId={event.id} project={event} />
                            ))
                        ) : (
                            <p>No posts were found</p>
                        )
                    }
                </div>
            </div>
            {visiblePosts < cases.length && (
                <LoadMore handleLoadMore={loadMorePosts} />
            )}
        </div>
    )
}

export default CaseItems