import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import BannerBlock from "@/components/(Admin)/BannerBlock/BannerBlock";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";

const Tab2 = ({ formData, selectedMedia, errorMessage, handleInputChange, subType }) => {
    const banner = selectedMedia?.banner?.banner?.preview ? selectedMedia?.banner.banner.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/about-us/${selectedMedia?.banner.banner}`;
    return(
    <div className={`${styles['admin-fields-wrap']}`}>
        <BannerBlock
            title="Graphic"
            selectedFile={banner}
            handleInputChange={handleInputChange}
            inputID='banner'
            errorMessage={errorMessage}
            subType={subType}
        />
        {/*{errorMessage && <div>{errorMessage}</div>}*/}
        {[{ title: 'Section Title', id: 'cp-title', placeholder: 'title', val: 'cp_title' },
            { title: 'Video', id: 'cp-video', placeholder: 'video embed link', val: 'cp_video_link' }
        ].map((item, index) => (
            <TitleBlock key={index}
                sectionTitle={item.title}
                sectionTitleVal={formData[item.val]}
                onChange={(event) => handleInputChange(item.val, event.target.value, subType)}
                inputID={item.id}
                inputPlaceholder={`Add your ${item.placeholder} here...`}
            />
        ))}
    </div>
)};

export default Tab2;