import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import QuillComponent from "@/components/(Admin)/QuillComponent/QuillComponent";

const Tab2 = ({ formData, errorMessage, handleInputChange, subType }) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Page title"
            sectionTitleVal={formData['title']}
            onChange={(event) => handleInputChange('title', event.target.value, subType)}
            inputID="pv-title"
            inputPlaceholder="Add your title here..."
        />
        <QuillComponent
            value={formData['content']}
            id="privacy-content"
            name="privacy-content"
            onChange={(event) => handleInputChange('content', event, subType)}
        />
    </div>
);

export default Tab2;