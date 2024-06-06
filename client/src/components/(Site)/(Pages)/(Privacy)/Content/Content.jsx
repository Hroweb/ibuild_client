import styles from './Content.module.scss'
import Link from 'next/link'

const Content = ({date, text}) => {
    return(
        <section className={`pg-section pg-section-pd bg-light`}>
            <div className="container">
                <div className={`${styles['pv-ct-wrap']}`} dangerouslySetInnerHTML={{ __html: text }}>
                </div>
            </div>
        </section>
    );
}

export default Content;