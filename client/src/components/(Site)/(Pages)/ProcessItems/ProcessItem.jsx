import styles from './ProcessItems.module.scss'
import Image from "next/image"

const ProcessItem = ({ src1, src2, alt, width, height, title, desc }) => {
    src1 = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/processes/${src1}`
    src2 = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/processes/${src2}`
    return (
        <div className={`${styles['prc-item']}`}>
            <div className={`${styles['prc-anim-frame']}`}>
                <Image src={src1} alt={alt} width={width} height={height} />
                <Image src={src2} alt={alt} width={width} height={height} />
            </div>
            <div className={`${styles['prc-info']}`}>
                <h3>{ title }</h3>
                <p>{ desc }</p>
            </div>
        </div>
    );
}

export default ProcessItem;