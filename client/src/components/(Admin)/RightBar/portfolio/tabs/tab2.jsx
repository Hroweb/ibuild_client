import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import BannerAnimation from "@/components/(Admin)/BannerAnimation/BannerAnimation";
import BannerBlock from "@/components/(Admin)/BannerBlock/BannerBlock";

const Tab2 = ({ formData, selectedMedia, errorMessage, handleInputChange, subType }) => {
    const bannerAnim = selectedMedia?.banner?.pf_banner_anim?.preview ? selectedMedia?.banner?.pf_banner_anim?.preview : selectedMedia?.banner?.pf_banner_anim;
    //console.log(bannerAnim); return false;
    return (
    <div className={`${styles['admin-fields-wrap']}`}>
        {/*<BannerBlock
            title="Banner"
            selectedFile={bannerAnim}
            handleInputChange={handleInputChange}
            inputID='pf_banner_anim'
            errorMessage={errorMessage}
            subType={subType}
        />*/}
        <BannerAnimation
            animationFile={bannerAnim}
            inputID="pf_banner_anim"
            inputFileID="pf_banner_anim"
            errorMessage={errorMessage}
            handleInputChange={handleInputChange}
            subType={subType}
        />
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData['pf_banner_title']}
            onChange={(event) => handleInputChange('pf_banner_title', event.target.value, subType)}
            inputID="pf-banner-title"
            inputPlaceholder="Add your title here..."
        />
    </div>
)};

export default Tab2;
