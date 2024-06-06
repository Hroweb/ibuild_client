import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import ButtonBlock from "@/components/(Admin)/ButtonBlock/ButtonBlock";

const Tab4 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['ft_cases_title']}
            onChange={(event) => handleInputChange('ft_cases_title', event.target.value, subType)}
            inputID="ft-cases-title"
            inputPlaceholder="Add your title here..."
        />
        <ButtonBlock
            sectionTitle="Button"
            inputID="cases_btn"
            inputName="cases_btn"
            inputVal={formData['ft_cases_btn_text']}
            onChange={(event) => handleInputChange('ft_cases_btn_text', event.target.value, subType)}
        />
    </div>
)

export default Tab4