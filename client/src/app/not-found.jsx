import styles from './err.module.scss';
import Link from "next/link"
import {BtnArrUp} from '@/components/svgs'

export const metadata = {
    title: '404 Not found',
};

const NotFound = () => {
    return(
        <div className={`${styles['error-page']}`}>
            <video autoPlay playsInline loop muted width="100%">
                <source src="/animations/err.mp4" type="video/mp4" />
            </video>
            <div className={`${styles['err-info']}`}>
                <h1>ERROR: FOUR_O_FOUR</h1>
                <p>The page you’re looking for <br/> got blown away...</p>
                <div className={`${styles['err-btn-row']}`}>
                    <Link className={`${styles['btn-primary']} ${styles['btn-primary-red']}`} href="/">
                        <span>Homepage</span>
                        <div className={`${styles['btn-arr']}`}>
                            <BtnArrUp />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;

