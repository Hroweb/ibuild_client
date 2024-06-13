import { useState } from 'react';

export const UseFormCases = (formData, setFormData, selectedMedia, setSelectedMedia, errorMessage, setErrorMessage) => {
    const handleMediaInputChangeOld = (inputID, file, template) => {
        const allowedTypes = ['.jpeg', '.jpg', '.png']
        const allowedSize = 1024 * 1024 * 10; // 10 MB

        // Check if the file meets the validation criteria
        /*if (file.size > allowedSize || !allowedTypes.some(type => file.type.startsWith(type))) {
            // Set error message if file validation fails
            const errors = { ...errorMessage };
            errors[fieldId] = 'Invalid file type or size.';
            setErrorMessage(errors);
            return;
        }*/

        setSelectedMedia(prevSelectedMedia => ({
            ...prevSelectedMedia,
            [inputID]: file,
        }));
    
        const reader = new FileReader();
        reader.onload = (event) => {
            const previewUrl = event.target.result;
            // Update the UI or do any additional processing with the preview URL
        };
        reader.readAsDataURL(file);
    };

    const handleMediaInputChange = (inputID, file, templateKey, sectionId) => {
        setSelectedMedia(prevSelectedMedia => ({
            ...prevSelectedMedia,
            [inputID]: file,
        }));

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;

            // Update formData to include image URL
            setFormData(prevFormData => {
                let updatedFormData = { ...prevFormData };
                if (!updatedFormData.templateFields[sectionId]) {
                    updatedFormData.templateFields[sectionId] = {};
                }
                if (!updatedFormData.templateFields[sectionId][templateKey]) {
                    updatedFormData.templateFields[sectionId][templateKey] = {};
                }
                updatedFormData.templateFields[sectionId][templateKey][inputID] = file;

                return updatedFormData;
            });
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (fieldId, value, sectionId, templateKey) => {
        // Update formData state to reflect changes in deeply nested templateFields
        setFormData(prevFormData => {
            // Clone previous state to maintain immutability
            let updatedFormData = prevFormData;

            // Ensure the structure exists for this section and templateKey
            if (!updatedFormData.templateFields[sectionId]) {
                updatedFormData.templateFields[sectionId] = {};
            }
            if (!updatedFormData.templateFields[sectionId][templateKey]) {
                updatedFormData.templateFields[sectionId][templateKey] = {};
            }

            // Update the specific field within the nested structure
            updatedFormData.templateFields[sectionId][templateKey][fieldId] = value;
            return updatedFormData;
        });
    };

    // Return only the part of the hook you're focusing on for simplicity
    return { handleInputChange, handleMediaInputChange };
};