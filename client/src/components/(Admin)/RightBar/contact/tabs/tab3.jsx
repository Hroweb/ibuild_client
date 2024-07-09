import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";

const Tab3 = ({ formData, handleInputChange, subType }) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Email"
            sectionTitleVal={formData['email']}
            onChange={(event) => handleInputChange('email', event.target.value, subType)}
            inputID="ct-email"
            inputPlaceholder="Add your email here..."
        />
        <DescBlock
            sectionTitle="Address"
            sectionTitleVal={formData['address']}
            onChange={(event) => handleInputChange('address', event.target.value, subType)}
            inputID="ct-address"
            inputPlaceholder="Add your address here..."
        />
        <TitleBlock
            sectionTitle="Facebook link"
            sectionTitleVal={formData['fb_link']}
            onChange={(event) => handleInputChange('fb_link', event.target.value, subType)}
            inputID="ct-fb_link"
            inputPlaceholder="Add your link here..."
        />
        <TitleBlock
            sectionTitle="Instagram link"
            sectionTitleVal={formData['insta_link']}
            onChange={(event) => handleInputChange('insta_link', event.target.value, subType)}
            inputID="ct-insta_link"
            inputPlaceholder="Add your link here..."
        />
        <TitleBlock
            sectionTitle="Linkedin link"
            sectionTitleVal={formData['linkedin_link']}
            onChange={(event) => handleInputChange('linkedin_link', event.target.value, subType)}
            inputID="ct-linkedin_link"
            inputPlaceholder="Add your link here..."
        />
    </div>
);

export default Tab3;