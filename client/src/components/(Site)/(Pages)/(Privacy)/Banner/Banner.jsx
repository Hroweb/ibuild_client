import styles from './Banner.module.scss';
import Image from "next/image";

const Banner = ({themeColor, title}) => {
   return (
        <section className={`pg-section ${styles['pv-banner']} ${styles[`banner-bg-${themeColor}`]}`}>
            <div className="fx fx-jb">
                <div>
                    <Image src="/banners/pv-banner-l.svg" alt="privacy banner" width="474" height="232" />
                </div>
                <div className={`${styles['pv-hd']} fx fx-ac`}>
                    <h1>{ title }</h1>
                </div>
                <div>
                    <Image src="/banners/pv-banner-r.svg" alt="privacy banner" width="373" height="323" />
                </div>
            </div>
        </section>
    );
};

export default Banner;