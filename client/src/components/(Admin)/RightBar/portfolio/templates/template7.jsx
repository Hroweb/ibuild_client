import styles from "@/components/(Admin)/RightBar/RightBar.module.scss"
import ImageUploadBlock from "@/components/(Admin)/CaseSingle/ImageUploadBlock"
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock"
import QuillComponent from "@/components/(Admin)/QuillComponent/QuillComponent";

const Template7 = ({ id, handleInputChange, formData, handleMediaInputChange, selectedMedia, isEdit = false, handleTemplateDelete }) => {
    //const templateFields = formData.templateFields[id]?.Template7 || {};
    const templateFields = isEdit ? formData : (formData.templateFields[id] && formData.templateFields[id].Template7 ? formData.templateFields[id].Template7 : {});
    const titleFieldId1 = `case-block-alt-title-${id}`;
    const titleValue1 = templateFields[titleFieldId1] || '';
    const titleFieldId2 = `case-block-title-${id}`;
    const titleValue2 = templateFields[titleFieldId2] || '';
    const descFieldId = `case-block-alt-text-${id}`;
    const descValue = templateFields[descFieldId] || '';
    return (
        <div className={`${styles['admin-tmp-row']} ${styles['admin-tmp-alt']}`}>
            <h4>Template 7 Fields</h4>
            <div className={`${styles['admin-tmp-wrap']} ps-rel`}>
                <a href="#" onClick={(e) => handleTemplateDelete(e,id)} className={`${styles['btn-delete']}`}>Delete Section</a>
                <TitleBlock 
                    sectionTitle="Alternative Option Title"
                    sectionTitleVal={titleValue1}
                    inputID={titleFieldId1}
                    inputPlaceholder="Add your alternative title here..."
                    onChange={(event) => handleInputChange(titleFieldId1, event.target.value, id, 'Template7')}
                />
                <ImageUploadBlock 
                    sectionTitle="Image"
                    inputID={`case-block-alt-img-${id}`}
                    allowedFormats=".jpeg, .jpg, .png, .webp"
                    handleMediaInputChange={handleMediaInputChange}
                    selectedMedia={selectedMedia}
                    template="Template7"
                    sectionID={id}
                />
                <TitleBlock 
                    sectionTitle="Section Title"
                    sectionTitleVal={titleValue2}
                    inputID={titleFieldId2}
                    inputPlaceholder="Add your title here..."
                    onChange={(event) => handleInputChange(titleFieldId2, event.target.value, id, 'Template7')}
                />
                <QuillComponent
                    value={descValue}
                    id={descFieldId}
                    name={descFieldId}
                    onChange={(event) => handleInputChange(descFieldId, event, id, 'Template7')}
                />
            </div>
        </div>
    )
}

export default Template7;