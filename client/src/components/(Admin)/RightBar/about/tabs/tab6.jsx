import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";

const Tab6 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['cp_gal_title']}
            onChange={(event) => handleInputChange('cp_gal_title', event.target.value, subType)}
            inputID="cp-gal-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData['cp_gal_text']}
            inputID="cp-gal-text"
            inputName="cp-gal-text"
            onChange={(event) => handleInputChange('cp_gal_text', event.target.value, subType)}
        />
    </div>
)

export default Tab6