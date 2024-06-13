import styles from './CasesByYear.module.scss';
import styles2 from './FeaturedCase.module.scss';
import Project from "@/components/(Site)/(Pages)/(Home)/Projects/Project";
import { useState } from 'react';
import LoadMore from "@/components/(Site)/(Pages)/LoadMore/LoadMore";

const CasesByYear = ({ cases, perPage }) => {
    const [loadMoreCounts, setLoadMoreCounts] = useState({});
    const [loading, setLoading] = useState(false);
    const handleLoadMore = (year) => {
        setLoading(true);
        setTimeout(() => {
            setLoadMoreCounts((prevCounts) => ({
                ...prevCounts,
                [year]: (prevCounts[year] || 0) + perPage,
            }));
            setLoading(false);
        }, 100);
    };

    return (
        Array.isArray(cases) && cases.length > 0 ? (
            cases.map((yearData, index) => {
                const year = yearData.title;
                const yearLoadMoreCount = loadMoreCounts[year] || 0;
                const yearVisibleData = yearData.events.slice(0, yearLoadMoreCount + perPage);

                return (
                    <div key={index} className={`${styles['cs-group']}`}>
                        <div className={`fx fx-jb fx-wrap`}>
                            <div className={`${styles2['cs-lcol']}`}>
                                <h2>{year} Stands</h2>
                            </div>
                            <div className={`${styles2['cs-rcol']}`}>
                                <p>{yearData.desc}</p>
                            </div>
                        </div>
                        <div className={`${styles['cs-posts']} fx fx-jb`}>
                            <div className="fx fx-wrap">
                                {yearVisibleData.map((post, ind) => (
                                    <Project counter={post.id} key={post.id} pId={post.id} project={post} />
                                ))}
                            </div>
                        </div>
                        {yearVisibleData.length < yearData.events.length && (
                            <LoadMore handleLoadMore={handleLoadMore} year={year} isLoading={loading} />
                        )}
                    </div>
                );
            })
        ) : (
            <p>No posts were found</p>
        )
    );
}

export default CasesByYear;
