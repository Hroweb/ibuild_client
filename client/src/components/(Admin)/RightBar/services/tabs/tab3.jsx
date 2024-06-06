import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";

const Tab3 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['clb_title']}
            onChange={(event) => handleInputChange('clb_title', event.target.value, subType)}
            inputID="sv-clb-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData['clb_text']}
            inputID="sv-clb-text"
            inputName="sv-clb-text"
            onChange={(event) => handleInputChange('clb_text', event.target.value, subType)}
        />
    </div>
)

export default Tab3