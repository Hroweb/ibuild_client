import styles from './EventLogos.module.scss'
import Image from "next/image"

const EventLogo = ({ title, logo }) => {
    //const LogoComponent = require(`@/components/svgs/${name}Logo`).default;
    const label = title;
    const logoSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/event-logos/${logo}`
    return (
        <div className={styles['ev-logo-col']}>
            <div className={`ev-col-wrap fx fx-wrap fx-jc`}>
                <div className={styles['ev-name']}>
                    <h6>{label}</h6>
                </div>
                <div className={`${styles['ev-logo']} fx`}>
                    {/*<Image src={logoSrc} alt={label} height={44} width={196} />*/}
                    <img src={logoSrc} alt={label} width={`auto`} height={`auto`} />
                </div>
            </div>
        </div>
    );
};

export default EventLogo