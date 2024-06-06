import SEOBlock from "@/components/(Admin)/SEOBlock/SEOBlock";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";

const Tab1 = ({ formData, handleInputChange, subType }) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <SEOBlock
            pageMetaDesc={formData['meta_description']}
            pageMetaKeyW={formData['meta_keywords']}
            fieldName={`hp`}
            handleInputChange={handleInputChange}
            ogData={formData}
            subType={subType}
        />
    </div>
);

export default Tab1;
