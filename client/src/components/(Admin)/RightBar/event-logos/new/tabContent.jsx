import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import ImageBlock from "@/components/(Admin)/ImageBlock/ImageBlock";
import {UseForm} from "@/hooks/admin/useForm";
import {useCallback, useState} from "react";
import {showErrorAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {updateEventLogos} from "@/utils/api/(admin)/post";

const TabContent = () => {
    const initialFormData = {
        'title': '',
    }
    const initialMediaData = {
        'logo': '',
    }

    const { formData, selectedMedia, errorMessage, handleUniqueChange, handleUniqueSubmit } = UseForm(initialFormData, initialMediaData);
    formData.isNew = true;
    const logo = selectedMedia.logo.preview ? selectedMedia.logo.preview : '';

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = useCallback(async (formData) => {
        setIsSubmitting(true);
        const isEmptyFieldPresent = (formData.get('title')?.trim() === '') || !selectedMedia.logo;

        if (isEmptyFieldPresent) {
            showErrorAlert('Please fill in all fields and select files before submitting');
            setIsSubmitting(false); // Reset submitting state
            return; // Stop the form submission
        }
        // Submit the form data to the API
        try {
            const response = await updateEventLogos(formData);
            if (response.ok) {
                showSuccessAlert(response.message, true)
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    },[selectedMedia]);

    return (
        <>
            <div className={`${styles['admin-logo-new']}`}>
                <div className={`${styles['admin-logo-new-col']} fx fx-wrap`}>
                    <TitleBlock 
                        sectionTitle=""
                        sectionTitleVal={formData.title}
                        inputID="event-name-new"
                        inputPlaceholder="Add event name here..."
                        onChange={(event) => handleUniqueChange('title', event.target.value)}
                    />
                    <ImageBlock
                        label=""
                        selectedFile={logo}
                        inputID={`event-new`}
                        onChange={(event) => handleUniqueChange('logo', event.target.value, {
                            file: event,
                            accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/svg+xml'],
                            size: 5242880
                        })}
                    />
                </div>
            </div>
            <div className={styles['admin-btn-row']}>
                <button type="submit" className="btn-primary" onClick={(e) => handleUniqueSubmit(e, onSubmit)} disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Add Event'}
                </button>
            </div>
        </>
    )
}

export default TabContent