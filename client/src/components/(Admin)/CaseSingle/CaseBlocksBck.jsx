import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import Template1 from '@/components/(Admin)/RightBar/portfolio/templates/Template1';
import {useEffect, useState} from "react";
import {UseFormCases} from "@/hooks/admin/useFormCases";
import {findValueByPrefix} from "@/hooks/admin/helpers";

const CaseBlocks = ({ templateData, /*structuredData,*/ updateTemplates }) => {
    const [formData, setFormData] = useState({
        templateFields: {},
    });

    useEffect(() => {
        // Filter template fields to remove strings for images, gifs, and JSON data
        const filteredTemplateFields = {};
        Object.keys(templateData.templateFields).forEach(uuid => {
            filteredTemplateFields[uuid] = {};
            Object.keys(templateData.templateFields[uuid]).forEach(templateType => {
                filteredTemplateFields[uuid][templateType] = {};
                Object.keys(templateData.templateFields[uuid][templateType]).forEach(fieldId => {
                    const fieldValue = templateData.templateFields[uuid][templateType][fieldId];
                    if (!/(img|gif|json)/i.test(fieldId)) {
                        filteredTemplateFields[uuid][templateType][fieldId] = fieldValue;
                    }else{
                        if(typeof fieldValue !== 'string'){
                            filteredTemplateFields[uuid][templateType][fieldId] = fieldValue;
                        }
                    }
                });
            });
        });

        // Only update internal state if the incoming filtered data is different from the current state
        if (JSON.stringify(filteredTemplateFields) !== JSON.stringify(formData.templateFields)) {
            setFormData({ templateFields: filteredTemplateFields });
        }
    }, [formData.templateFields, templateData.templateFields]);

    const [selectedMedia, setSelectedMedia] = useState(null);
    const { handleInputChange, handleMediaInputChange } = UseFormCases(formData, setFormData, selectedMedia, setSelectedMedia);

    const handleInputChangeWrapper = (fieldId, value, sectionId, templateKey) => {
        handleInputChange(fieldId, value, sectionId, templateKey);
        updateTemplates(formData.templateFields);
    };

    const handleMediaInputChangeWrapper = (inputID, file, sectionId, templateKey) => {
        if (file) {
            handleMediaInputChange(inputID, file, templateKey, sectionId);
            // Update only if file is provided
            updateTemplates(formData.templateFields);
        } else {
            console.log("No file chosen for", inputID);
        }
        /*handleMediaInputChange(inputID, file, templateKey, sectionId);
        updateTemplates(templateData.templateFields);*/
    };

    const renderTemplate = (uuid, templateType) => {
        const templateProp = templateData?.templateFields?.[uuid]?.[templateType];
        //const templateProps = structuredData?.templateFields?.[uuid]?.[templateType];
        switch (templateType) {
            case 'Template1':
                const findImageUrl = findValueByPrefix(templateProp, 'case-block-img');
                const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${findImageUrl}`;
                //console.log(templateProp);
                return <Template1
                    key={uuid}
                    id={uuid}
                    handleInputChange={handleInputChangeWrapper}
                    handleMediaInputChange={handleMediaInputChangeWrapper}
                    formData={templateProp}
                    selectedMedia={imageUrl}
                    isEdit={true}
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