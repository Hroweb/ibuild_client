import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'

const BlogCategoryList = ({ sectionTitle, categories, onCategoryClick }) => {
    const attachedLookup = categories.attached_categories.reduce((acc, categoryId) => {
        acc[categoryId] = true;
        return acc;
    }, {});
    return (
        <div className={`${styles['admin-cat-wrap']} fwidth`}>
            <div>
                <div className={`${styles['admin-cats-row']}`}>
                    <h3>{sectionTitle}</h3>
                    <div className={`${styles['admin-cat-list']} fx fx-wrap`}>
                        {Object.entries(categories.all_categories).map(([key, item], index) => (
                            item.title !== 'All Posts' &&
                            <a
                                className={attachedLookup[item.id] ? styles['attached-category'] : ''}
                                key={key}
                                data-slug={item.slug}
                                data-id={item.id}
                                onClick={() => onCategoryClick(item.id)}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCategoryList;