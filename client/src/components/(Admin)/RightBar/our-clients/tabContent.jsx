import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {useCallback, useState} from 'react';
import ClientLogoCol from "@/components/(Admin)/ClientLogoCol/ClientLogoCol";
import {showConfirmAlert, showErrorAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {deleteClients, updateClients} from "@/utils/api/(admin)/post";

const TabContent = ({ data }) => {
    const clients = data?.clients?.data || [];
    const [formData, setFormData] = useState({
        logos: clients.map((client) => ({
            id: client.id,
            title: client.title ?? '',
            logo: client.logo ?? '',
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
        /*for (const value of submissionData.values()) {
            console.log(value);
        }*/
        // TODO: Make API call with submissionData
        try {
            const result = await updateClients(submissionData);
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
            const result = await deleteClients(id);
            if (result.ok) {
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    return (
        <>
            <div className={`${styles['admin-tabs-content']}`}>
                <div className={`${styles['admin-clients-row']} fx fx-jb fx-wrap`}>
                    {formData.logos.map((item, index) => (
                        <ClientLogoCol
                            key={index}
                            logoSrc={item.logo}
                            imageAlt={item.title}
                            index={index}
                            handleInputChange={handleInputChange}
                            handleDelete={() => handleDeleteLogo(item.id)}
                        />
                    ))}
                </div>
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