import styles from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle.module.scss"
import Image from "next/image";

const Template7 = ({data}) => {
    const templateData = (data && data.length !== 0) ? JSON.parse(data) : '';
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio`;
    return (
        <>
            <div className={`${styles["case-block-w"]} ${styles["case-block-w-alt"]}`}>
                {templateData?.['case-block-alt-title'] && (
                    <h2>{templateData?.['case-block-alt-title']}</h2>
                )}
                <div className="fx">
                    {templateData?.['case-block-alt-img'] && (
                        <div className={styles["case-img"]}>
                            <Image src={imgPath+templateData?.['case-block-alt-img']} width={2040} height={1058} alt={templateData?.['case-block-alt-title']} />
                        </div>
                    )}
                </div>
                <div className={`${styles["case-block-info"]} fx fx-jb fx-wrap`}>
                    {templateData?.['case-block-title'] && (
                        <div className={styles["case-info-lcol"]}>
                            <h2>{templateData?.['case-block-title']}</h2>
                        </div>
                    )}
                    {templateData?.['case-block-alt-text'] && (
                        <div className={styles["case-info-rcol"]} dangerouslySetInnerHTML={{ __html: templateData?.['case-block-alt-text'] }}>
                            {/*{templateData?.['case-block-alt-text']}*/}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Template7;