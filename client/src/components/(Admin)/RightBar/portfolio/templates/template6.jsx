import styles from "@/components/(Admin)/RightBar/RightBar.module.scss"
import ImageUploadBlock from "@/components/(Admin)/CaseSingle/ImageUploadBlock"

const Template6 = ({ id, handleMediaInputChange, selectedMedia, isEdit = false, handleTemplateDelete }) => {
    const blImg1 = selectedMedia?.[0] !== undefined ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${selectedMedia?.[0]}` : null;
    const blImg2 = selectedMedia?.[1] !== undefined ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${selectedMedia?.[1]}` : null;
    return (
        <div className={`${styles['admin-tmp-row']}`}>
            <h4>Template 6 Fields</h4>
            <div className={`${styles['admin-tmp-wrap']} ps-rel`}>
                <a href="#" onClick={(e) => handleTemplateDelete(e,id)} className={`${styles['btn-delete']}`}>Delete Section</a>
                <div className={`${styles['admin-tmp-2colm']} ${styles['admin-tmp-2colmImg']} fx fx-jb`}>
                    <div className={`${styles['admin-tmp-col']}`}>
                        <ImageUploadBlock 
                            sectionTitle="Image 1"
                            inputID={`case-2col-img-1-${id}`}
                            allowedFormats=".jpeg, .jpg, .png, .webp"
                            handleMediaInputChange={handleMediaInputChange}
                            selectedMedia={blImg1}
                            template="Template6"
                            sectionID={id}
                        />
                    </div>
                    <div className={`${styles['admin-tmp-col']}`}>
                        <ImageUploadBlock 
                            sectionTitle="Image 2"
                            inputID={`case-2col-img-2-${id}`}
                            allowedFormats=".jpeg, .jpg, .png, .webp"
                            handleMediaInputChange={handleMediaInputChange}
                            selectedMedia={blImg2}
                            template="Template6"
                            sectionID={id}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template6;