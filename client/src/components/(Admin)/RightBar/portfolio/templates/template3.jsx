import styles from "@/components/(Admin)/RightBar/RightBar.module.scss"
import ImageUploadBlock from "@/components/(Admin)/CaseSingle/ImageUploadBlock"
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock"
import QuillComponent from "@/components/(Admin)/QuillComponent/QuillComponent";

const Template3 = ({ id, handleInputChange, formData, handleMediaInputChange, selectedMedia, isEdit = false, handleTemplateDelete }) => {
    const templateFields = isEdit ? formData : (formData.templateFields[id] && formData.templateFields[id].Template3 ? formData.templateFields[id].Template3 : {});
    const titleFieldId = `case-block-2col-title-${id}`;
    const titleValue = templateFields[titleFieldId] || '';
    const descFieldId = `case-block-2col-text-${id}`;
    const descValue = templateFields[descFieldId] || '';
    const blImg1 = selectedMedia?.[0] !== undefined ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${selectedMedia?.[0]}` : null;
    const blImg2 = selectedMedia?.[1] !== undefined ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${selectedMedia?.[1]}` : null;

    return (
        <div className={`${styles['admin-tmp-row']}`}>
            <h4>Template 3 Fields</h4>
            <div className={`${styles['admin-tmp-wrap']} ps-rel`}>
                <a href="#" onClick={(e) => handleTemplateDelete(e,id)} className={`${styles['btn-delete']}`}>Delete Section</a>
                <div className={`${styles['admin-tmp-2col']} fx fx-jb`}>
                    <ImageUploadBlock 
                        sectionTitle="Image 1"
                        inputID={`case-bl-img-1-${id}`}
                        allowedFormats=".jpeg, .jpg, .png, .webp"
                        handleMediaInputChange={handleMediaInputChange}
                        selectedMedia={blImg1}
                        template="Template3"
                        sectionID={id}
                    />
                    <ImageUploadBlock 
                        sectionTitle="Image 2"
                        inputID={`case-bl-img-2-${id}`}
                        allowedFormats=".jpeg, .jpg, .png, .webp"
                        handleMediaInputChange={handleMediaInputChange}
                        selectedMedia={blImg2}
                        template="Template3"
                        sectionID={id}
                    />
                </div>
                <TitleBlock 
                    sectionTitle="Section Title"
                    sectionTitleVal={titleValue}
                    inputID={titleFieldId}
                    inputPlaceholder="Add your title here..."
                    onChange={(event) => handleInputChange(titleFieldId, event.target.value, id, 'Template3')}
                />
                <QuillComponent
                    value={descValue}
                    id={descFieldId}
                    name={`case-block-2col-text`}
                    onChange={(event) => handleInputChange(descFieldId, event, id, 'Template3')}
                />
            </div>
        </div>
    )
}

export default Template3;