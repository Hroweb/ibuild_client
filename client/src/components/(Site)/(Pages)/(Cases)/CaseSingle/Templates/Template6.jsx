import styles from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle.module.scss"
import Image from "next/image";

const Template6 = ({data}) => {
    const templateData = (data && data.length !== 0) ? JSON.parse(data) : '';
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio`;

    return (
        <div className={`${styles["case-block-w"]} ${styles["case-block-w-img"]}`}>
            <div className="fx fx-jb">
                {templateData?.['case-2col-img-1'] && (
                    <div className={`${styles["case-img"]} ${styles["case-img-hf"]}`}>
                        <Image src={imgPath + templateData?.['case-2col-img-1']} alt={`Image 1`} width={980}
                               height={700}/>
                    </div>
                )}
                {templateData?.['case-2col-img-2'] && (
                    <div className={`${styles["case-img"]} ${styles["case-img-hf"]}`}>
                        <Image src={imgPath + templateData?.['case-2col-img-2']} alt={`Image 2`} width={980}
                               height={700}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Template6;