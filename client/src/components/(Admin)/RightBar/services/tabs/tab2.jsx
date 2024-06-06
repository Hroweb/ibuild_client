import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import BannerBlock from "@/components/(Admin)/BannerBlock/BannerBlock";

const Tab2 = ({ formData, selectedMedia, errorMessage, handleInputChange, subType }) => {
    const banner = selectedMedia?.banner?.banner?.preview ? selectedMedia?.banner.banner.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/services/${selectedMedia?.banner.banner}`;
    return(
    <div className={`${styles['admin-fields-wrap']}`}>
        <BannerBlock
            title="Banner"
            selectedFile={banner}
            handleInputChange={handleInputChange}
            inputID='banner'
            errorMessage={errorMessage}
            subType={subType}
        />
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['banner_title']}
            onChange={(event) => handleInputChange('banner_title', event.target.value, subType)}
            inputID="sv-banner-title"
            inputPlaceholder="Add your title here..."
        />
    </div>
)};

export default Tab2;