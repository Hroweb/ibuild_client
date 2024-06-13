import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import ProcessItem from "@/components/(Admin)/ProcessItem/ProcessItem"
import { useState, useCallback } from "react";
import {showErrorAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {updateProcesses} from "@/utils/api/(admin)/post";


const TabContent = ({ data }) => {
    const processes = data?.process?.data || [];

    const [formData, setFormData] = useState({
        processes: processes.map((process) => ({
            id: process.id,
            title: process.title ?? '',
            description: process.description ?? '',
            main_photo: process.main_photo ?? '',
            hover_photo: process.hover_photo ?? '',
        }))
    });

    const handleInputChange = useCallback((index, field, value) => {
        setFormData((prevFormData) => {
            const updatedProcesses = [...prevFormData.processes];
            updatedProcesses[index] = {
                ...updatedProcesses[index],
                [field]: value,
            };
            return { ...prevFormData, processes: updatedProcesses };
        });
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const isEmptyFieldPresent = formData.processes.some(process => {
            return !process.title.trim() || !process.description.trim() || !process.main_photo || !process.hover_photo;
        });

        if (isEmptyFieldPresent) {
            // Alert or handle the error in a user-friendly manner
            showErrorAlert('Please fill in all fields and select files before submitting');
            return; // Stop the form submission
        }
        // Prepare the formData to be sent
        const submissionData = new FormData();
        formData.processes.forEach((process, index) => {
            Object.keys(process).forEach((key) => {
                if ((key === 'main_photo' || key === 'hover_photo') && !(process[key] instanceof File)) {
                    // If no file has been selected for main_photo or hover_photo, skip this iteration
                    return;
                }
                if (typeof process[key] === 'object' && process[key] instanceof File) {
                    submissionData.append(`processes[${index}][${key}]`, process[key], process[key].name);
                } else {
                    submissionData.append(`processes[${index}][${key}]`, process[key]);
                }
            });
        });
        // TODO: Make API call with submissionData
        for (const value of submissionData.values()) {
            console.log(value);
        }
        try {
            const result = await updateProcesses(submissionData);
            if(result.ok){
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }, [formData]);

    return (
        <>
            <div className={`${styles['admin-tabs-content']} ${styles['admin-tabs-content-prc']}`}>
                {formData.processes.map((process, index) => (
                    <ProcessItem
                        key={index}
                        titleLabel="Title"
                        titleVal={process.title}
                        titleInputID={`prc-item-${process.id}`}
                        titleInpPlaceholder="Add your title here"
                        descLabel="Description"
                        descVal={process.description}
                        descInpID={`prc-desc-${process.id}`}
                        imageFile1={process.main_photo}
                        imageFile2={process.hover_photo}
                        index={index}
                        handleInputChange={handleInputChange}
                    />
                ))}
            </div>
            <div className={styles['admin-btn-row']}>
                <button 
                    type="submit" 
                    className="btn-primary" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Apply changes'}
                </button>
            </div>
        </>
    );
};

export default TabContent;