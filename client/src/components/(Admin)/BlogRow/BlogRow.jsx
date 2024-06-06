import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import { MenuArr } from '@/components/svgs/admin'
import {formatDate} from '@/utils/api/(admin)/helpers'

const BlogRow = ({ id, title, category, date, slug, onDelete}) => {
    return (
        <div className={`${styles['admin-tbl-row']} fwidth fx fx-jb fx-ac`}>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-ttl-bl']}`}>
                <h2>{title}</h2>
                <div className={`${styles['cs-actions']}`}>
                    <a href={`./posts/${id}`}>Edit</a>
                    <a href={`/blog/${slug}`} target="_blank">View</a>
                    <a href="#" onClick={() => onDelete(id)}>Delete</a>
                </div>
            </div>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-ev']}`}>
                <span>{category}</span>
            </div>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-date']}`}>
                <span>{formatDate(date)}</span>
            </div>
            <div className={`${styles['admin-tbl-mcol']} fx fx-jc`}>
                <a href={`./posts/${id}`}>
                    <MenuArr />
                </a>
            </div>
        </div>
    )
}

export default BlogRow;