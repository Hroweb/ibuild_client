import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import QuillComponent from "@/components/(Admin)/QuillComponent/QuillComponent";

const Tab3 = ({formData, handleInputChange, subType}) => {
    return (
        <div className={`${styles['admin-fields-wrap']}`}>
            <TitleBlock
                sectionTitle="Section title"
                sectionTitleVal={formData['cp_intro_title']}
                onChange={(event) => handleInputChange('cp_intro_title', event.target.value, subType)}
                inputID="cp-intro-title"
                inputPlaceholder="Add your title here..."
            />
            <QuillComponent
                value={formData['cp_intro_text']}
                id="cp-intro-text"
                name="cp-intro-text"
                onChange={(event) => handleInputChange('cp_intro_text', event, subType)}
            />
        </div>
    )
}

export default Tab3