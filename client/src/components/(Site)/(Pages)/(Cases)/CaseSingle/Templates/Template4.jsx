import styles from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle.module.scss"
import Image from "next/image";
import {splitTextIntoParagraphs} from "@/hooks/helpers";

const Template4 = ({data}) => {
    const templateData = (data && data.length !== 0) ? JSON.parse(data) : '';
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio`;

    return (
        <>
            <div className={styles["case-block-w"]}>
                <div className={`${styles["case-col-wrap"]} fx fx-jb fx-wrap`}>
                    <div className={styles["case-col"]}>
                        {templateData?.['case-col-img-1'] && (
                            <div className={styles["case-img"]}>
                                <Image src={imgPath+templateData?.['case-col-img-1']} width={980} height={980} alt={templateData?.['case-block-2colm-title']} />
                            </div>
                        )}
                        <div className={styles["case-col-info"]}>
                            {templateData?.['case-block-2colm-title'] && (
                                <h2>{templateData?.['case-block-2colm-title']}</h2>
                            )}
                            {templateData?.['case-block-2col-text'] && (
                                <div dangerouslySetInnerHTML={{ __html: templateData?.['case-block-2col-text'] }}></div>
                                // splitTextIntoParagraphs(templateData?.['case-block-2col-text'])
                            )}
                        </div>
                    </div>
                    <div className={styles["case-col"]}>
                        <div className={styles["case-img"]}>
                            {templateData?.['case-col-img-2'] && (
                                <div className={styles["case-img"]}>
                                    <Image src={imgPath+templateData?.['case-col-img-2']} width={980} height={980} alt={templateData?.['case-block-2colm-title']} />
                                </div>
                            )}
                        </div>
                        <div className={styles["case-col-info"]}>
                            {templateData?.['case-block-2colm-title2'] && (
                                <h2>{templateData?.['case-block-2colm-title2']}</h2>
                            )}
                            {templateData?.['case-block-2col-text2'] && (
                                <div dangerouslySetInnerHTML={{__html: templateData?.['case-block-2col-text2']}}></div>
                                // splitTextIntoParagraphs(templateData?.['case-block-2col-text2'])
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Template4;