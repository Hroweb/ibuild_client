import styles from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle.module.scss"
import Image from "next/image";
import {splitTextIntoParagraphs} from "@/hooks/helpers";

const Template3 = ({data}) => {
    const templateData = (data && data.length !== 0) ? JSON.parse(data) : '';
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio`;

    return (
        <div className={`${styles["tmp3-row"]}`}>
            <div className={`${styles["tmp3-mg"]} fx fx-jb m-top`}>
                {templateData?.['case-bl-img-1'] && (
                    <div className={`${styles["case-img"]} ${styles["case-img-hf"]}`}>
                        <Image src={imgPath + templateData?.['case-bl-img-1']} alt={`Image 1`} width={980}
                               height={700}/>
                    </div>
                )}
                {templateData?.['case-bl-img-2'] && (
                    <div className={`${styles["case-img"]} ${styles["case-img-hf"]}`}>
                        <Image src={imgPath + templateData?.['case-bl-img-2']} alt={`Image 1`} width={980}
                               height={700}/>
                    </div>
                )}
            </div>
            <div className={`${styles["case-block-info"]} fx fx-jb fx-wrap`}>
                {templateData?.['case-block-2col-title'] && (
                    <div className={styles["case-info-lcol"]}>
                        <h2>{templateData?.['case-block-2col-title']}</h2>
                    </div>
                )}
                {templateData?.['case-block-2col-text'] && (
                    <div className={styles["case-info-rcol"]} dangerouslySetInnerHTML={{ __html: templateData?.['case-block-2col-text'] }}>
                        {/*{splitTextIntoParagraphs(templateData?.['case-block-2col-text'])}*/}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Template3;