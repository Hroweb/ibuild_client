import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import ButtonBlock from "@/components/(Admin)/ButtonBlock/ButtonBlock";

const Tab4 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData.projects_title}
            onChange={(event) => handleInputChange('projects_title', event.target.value, subType)}
            inputID="hp-pj-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData.projects_desc}
            inputID="hp-pj-desc"
            inputName="hp-pj-desc"
            onChange={(event) => handleInputChange('projects_desc', event.target.value, subType)}
        />
        <ButtonBlock
            sectionTitle="Button"
            inputID="hp-pj-btn"
            inputName="hp-pj-btn"
            inputVal={formData.projects_btn}
            onChange={(event) => handleInputChange('projects_btn', event.target.value, subType)}
        />
    </div>
)

export default Tab4