import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
//import Template1 from '@/components/(Admin)/RightBar/portfolio/templates/Template1';
import {useEffect, useState} from "react";
import {UseFormCases} from "@/hooks/admin/useFormCases";
import {findValueByPrefix, showConfirmAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {
    Template1,
    Template2,
    Template3,
    Template4,
    Template5,
    Template6, Template7
} from "@/components/(Admin)/RightBar/portfolio/templates";
import {deleteTemplate} from "@/utils/api/(admin)/post";

//import {Template3} from "@/components/(Admin)/RightBar/portfolio/templates";

const CaseBlocks = ({ templateData, structuredData, updateTemplates }) => {
    const [formData, setFormData] = useState({
        templateFields: {},
    });

    let tempImg = '';
    useEffect(() => {
        // Only update internal state if the incoming data is different from the current state
        // This prevents overriding local changes unnecessarily
        if (JSON.stringify(structuredData.templateFields) !== JSON.stringify(formData.templateFields)) {
            Object.keys(structuredData.templateFields).forEach(uuid => {
                Object.keys(structuredData.templateFields[uuid]).forEach(templateType => {
                    Object.keys(structuredData.templateFields[uuid][templateType]).forEach(fieldId => {
                        const fieldValue = structuredData.templateFields[uuid][templateType][fieldId];
                        if (!/(img|gif|json)/i.test(fieldId)) {
                            tempImg = fieldValue;
                        }
                    });
                });
            });
            setFormData({ templateFields: structuredData.templateFields });
        }
    }, [formData, structuredData.templateFields]);

    const [selectedMedia, setSelectedMedia] = useState(null);
    const { handleInputChange, handleMediaInputChange } = UseFormCases(formData, setFormData, selectedMedia, setSelectedMedia);

    const handleInputChangeWrapper = (fieldId, value, sectionId, templateKey) => {
        handleInputChange(fieldId, value, sectionId, templateKey);
        updateTemplates(formData.templateFields);
    };

    const handleMediaInputChangeWrapper = (inputID, file, sectionId, templateKey) => {
        /*if (file) {
            handleMediaInputChange(inputID, file, templateKey, sectionId);
            // Update only if file is provided
            updateTemplates(formData.templateFields);
        } else {
            console.log("No file chosen for", inputID);
        }*/
        handleMediaInputChange(inputID, file, templateKey, sectionId);
        updateTemplates(formData.templateFields);
    };

    const handleTemplateDelete = (e,templateId) => {
        e.preventDefault()
        showConfirmAlert().then((result) => {
            if (result) {
                proceedWithDelete(templateId).then(r => '');
            }
        });
    };

    const proceedWithDelete = async (templateId) => {
        try {
            const result = await deleteTemplate(templateId);
            if(result.ok){
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            return;
        }
    }

    const renderTemplate = (uuid, templateType) => {
        const templateProp = templateData?.templateFields?.[uuid]?.[templateType];
        const templateProps = structuredData?.templateFields?.[uuid]?.[templateType];
        switch (templateType) {
            case 'Template1':
                const findImageUrl = findValueByPrefix(templateProp, 'case-block-img');
                const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${findImageUrl}`;
                //console.log(templateProps)
                return <Template1
                    key={uuid}
                    id={uuid}
                    handleInputChange={handleInputChangeWrapper}
                    handleMediaInputChange={handleMediaInputChangeWrapper}
                    formData={templateProps}
                    selectedMedia={imageUrl}
                    isEdit={true}
                    handleTemplateDelete={handleTemplateDelete}
                />;
                //break;
            case 'Template2':
                const findGifUrl = findValueByPrefix(templateProp, 'case-block-gif');
                const gifUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${findGifUrl}`;
                return <Template2
                    key={uuid}
                    id={uuid}
                    handleInputChange={handleInputChangeWrapper}
                    handleMediaInputChange={handleMediaInputChangeWrapper}
                    formData={templateProps}
                    selectedMedia={gifUrl}
                    isEdit={true}
                    handleTemplateDelete={handleTemplateDelete}
                />;
                //break;
            case 'Template3':
                const findImagesT3 = findValueByPrefix(templateProp, 'case-bl-img');
                const imagesT3 = (findImagesT3 && findImagesT3.length > 0) ? findImagesT3 : selectedMedia;
                return <Template3
                    key={uuid}
                    id={uuid}
                    handleInputChange={handleInputChangeWrapper}
                    handleMediaInputChange={handleMediaInputChangeWrapper}
                    formData={templateProps}
                    selectedMedia={imagesT3}
                    isEdit={true}
                    handleTemplateDelete={handleTemplateDelete}
                />;
                //break;
            case 'Template4':
                const findImagesT4 = findValueByPrefix(templateProp, 'case-col-img');
                const imagesT4 = (findImagesT4 && findImagesT4.length > 0) ? findImagesT4 : selectedMedia;
                return <Template4
                    key={uuid}
                    id={uuid}
                    handleInputChange={handleInputChangeWrapper}
                    handleMediaInputChange={handleMediaInputChangeWrapper}
                    formData={templateProps}
                    selectedMedia={imagesT4}
                    isEdit={true}
                    handleTemplateDelete={handleTemplateDelete}
                />;
            case 'Template5':
                const findImageT5 = findValueByPrefix(templateProp, 'case-block-f-img');
                const imageT5 = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${findImageT5}`;
                return <Template5
                    key={uuid}
                    id={uuid}
                    handleMediaInputChange={handleMediaInputChangeWrapper}
                    selectedMedia={imageT5}
                    isEdit={true}
                    handleTemplateDelete={handleTemplateDelete}
                />;
            case 'Template6':
                const findImagesT6 = findValueByPrefix(templateProp, 'case-2col-img');
                const imagesT6 = (findImagesT6 && findImagesT6.length > 0) ? findImagesT6 : selectedMedia;
                return <Template6
                    key={uuid}
                    id={uuid}
                    handleMediaInputChange={handleMediaInputChangeWrapper}
                    selectedMedia={imagesT6}
                    isEdit={true}
                    handleTemplateDelete={handleTemplateDelete}
                />;
            case 'Template7':
                const findImageT7 = findValueByPrefix(templateProp, 'case-block-alt-img');
                const imageT7 = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${findImageT7}`;
                return <Template7
                    key={uuid}
                    id={uuid}
                    handleInputChange={handleInputChangeWrapper}
                    handleMediaInputChange={handleMediaInputChangeWrapper}
                    formData={templateProps}
                    selectedMedia={imageT7}
                    isEdit={true}
                    handleTemplateDelete={handleTemplateDelete}
                />;
            // Add cases for other template types as needed
            default:
                return null;
        }
    };

    if (!formData.templateFields || Object.keys(formData.templateFields).length === 0) {
        return null; // If formData is still initializing or empty, return nothing
    }

    // Render templates dynamically based on the structured formData
    return (
        <>
            {Object.entries(formData.templateFields).map(([templateType, uuids]) =>
                Object.keys(uuids).map(uuid => renderTemplate(templateType, uuid))
            )}
        </>
    );
}

export default CaseBlocks;