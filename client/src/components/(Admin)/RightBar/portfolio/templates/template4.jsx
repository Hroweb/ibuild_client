import styles from "@/components/(Admin)/RightBar/RightBar.module.scss"
import ImageUploadBlock from "@/components/(Admin)/CaseSingle/ImageUploadBlock"
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock"
import QuillComponent from "@/components/(Admin)/QuillComponent/QuillComponent";

const Template4 = ({ id, handleInputChange, formData, handleMediaInputChange, selectedMedia, isEdit = false, handleTemplateDelete }) => {
    const templateFields = isEdit ? formData : (formData.templateFields[id] && formData.templateFields[id].Template4 ? formData.templateFields[id].Template4 : {});
    const titleFieldId1 = `case-block-2colm-title-${id}`;
    const titleValue1 = templateFields[titleFieldId1] || '';
    const descFieldId1 = `case-block-2col-text-${id}`;
    const descValue1 = templateFields[descFieldId1] || '';
    const titleFieldId2 = `case-block-2colm-title2-${id}`;
    const titleValue2 = templateFields[titleFieldId2] || '';
    const descFieldId2 = `case-block-2col-text2-${id}`;
    const descValue2 = templateFields[descFieldId2] || '';
    const colImg1 = selectedMedia?.[0] !== undefined ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${selectedMedia?.[0]}` : null;
    const colImg2 = selectedMedia?.[1] !== undefined ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${selectedMedia?.[1]}` : null;

    return (
        <div className={`${styles['admin-tmp-row']}`}>
            <h4>Template 4 Fields</h4>
            <div className={`${styles['admin-tmp-wrap']} ps-rel`}>
                <a href="#" onClick={(e) => handleTemplateDelete(e,id)} className={`${styles['btn-delete']}`}>Delete Section</a>
                <div className={`${styles['admin-tmp-2colm']} fx fx-jb`}>
                    <div className={`${styles['admin-tmp-col']}`}>
                        <ImageUploadBlock 
                            sectionTitle="Image 1"
                            inputID={`case-col-img-1-${id}`}
                            allowedFormats=".jpeg, .jpg, .png, .webp"
                            handleMediaInputChange={handleMediaInputChange}
                            selectedMedia={colImg1}
                            template="Template4"
                            sectionID={id}
                        />
                        <TitleBlock 
                            sectionTitle="Section Title"
                            sectionTitleVal={titleValue1}
                            inputID={titleFieldId1}
                            inputPlaceholder="Add your title here..."
                            onChange={(event) => handleInputChange(titleFieldId1, event.target.value, id, 'Template4')}
                        />
                        <QuillComponent
                            value={descValue1}
                            id={descFieldId1}
                            name={descFieldId1}
                            onChange={(event) => handleInputChange(descFieldId1, event, id, 'Template4')}
                        />
                    </div>
                    <div className={`${styles['admin-tmp-col']}`}>
                        <ImageUploadBlock 
                            sectionTitle="Image 2"
                            inputID={`case-col-img-2-${id}`}
                            allowedFormats=".jpeg, .jpg, .png, .webp"
                            handleMediaInputChange={handleMediaInputChange}
                            selectedMedia={colImg2}
                            template="Template4"
                            sectionID={id}
                        />
                        <TitleBlock 
                            sectionTitle="Section Title"
                            sectionTitleVal={titleValue2}
                            inputID={titleFieldId2}
                            inputPlaceholder="Add your title here..."
                            onChange={(event) => handleInputChange(titleFieldId2, event.target.value, id, 'Template4')}
                        />
                        <QuillComponent
                            value={descValue2}
                            id={descFieldId2}
                            name={descFieldId2}
                            onChange={(event) => handleInputChange(descFieldId2, event, id, 'Template4')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template4;