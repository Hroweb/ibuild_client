import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {UseForm} from "@/hooks/admin/useForm";
import {useState} from 'react';
import {Tab1, Tab2, Tab3} from "@/components/(Admin)/RightBar/contact/tabs";
import {handleApiError, showSuccessAlert} from "@/hooks/admin/helpers";
import {updatePageData} from "@/utils/api/(admin)/post";

const TabContent = ({data, activeTab}) => {
    const pageMeta = data?.pageData?.pageMeta;
    const pageID = data?.pageData?.id || false;

    const initialFormData = {
        meta: {
            'meta_description': pageMeta?.meta?.meta_description?.meta_value ?? '',
            'meta_keywords': pageMeta?.meta?.meta_keywords?.meta_value ?? '',
            'og_title': pageMeta?.meta?.og_title?.meta_value ?? '',
            'og_desc': pageMeta?.meta?.og_desc?.meta_value ?? '',
            'og_type': pageMeta?.meta?.og_type?.meta_value ?? '',
            'og_url': pageMeta?.meta?.og_url?.meta_value ?? '',
        },
        banner: {
            'banner_title': pageMeta?.banner?.banner_title?.meta_value ?? '',
            'banner_text': pageMeta?.banner?.banner_text?.meta_value ?? '',
        },
        info: {
            'email': pageMeta?.info?.email?.meta_value ?? '',
            'address': pageMeta?.info?.address?.meta_value ?? '',
            'fb_link': pageMeta?.info?.fb_link?.meta_value ?? '',
            'insta_link': pageMeta?.info?.insta_link?.meta_value ?? '',
            'linkedin_link': pageMeta?.info?.linkedin_link?.meta_value ?? '',
        },
    };
   
    // formData for images,aka box icons and banner
    const initialMediaData = {
        banner: {
            'banner': pageMeta?.banner?.banner?.meta_value ?? '',
        }
    };

    const { formData, selectedMedia, errorMessage, handleInputChange, handleSubmit } = UseForm(initialFormData, initialMediaData);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (formData) => {

        setIsSubmitting(true);

        // Submit the form data to the API
        try {
            const result = await updatePageData(pageID, formData);
            if(result.ok){
                showSuccessAlert(result.message);
            }else{
                handleApiError(result);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    let tabContent;
    switch (activeTab) {
        case 'tab1':
            tabContent = <Tab1 formData={formData.meta} handleInputChange={handleInputChange} subType={`meta`} />;
            break;
        case 'tab2':
            tabContent = <Tab2 formData={formData.banner} errorMessage={errorMessage} selectedMedia={selectedMedia} handleInputChange={handleInputChange} subType={`banner`} />;
            break;
        case 'tab3':
            tabContent = <Tab3 formData={formData.info} handleInputChange={handleInputChange} subType={`info`} />;
            break;
        default:
            tabContent = null;
    }
    
    return (
        <>
            <div className={`${styles['admin-tabs-content']}`}>
                {tabContent}
            </div>
            <div className={styles['admin-btn-row']}>
                <button 
                    type="submit" 
                    className="btn-primary" 
                    onClick={(e) => handleSubmit(e, onSubmit)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Apply changes'}
                </button>
            </div>
        </>

    );
}

export default TabContent