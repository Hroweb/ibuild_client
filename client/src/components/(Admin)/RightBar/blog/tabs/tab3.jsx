import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";

const Tab3 = ({ formData, errorMessage, handleInputChange, subType }) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Recent News title"
            sectionTitleVal={formData['recent_news_ttile']}
            onChange={(event) => handleInputChange('recent_news_ttile', event.target.value, subType)}
            inputID="nw-rc-title"
            inputPlaceholder="Add your title here..."
        />
        <TitleBlock
            sectionTitle="Top News title"
            sectionTitleVal={formData['top_news_ttile']}
            onChange={(event) => handleInputChange('top_news_ttile', event.target.value, subType)}
            inputID="nw-top-title"
            inputPlaceholder="Add your title here..."
        />
        <TitleBlock
            sectionTitle="Other News title"
            sectionTitleVal={formData['other_news_ttile']}
            onChange={(event) => handleInputChange('other_news_ttile', event.target.value, subType)}
            inputID="nw-other-title"
            inputPlaceholder="Add your title here..."
        />
    </div>
);

export default Tab3;