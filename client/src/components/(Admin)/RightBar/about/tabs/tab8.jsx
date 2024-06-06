import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";

const Tab8 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['cp_cl_title']}
            onChange={(event) => handleInputChange('cp_cl_title', event.target.value, subType)}
            inputID="cp-cl-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData['cp_cl_text']}
            inputID="cp-cl-text"
            inputName="cp-cl-text"
            onChange={(event) => handleInputChange('cp_cl_text', event.target.value, subType)}
        />
    </div>
)

export default Tab8