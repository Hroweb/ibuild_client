import styles from "@/components/(Admin)/RightBar/RightBar.module.scss"
import ImageUploadBlock from "@/components/(Admin)/CaseSingle/ImageUploadBlock"
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock"
import QuillComponent from "@/components/(Admin)/QuillComponent/QuillComponent"

const Template1 = ({ id, handleInputChange, formData, handleMediaInputChange, selectedMedia, isEdit = false,  handleTemplateDelete }) => {
    const templateFields = isEdit ? formData : (formData.templateFields[id] && formData.templateFields[id].Template1 ? formData.templateFields[id].Template1 : {});
    const titleFieldId = `case-block-title-${id}`;
    const titleValue = templateFields[titleFieldId] || '';
    const descFieldId = `case-block-text-${id}`;
    const descValue = templateFields[descFieldId] || '';
    //templateFields['case-block-sectionId'] = id;

    return (
        <div className={`${styles['admin-tmp-row']} ${styles['admin-tmp1']}`}>
            <h4>Template 1 Fields</h4>
            <div className={`${styles['admin-tmp-wrap']} ps-rel`}>
                <a href="#" onClick={(e) => handleTemplateDelete(e,id)} className={`${styles['btn-delete']}`}>Delete Section</a>
                <ImageUploadBlock
                    sectionTitle="Image"
                    inputID={`case-block-img-${id}`}
                    allowedFormats=".jpeg, .jpg, .png, .webp"
                    handleMediaInputChange={handleMediaInputChange}
                    selectedMedia={selectedMedia}
                    template="Template1"
                    sectionID={id}
                />
                <TitleBlock
                    sectionTitle="Section Title"
                    sectionTitleVal={titleValue}
                    inputID={titleFieldId}
                    inputPlaceholder="Add your title here..."
                    onChange={(event) => handleInputChange(titleFieldId, event.target.value, id, 'Template1')}
                />
                <QuillComponent
                    value={descValue}
                    id={descFieldId}
                    name={`case-block-text-${id}`}
                    onChange={(event) => handleInputChange(descFieldId, event, id, 'Template1')}
                />
            </div>
        </div>
    )
}

export default Template1;