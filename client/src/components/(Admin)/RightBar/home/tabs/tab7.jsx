import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";

const Tab7 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['clients_title']}
            onChange={(event) => handleInputChange('clients_title', event.target.value, subType)}
            inputID="hp-cl-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData['clients_desc']}
            inputID="hp-cl-text"
            inputName="hp-cl-text"
            onChange={(event) => handleInputChange('clients_desc', event.target.value, subType)}
        />
    </div>
)

export default Tab7