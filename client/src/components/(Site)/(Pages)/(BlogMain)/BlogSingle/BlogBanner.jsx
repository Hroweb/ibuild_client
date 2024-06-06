import styles from './BlogSingle.module.scss'

const  BlogBanner = ({ src, title, minutes, date }) => {
    const backgroundStyle = {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    };
    return (
        <div className={`${styles['single-blog-bn']}`}>
            <div className={styles['single-blog-banner']} style={backgroundStyle}>
                <div className={`${styles['single-blg-cnt']} container`}>
                    <div className={`${styles['single-blog-wrap']} fx fx-jc fx-ac`}>
                        <div className={`${styles['single-blog-info']}`}>
                            <h1>{ title }</h1>
                            <div className={`${styles['single-blog-dt']} fx fx-ac fx-jc`}>
                                <span>{ minutes } mins read</span>
                                <span>{ date }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogBanner;
