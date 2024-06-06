import styles from "./CaseSingle.module.scss"
import Image from "next/image"

const FeaturedImage = ({ src, alt, width, height }) => {
    return (
        <div className={`${styles['case-ft-image']}`}>
            <Image src={src} alt={alt} width={width} height={height} />
        </div>
    );
}

export default FeaturedImage;