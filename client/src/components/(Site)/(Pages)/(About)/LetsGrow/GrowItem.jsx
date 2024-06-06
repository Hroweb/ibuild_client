import styles from './LetsGrow.module.scss'
import Image from "next/image"

const GrowItem = ({ src, alt, width, height, title, desc }) => {
    return (
        <div className={`${styles['grow-item']}`}>
            <div className={`${styles['grow-icon']}`}>
                <Image src={src} alt={alt} width={width} height={height} />
            </div>
            <div className={`${styles['grow-info']}`}>
                <h3>{ title }</h3>
                <p>{ desc }</p>
            </div>
        </div>
    );
}

export default GrowItem;