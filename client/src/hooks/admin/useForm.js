// Define a custom hook to manage form data
import {useState} from 'react';

export const UseForm = (initialData, initialMedia = false) => {
    const [formData, setFormData] = useState(initialData || []);
    const [selectedMedia, setSelectedMedia] = useState(initialMedia);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (fieldId, value, subType, media = false) => {
        if (!media) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [subType]: {
                    ...prevFormData[subType],
                    [fieldId]: value,
                },
            }));
        } else {
            const files = Array.from(media.file.target.files);
            const allowedTypes = media.accept;
            const allowedSize = media.size;

            // Filter out files that are not images or JSON files or exceed the allowed size
            const validImages = files.filter(file =>
                allowedTypes.includes(file.type) && file.size <= allowedSize && file.type.startsWith('image/')
            );

            const validJSON = files.filter(file =>
                allowedTypes.includes(file.type) && file.size <= allowedSize && file.type === 'application/json'
            );

            const validVideos = files.filter(file =>
                allowedTypes.includes(file.type) && file.type === 'video/mp4'
            );

            // Set error message if file validation fails
            const errors = {...errorMessage};

            if (files.length === 0) {
                errors[fieldId] = 'No file selected.';
            } else if (validImages.length === 0 && validJSON.length === 0 && validVideos.length === 0) {
                errors[fieldId] = 'Invalid file type or size.';
            } else {
                errors[fieldId] = '';
                //delete errors[fieldId]; // Clear error message

                // Generate preview URLs for valid images
                const imagePreviews = validImages.map(file => ({
                    file,
                    preview: URL.createObjectURL(file)
                }));

                // Generate preview for valid mp4 videos
                const videoPreviews = validVideos.map(file => ({
                    file,
                    preview: URL.createObjectURL(file)
                }));

                setFormData(prevFormData => ({
                    ...prevFormData,
                    selectedFiles: {
                        ...prevFormData.selectedFiles,
                        [fieldId]: {
                            type: subType, // Add 'type' as part of the object under [fieldId]
                            file: validImages.length > 0 ? imagePreviews[0].file :
                                validVideos.length > 0 ? videoPreviews[0].file :
                                    validJSON.length > 0 ? validJSON[0] : null,
                            preview: validImages.length > 0 ? imagePreviews[0].preview :
                                validVideos.length > 0 ? videoPreviews[0].preview :
                                    null, // No preview for JSON
                        },
                    },
                }));

                // Update selectedMedia state
                setSelectedMedia(prevSelectedMedia => ({
                    ...prevSelectedMedia,

                    [subType]: {
                        ...prevSelectedMedia[subType],
                        [fieldId]: validImages.length > 0 ? imagePreviews[0] :
                            validVideos.length > 0 ? videoPreviews[0] :
                                validJSON.length > 0 ? validJSON[0].name : null,
                    },
                }));
            }
            setErrorMessage(errors);
        }
    };

    const handleInputChangeAna = (fieldId, value, media = false, index = null) => {
        if (!media) {
            // Handle non-media input changes
            setFormData(prevFormData => {
                if (index !== null && Array.isArray(prevFormData.processes)) {
                    const updatedProcesses = prevFormData.processes.map((process, i) => {
                        if (i === index) {
                            return {
                                ...process,
                                [fieldId]: value
                            };
                        }
                        return process;
                    });
                    return {
                        ...prevFormData,
                        processes: updatedProcesses
                    };
                } else {
                    return {
                        ...prevFormData,
                        [fieldId]: value
                    };
                }
            });
        } else {
            // Handle media file uploads
            const updatedMedia = {
                ...selectedMedia,
                [fieldId]: value.preview // Assuming 'preview' contains the preview URL
            };
            setSelectedMedia(updatedMedia);
    
            // Update process.main_photo in formData
            setFormData(prevFormData => ({
                ...prevFormData,
                processes: prevFormData.processes.map((process, i) => {
                    if (i === index) {
                        return {
                            ...process,
                            main_photo: value // Assuming 'value' contains the new file data
                        };
                    }
                    return process;
                })
            }));
        }
    };

    const handleSubmita = async (event, onSubmitCallback) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Create a FormData object
        const submissionData = new FormData();

        // Append text fields from formData state
        Object.entries(formData).forEach(([key, value]) => {
            submissionData.append(key, value);
        });
        Object.entries(selectedMedia).forEach(([key, value]) => {
            if (value && value.file) { // Check if there's a file to append
                submissionData.append(key, value.file);
            }
        });
        try {
            const response = await onSubmitCallback(submissionData);

            // Handle the response
            if (response.ok) {
                // Success logic here, e.g., clearing the form or showing a success message
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Failed to submit form');
        }
    };

    const handleSubmit = async (event, onSubmitCallback) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Create a FormData object
        const submissionData = new FormData();
        // Append text fields from formData state
        Object.entries(formData).forEach(([subType, values]) => {
            Object.entries(values).forEach(([key, value]) => {
                const namespacedKey = `${subType}_${key}`; // e.g., meta_meta_description
                if(subType === 'selectedFiles'){
                    Object.entries(value).forEach(([fileKey, fileValue]) => {
                        if (fileKey === 'file') { // Check if there's a file to append
                            submissionData.append(`${subType}_${value.type}_${key}`, fileValue);
                        }
                    });
                } else {
                    submissionData.append(namespacedKey, value);
                }
            });
        });

        try {
            return await onSubmitCallback(submissionData);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Failed to submit form');
        }
    };

    const updateFormData = (data) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleUniqueChange = (fieldId, value, media = false) => {
        if (!media) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [fieldId]: value,
            }));
        } else {
            //if(media.file){
                const files = Array.from(media.file.target.files);
                const allowedTypes = media.accept;
                const allowedSize = media.size;

                // Filter out files that are not images or JSON files or exceed the allowed size
                const validImages = files.filter(file =>
                    allowedTypes.includes(file.type) && file.size <= allowedSize && file.type.startsWith('image/')
                );

                const validJSON = files.filter(file =>
                    allowedTypes.includes(file.type) && file.size <= allowedSize && file.type === 'application/json'
                );

                const validVideos = files.filter(file =>
                    allowedTypes.includes(file.type) && file.type === 'video/mp4'
                );

                // Set error message if file validation fails
                const errors = {...errorMessage};

                if (files.length === 0) {
                    errors[fieldId] = 'No file selected.';
                } else if (validImages.length === 0 && validJSON.length === 0 && validVideos.length === 0) {
                    errors[fieldId] = 'Invalid file type or size.';
                } else {
                    errors[fieldId] = '';
                    //delete errors[fieldId]; // Clear error message

                    // Generate preview URLs for valid images
                    const imagePreviews = validImages.map(file => ({
                        file,
                        preview: URL.createObjectURL(file)
                    }));

                    // Generate preview for valid mp4 videos
                    const videoPreviews = validVideos.map(file => ({
                        file,
                        preview: URL.createObjectURL(file)
                    }));

                    // Update selectedFiles array with valid images and their previews or JSON files and their names
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        selectedFiles: {
                            ...prevFormData.selectedFiles,
                            [fieldId]: validImages.length > 0 ? imagePreviews[0] :
                                validVideos.length > 0 ? videoPreviews[0] :
                                    validJSON.length > 0 ? validJSON[0] : null,
                        },
                    }));

                    // Update selectedMedia state
                    setSelectedMedia(prevSelectedMedia => ({
                        ...prevSelectedMedia,
                        [fieldId]: validImages.length > 0 ? imagePreviews[0] :
                            validVideos.length > 0 ? videoPreviews[0] :
                                validJSON.length > 0 ? validJSON[0].name : null,
                    }));
                }
                setErrorMessage(errors);
            //}
            
        }
    };

    const handleUniqueSubmit = async (event, onSubmitCallback) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Create a FormData object
        const submissionData = new FormData();

        // Append text fields from formData state
        Object.entries(formData).forEach(([key, value]) => {
            if(key === 'selectedFiles'){
                Object.entries(value).forEach(([k, v]) => {
                    if (v && v.file) { // Check if there's a file to append
                        submissionData.append(k, v.file);
                    }
                })
            }else{
                submissionData.append(key, value);
            }
        });
        try {
            return await onSubmitCallback(submissionData);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Failed to submit form');
        }
    };

    return { formData, selectedMedia, errorMessage, handleInputChange, handleSubmit, updateFormData, handleUniqueChange, handleUniqueSubmit };
};
