import styles from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle.module.scss"
import Image from "next/image";

const Template5 = ({data}) => {
    const templateData = (data && data.length !== 0) ? JSON.parse(data) : '';
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio`;

    return (
        <>
            {templateData?.['case-block-f-img'] && (
                <div className={`${styles["case-block-tmp5"]} fx fx-wrap}`}>
                    <div className={styles["case-img"]}>
                        <Image src={imgPath+templateData?.['case-block-f-img']} width={1500} height={700} alt={templateData?.['case-block-id']}/>
                    </div>
                </div>
            )}
        </>
    )
}

export default Template5;