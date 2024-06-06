import styles from "./CaseSingle.module.scss"
import Link from "next/link"

const CaseIntro = ({ title, desc, bgColor, standSize, eventCat, eventYear }) => {
    return (
        <div className={`${styles['case-banner']}`} style={{ background: bgColor }}>
            <div className="container">
                <div className={`${styles['case-details']} fx fx-jb fx-wrap`}>
                    <div className={styles['case-bn-lcol']}>
                        <h1>{title}</h1>
                    </div>
                    <div className={styles['case-bn-rcol']}>
                        <p>{desc}</p>
                        <div className={`${styles['case-cats']} fx fx-ac fx-wrap`}>
                            <Link href="#">
                                {standSize}
                            </Link>
                            <Link href="#">
                                {eventCat}
                            </Link>
                            <Link href="#">
                                {eventYear}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseIntro;