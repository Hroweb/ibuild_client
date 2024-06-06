import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";

const Tab7 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['cp_team_title']}
            onChange={(event) => handleInputChange('cp_team_title', event.target.value, subType)}
            inputID="cp-team-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData['cp_team_text']}
            inputID="cp-team-text"
            inputName="cp-team-text"
            onChange={(event) => handleInputChange('cp_team_text', event.target.value, subType)}
        />
    </div>
)

export default Tab7