import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";

const Tab2 = ({ formData, errorMessage, handleInputChange, subType }) => {
    return(
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['banner_title']}
            onChange={(event) => handleInputChange('banner_title', event.target.value, subType)}
            inputID="blog-banner-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="SubTitle"
            sectionTitleVal={formData['banner_desc']}
            inputID="blog-banner-text"
            inputName="blog-banner-text"
            onChange={(event) => handleInputChange('banner_desc', event.target.value, subType)}
        />
    </div>
)};

export default Tab2;