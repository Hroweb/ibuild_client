import styles from "@/components/(Admin)/RightBar/RightBar.module.scss"
import ImageUploadBlock from "@/components/(Admin)/CaseSingle/ImageUploadBlock"
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock"
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock"

const Template1 = ({ id, handleInputChange, formData, handleMediaInputChange, selectedMedia, isEdit = false }) => {
    /*console.log(id);
    console.log(title);
    console.log(formData.templateFields);*/
    const templateFields = isEdit ? formData : (formData.templateFields[id] && formData.templateFields[id].Template1 ? formData.templateFields[id].Template1 : {});
    //console.log(templateFields);
    const titleFieldId = `case-block-title-${id}`;
    const titleValue = templateFields[titleFieldId] || '';
    const descFieldId = `case-block-text-${id}`;
    const descValue = templateFields[descFieldId] || '';
    //templateFields['case-block-sectionId'] = id;
    console.log(selectedMedia);


    return (
        <div className={`${styles['admin-tmp-row']} ${styles['admin-tmp1']}`}>
            <h4>Template 1 Fields</h4>
            <div className={`${styles['admin-tmp-wrap']}`}>
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
                <DescBlock 
                    sectionTitle="Section Description"
                    sectionTitleVal={descValue}
                    inputID={descFieldId}
                    inputName={`case-block-text-${id}`}
                    onChange={(event) => handleInputChange(descFieldId, event.target.value, id, 'Template1')}
                />
            </div>
        </div>
    )
}

export default Template1;