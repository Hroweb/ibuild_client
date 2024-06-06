import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import ButtonBlock from "@/components/(Admin)/ButtonBlock/ButtonBlock";

const Tab5 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData.services_title}
            onChange={(event) => handleInputChange('services_title', event.target.value, subType)}
            inputID="hp-sv-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData.services_desc}
            inputID="hp-sv-desc"
            inputName="hp-sv-desc"
            onChange={(event) => handleInputChange('services_desc', event.target.value, subType)}
        />
        <ButtonBlock
            sectionTitle="Button"
            inputID="hp-sv-btn"
            inputName="hp-sv-btn"
            inputVal={formData.services_btn}
            onChange={(event) => handleInputChange('services_btn', event.target.value, subType)}
        />
    </div>
)

export default Tab5