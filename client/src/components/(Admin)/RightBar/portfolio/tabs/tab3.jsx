import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";

const Tab3 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['pf_featured_title']}
            onChange={(event) => handleInputChange('pf_featured_title', event.target.value, subType)}
            inputID="pf-featured-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData['pf_featured_text']}
            inputID="pf-featured-text"
            inputName="pf-featured-text"
            onChange={(event) => handleInputChange('pf_featured_text', event.target.value, subType)}
        />
    </div>
)

export default Tab3