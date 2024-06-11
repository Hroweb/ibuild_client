import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import {sortByTitle} from "@/hooks/admin/helpers";

const CaseCategoryList = ({ sectionTitle, dataCats, onCategoryClick }) => {
    const attachedEvents = dataCats.attached_events.reduce((acc, categoryId) => {
        acc[categoryId] = true;
        return acc;
    }, {});
    const attachedYears = dataCats.attached_years.reduce((acc, categoryId) => {
        acc[categoryId] = true;
        return acc;
    }, {});
    const attachedSizes = dataCats.attached_sizes.reduce((acc, categoryId) => {
        acc[categoryId] = true;
        return acc;
    }, {});
    const yearCats = sortByTitle(dataCats.years, true);
    const sizeCats = sortByTitle(dataCats.sizes, true);
    const eventCats = dataCats.events;
    return (
        <div className={`${styles['admin-cat-block']} ${styles['admin-cat-block-case']}`}>
            <h3>{sectionTitle}</h3>
            <div className={`${styles['admin-cat-wrap']} fwidth`}>
                <div>
                    <div className={`${styles['admin-cats-row']}`}>
                        <h3>Events</h3>
                        <div className={`${styles['admin-cat-list']} fx fx-wrap`}>
                            {Array.isArray(eventCats) && eventCats.filter(item => item.title !== "All Stands").map((item, index) => {
                                return (
                                    <a
                                        data-evid={item.id}
                                        key={index}
                                        className={attachedEvents[item.id] ? styles['selected'] : ''}
                                        onClick={() => onCategoryClick(item.id, 'events')}
                                    >
                                        {item.title}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className={`${styles['admin-cats-row']}`}>
                        <h3>Stand Sizes</h3>
                        <div className={`${styles['admin-cat-list']} fx fx-wrap`}>
                            {Array.isArray(sizeCats) && sizeCats.map((item, index) => {
                                return (
                                    <a
                                        data-szid={item.id}
                                        key={index}
                                        className={attachedSizes[item.id] ? styles['selected'] : ''}
                                        onClick={() => onCategoryClick(item.id, 'sizes')}
                                    >
                                        {item.title}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className={`${styles['admin-cats-row']}`}>
                        <h3>Event Years</h3>
                        <div className={`${styles['admin-cat-list']} fx fx-wrap`}>
                            {Array.isArray(yearCats) && yearCats.map((item, index) => {
                                return (
                                    <a
                                        data-yrid={item.id}
                                        key={index}
                                        className={attachedYears[item.id] ? styles['selected'] : ''}
                                        onClick={() => onCategoryClick(item.id, 'years')}
                                    >
                                        {item.title}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseCategoryList;