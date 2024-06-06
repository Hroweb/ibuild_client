import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {useCallback, useState} from 'react';
import EventLogoCol from "@/components/(Admin)/EventLogoCol/EventLogoCol";
import {showConfirmAlert, showErrorAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {deleteEventLogo, updateEventLogos} from "@/utils/api/(admin)/post";

const TabContent = ({ data }) => {
    const logos = data?.logos?.data || [];
    const [formData, setFormData] = useState({
        logos: logos.map((logo) => ({
            id: logo.id,
            title: logo.title ?? '',
            logo: logo.logo ?? '',
        }))
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = useCallback((index, field, value) => {
        setFormData((prevFormData) => {
            const updatedLogos = [...prevFormData.logos];
            updatedLogos[index] = {
                ...updatedLogos[index],
                [field]: value,
            };
            return { ...prevFormData, logos: updatedLogos };
        });
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const isEmptyFieldPresent = formData.logos.some(logos => {
            return !logos.title.trim() || !logos.logo;
        });

        if (isEmptyFieldPresent) {
            // Alert or handle the error in a user-friendly manner
            showErrorAlert('Please fill in all fields and select files before submitting');
            return; // Stop the form submission
        }
        // Prepare the formData to be sent
        const submissionData = new FormData();
        formData.logos.forEach((item, index) => {
            Object.keys(item).forEach((key) => {
                if ((key === 'logo') && !(item[key] instanceof File)) {
                    // If no file has been selected for logo, skip this iteration
                    return;
                }
                if (typeof item[key] === 'object' && item[key] instanceof File) {
                    submissionData.append(`logos[${index}][${key}]`, item[key], item[key].name);
                } else {
                    submissionData.append(`logos[${index}][${key}]`, item[key]);
                }
            });
        });
        // TODO: Make API call with submissionData
        try {
            const result = await updateEventLogos(submissionData);
            if(result.ok){
                    showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }, [formData]);

    const handleDeleteLogo = (logoId) => {
        showConfirmAlert().then((result) => {
            if (result) {
                proceedWithDelete(logoId).then(r => '');
            }
        });
    };

    const proceedWithDelete = async (id) =>{
        try {
            const result = await deleteEventLogo(id);
            if (result.ok) {
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    return (
        <>
            <div className={`${styles['admin-logos-row']} fx fx-jb fx-wrap`}>
                {formData.logos.map((item, index) => (
                    <EventLogoCol
                        key={index}
                        eventID={`event-name-${item.id}`}
                        eventName={item.title}
                        logoSrc={item.logo}
                        handleInputChange={handleInputChange}
                        index={index}
                        handleDelete={() => handleDeleteLogo(item.id)}
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
    )
}

export default TabContent