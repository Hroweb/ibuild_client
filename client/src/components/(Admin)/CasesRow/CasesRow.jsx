import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import { MenuArr } from '@/components/svgs/admin'
import {formatDate} from '@/utils/api/(admin)/helpers'

const CasesRow = ({ id,title, year, standSize, event, date, slug, onDelete}) => {
    return (
        <div className={`${styles['admin-tbl-row']} fwidth fx fx-jb fx-ac`}>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-ttl']}`}>
                <h2>{title}</h2>
                <div className={`${styles['cs-actions']}`}>
                    <a href={`/admin/portfolio/case-studies/${id}`}>Edit</a>
                    <a href={`/portfolio/case-study/${slug}`} target="_blank">View</a>
                    <a href="#" onClick={() => onDelete(id)}>Delete</a>
                </div>
            </div>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-year']}`}>
                <span>{year}</span>
            </div>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-ss']}`}>
                <span>{standSize}</span>
            </div>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-ev']}`}>
                <span>{event}</span>
            </div>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-date']}`}>
                <span>{formatDate(date)}</span>
            </div>
            <div className={`${styles['admin-tbl-mcol']} fx fx-jc`}>
                <a href={`/admin/portfolio/case-studies/${id}`}>
                    <MenuArr />
                </a>
            </div>
        </div>
    )
}

export default CasesRow;