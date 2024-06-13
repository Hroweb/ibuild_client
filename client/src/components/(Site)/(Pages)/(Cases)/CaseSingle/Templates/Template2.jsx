import styles from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle.module.scss"
import Image from "next/image";

const Template2 = ({data}) => {
    const templateData = (data && data.length !== 0) ? JSON.parse(data) : '';
    const imgPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio`;

    return (
        <>
            {templateData?.['case-block-gif'] && (
                <div className={styles["case-block-w"]}>
                    <div className="fx">
                        <div className={styles["case-img-anim"]}>
                            <Image src={imgPath + templateData?.['case-block-gif']} width={600} height={400} alt={templateData?.['case-block-id']}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Template2;