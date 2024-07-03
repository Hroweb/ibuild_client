import styles from "@/components/(Admin)/RightBar/RightBar.module.scss"
import ImageUploadBlock from "@/components/(Admin)/CaseSingle/ImageUploadBlock"

const Template2 = ({ id, handleMediaInputChange, selectedMedia, isEdit = false, handleTemplateDelete }) => {
    return (
        <div className={`${styles['admin-tmp-row']}`}>
            <h4>Template 2 Fields</h4>
            <div className={`${styles['admin-tmp-wrap']} ps-rel`}>
                <a href="#" onClick={(e) => handleTemplateDelete(e,id)} className={`${styles['btn-delete']}`}>Delete Section</a>
                <ImageUploadBlock
                    sectionTitle="Gif Animation file"
                    inputID={`case-block-gif-${id}`}
                    allowedFormats=".gif"
                    handleMediaInputChange={handleMediaInputChange}
                    selectedMedia={selectedMedia}
                    template="Template2"
                    sectionID={id}
                />
            </div>
        </div>
    )
}

export default Template2;