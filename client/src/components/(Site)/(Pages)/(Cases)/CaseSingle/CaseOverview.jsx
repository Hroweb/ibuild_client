import styles from "./CaseSingle.module.scss"
import Link from "next/link"

const CaseOverview = ({ ovw_text, sv_list }) => {
    const ovw_paragraphs = ovw_text.split('\n').map((paragraph, index) => (
        <p key={index}>
            {paragraph}
        </p>
    ));
    return (
        <div className={`${styles['case-ovw']} bg-white`}>
            <div className="container">
                <div className="fx fx-jb fx-wrap">
                    <div className={`${styles['case-ovw-lcol']}`}>
                        {sv_list &&
                            <div className={`${styles['case-sv-list']} fx fx-wrap`}>
                                {
                                    sv_list.map((item, index)=>
                                        <Link key={index} href="/services">
                                            {item.title}
                                        </Link>
                                    )
                                }
                            </div>
                        }
                    </div>
                    <div className={`${styles['case-ovw-rcol']}`}>
                        <h2>Overview</h2>
                        <div className={`${styles['case-ovw-text']}`}>
                            {ovw_paragraphs}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseOverview;