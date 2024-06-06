import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock"

const OverviewBlock = ({ sectionTitle, sectionText, handleInputChange }) => {
    return (
        <div className={`${styles['admin-case-block']} ${styles['admin-case-ovw']}`}>
            <h3>{sectionTitle}</h3>
                <DescBlock 
                    sectionTitle=""
                    sectionTitleVal={sectionText}
                    inputID="case-ov-text"
                    inputName="case-ov-text"
                    onChange={(event) => handleInputChange('overview', event.target.value)}
                />
        </div>
    )
}

export default OverviewBlock;