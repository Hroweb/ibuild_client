import styles from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle.module.scss"
import Image from "next/image";

const Template1 = ({data}) => {
    const templateData = (data && data.length !== 0) ? JSON.parse(data) : '';
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio`;
    return (
        <>
            <div className={styles["case-block-w"]}>
                {templateData?.['case-block-img'] && (
                <div className="fx">
                    <div className={styles["case-img"]}>
                        <Image src={imgPath+templateData?.['case-block-img']} width={1500} height={1200} alt={templateData?.['case-block-img']} />
                        {/*<img src={imgPath+data?.['case-block-img']} />*/}
                    </div>
                </div>
                )}
                <div className={`${styles["case-block-info"]} fx fx-jb fx-wrap`}>
                    {templateData?.['case-block-title'] && (
                        <div className={styles["case-info-lcol"]}>
                            <h2>{templateData?.['case-block-title']}</h2>
                        </div>
                    )}
                    {templateData?.['case-block-text'] && (
                        <div className={styles["case-info-rcol"]} dangerouslySetInnerHTML={{ __html: templateData?.['case-block-text'] }}></div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Template1;