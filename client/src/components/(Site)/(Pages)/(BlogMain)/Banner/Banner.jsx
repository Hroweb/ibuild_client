import styles from './Banner.module.scss'
import {BtnArrUp} from '@/components/svgs'
import BlogCatRow from '@/components/(Site)/(Pages)/(BlogMain)/BlogCat/BlogCatRow'

const Banner = ({ title, desc }) => {
    return (
        <section className={`pg-section ${styles['blog-banner']} ${styles['banner-bg-white']}`}>
            <div className="container">
                <div className={`fx fx-jb fx-wrap`}>
                    <div className={`${styles['bg-bn-lcol']}`}>
                        <div className={`${styles['bg-bn-hd']}`}>
                            <h1>{ title }</h1>
                            <p>{ desc }</p>
                        </div>
                    </div>
                    <div className={`${styles['bg-bn-rcol']}`}>
                        <a className="btn-primary btn-primary-red fx fx-ac fx-jc">
                            <span>Subscribe to Our News</span>
                            <div className="btn-arr">
                                <BtnArrUp />
                            </div>
                        </a>
                    </div>
                </div>
                {/*<BlogCatRow />*/}
            </div>
        </section>
    );
}

export default Banner;