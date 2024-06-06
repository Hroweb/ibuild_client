import styles from './HpBanner.module.scss';
import HeroBannerNumbers from '@/components/(Site)/(Pages)/(Home)/(Banner)/HeroBannerNumbers/HeroBannerNumbers'
import LazyBannerAnim from "@/components/(Site)/(Pages)/(Home)/(Banner)/BannerAnim/LazyBannerAnim";
import {Suspense} from "react";

const HpBanner = ({data, anim}) => {
    return (
        <section className={`pg-section ${styles['hero-banner']}`}>
            <div className="container">
                <div className={`${styles['bn-row']} fx fx-jb fx-ae fx-wrap`}>
                    <div className={styles['bn-lcol']}>
                        <div className={styles['bn-hd']}>
                            <h1>{data?.['banner_section_title']?.['meta_value']}</h1>
                        </div>
                    </div>
                    <div className={styles['bn-rcol']}>
                        <div className={styles['bn-text']}>
                            <p>{data?.['banner_section_desc']?.['meta_value']}</p>
                            {/*<p>We transform concepts into <strong> stunning exhibition stands,</strong> offering end-to-end event solutions, from design to execution.</p>*/}
                        </div>
                    </div>
                </div>
                <div className={`${styles['bn-row']} fx fx-jb fx-ac fx-wrap`}>
                    <div className={styles['bn-lcol']}>
                        <div className={styles['bn-anim']}>
                            <div id={`${styles['bn-anim-cnt']}`} style={{height: 132.23}}>
                                <Suspense fallback={<div>Loading Animation...</div>}>
                                    <LazyBannerAnim data={anim} />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    <div className={styles['bn-rcol']}>
                        <Suspense fallback={<div>Loading Animation...</div>}>
                            <HeroBannerNumbers data={data} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HpBanner;