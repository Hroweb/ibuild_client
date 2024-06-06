import styles from "./CaseSingle.module.scss"
import Link from "next/link"

const CaseOverview = ({ ovw_text }) => {
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
                        <div className={`${styles['case-sv-list']} fx fx-wrap`}>
                            <Link href="/services">
                                Booth Conceptualisation
                            </Link>
                            <Link href="/services">
                                Branding & Graphic Design
                            </Link>
                            <Link href="/services">
                                Project Management
                            </Link>
                            <Link href="/services">
                                Booth Construction
                            </Link>
                        </div>
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