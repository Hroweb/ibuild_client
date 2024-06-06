import styles from "@/components/(Admin)/RightBar/RightBar.module.scss"
import ImageUploadBlock from "@/components/(Admin)/CaseSingle/ImageUploadBlock"

const Template5 = ({ id, handleMediaInputChange, selectedMedia, isEdit = false }) => {
    return (
        <div className={`${styles['admin-tmp-row']}`}>
            <h4>Template 5 Fields</h4>
            <div className={`${styles['admin-tmp-wrap']}`}>
                <ImageUploadBlock 
                    sectionTitle="Image"
                    inputID={`case-block-f-img-${id}`}
                    allowedFormats=".jpeg, .jpg, .png, .webp"
                    handleMediaInputChange={handleMediaInputChange}
                    selectedMedia={selectedMedia}
                    template="Template5"
                    sectionID={id}
                />
            </div>
        </div>
    )
}

export default Template5;