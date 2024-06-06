import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import DescBlock from '@/components/(Admin)/DescBlock/DescBlock'

const PostSEOBlock = ({ sectionTitle, pageMetaDesc, pageMetaKeyW, handleInputChange }) => {
    return (
        <div className={`${styles['admin-pg-block']}`}>
            <h3>{sectionTitle}</h3>
            <div className={`${styles['admin-pg-wrap']} fwidth`}>
                <DescBlock 
                    sectionTitle="Meta Description"
                    sectionTitleVal={pageMetaDesc}
                    inputId="meta-description"
                    inputName="meta-description"
                    onChange={(event) => handleInputChange('meta_description', event.target.value)}
                />
                <DescBlock 
                    sectionTitle="Keywords"
                    sectionTitleVal={pageMetaKeyW}
                    inputId="meta-keywords"
                    inputName="meta-keywords"
                    onChange={(event) => handleInputChange('meta_keywords', event.target.value)}
                />
            </div>
        </div>
    )
}

export default PostSEOBlock;