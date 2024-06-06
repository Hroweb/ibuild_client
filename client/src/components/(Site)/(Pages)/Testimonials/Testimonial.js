import React, {useState} from 'react';
import styles from './Testimonials.module.scss';
import Image from "next/image";

const Testimonial = ({ desc, src, alt, author_name, author_designation, logo_src, logo_alt }) => {
    const [isActive, setIsActive] = useState(true);
    src = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/testimonials/${src}`;
    logo_src = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/testimonials/${logo_src}`;
    const toggleClass = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={styles['tst-slide']}>
            <div className={styles['tst-text']}>
                <p className={`tst-desc ${isActive ? styles.ellipsis : styles.expanded}`}>{desc}</p>
            </div>
            <a href='/#read-more' className={styles['tst-readMore']} onClick={toggleClass}>
                Read 
                {
                    isActive ? (' More') : (' Less')
                }
            </a>
            <div className={`${styles['tst-author-row']} fx fx-jb fx-ac`}>
                <div className={`tst-author-col fx fx-ac`}>
                    <div className={styles['tst-author']}>
                        <Image src={src} alt={alt} width={76} height={76} />
                    </div>
                    <div className={styles['tst-author-info']}>
                        <h5>{author_name}</h5>
                        <h6>{author_designation}</h6>
                    </div>
                </div>
                <div className={styles['tst-logo-col']}>
                    <Image src={logo_src} alt={logo_alt} width={100} height={13} />
                </div>
            </div>
        </div>
    );
}

export default Testimonial;