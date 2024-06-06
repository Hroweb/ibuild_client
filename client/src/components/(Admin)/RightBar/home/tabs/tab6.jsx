import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import ButtonBlock from "@/components/(Admin)/ButtonBlock/ButtonBlock";

const Tab6 = ({formData, handleInputChange, subType}) => (
    <div className={`${styles['admin-fields-wrap']}`}>
        <TitleBlock
            sectionTitle="Section title"
            sectionTitleVal={formData.blog_title}
            onChange={(event) => handleInputChange('blog_title', event.target.value, subType)}
            inputID="hp-blog-title"
            inputPlaceholder="Add your title here..."
        />
        <DescBlock
            sectionTitle="Description"
            sectionTitleVal={formData.blog_desc}
            inputID="hp-blog-desc"
            inputName="hp-blog-desc"
            onChange={(event) => handleInputChange('blog_desc', event.target.value, subType)}
        />
        <ButtonBlock
            sectionTitle="Button"
            inputID="hp-blog-btn"
            inputName="hp-blog-btn"
            inputVal={formData.blog_btn}
            onChange={(event) => handleInputChange('blog_btn', event.target.value, subType)}
        />
    </div>
)

export default Tab6