import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {UseForm} from "@/hooks/admin/useForm";
import {useState} from 'react';
import {Tab1, Tab2, Tab3, Tab4, Tab5, Tab6, Tab7} from "@/components/(Admin)/RightBar/home/tabs";
import {handleApiError, showSuccessAlert} from "@/hooks/admin/helpers";
import {updatePageData} from "@/utils/api/(admin)/post";


const TabContent = ({data, activeTab}) => {
    const pageMeta = data?.pageData?.pageMeta;
    const pageID = data?.pageData?.id || null;
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
            'banner_section_desc': pageMeta?.banner?.banner_section_desc?.meta_value ?? '',
            'banner_section_title': pageMeta?.banner?.banner_section_title?.meta_value ?? '',
            'clients_worldwide': pageMeta?.banner?.clients_worldwide?.meta_value ?? '',
            'projects_finished': pageMeta?.banner?.projects_finished?.meta_value ?? '',
            'years_of_experience': pageMeta?.banner?.years_of_experience?.meta_value ?? '',
        },
        projects: {
            'projects_title': pageMeta?.projects?.projects_title?.meta_value ?? '',
            'projects_desc': pageMeta?.projects?.projects_desc?.meta_value ?? '',
            'projects_btn': pageMeta?.projects?.projects_btn?.meta_value ?? '',
        },
        services: {
            'services_title': pageMeta?.services?.services_title?.meta_value ?? '',
            'services_desc': pageMeta?.services?.services_desc?.meta_value ?? '',
            'services_btn': pageMeta?.services?.services_btn?.meta_value ?? '',
        },
        blog: {
            'blog_title': pageMeta?.blog?.blog_title?.meta_value ?? '',
            'blog_desc': pageMeta?.blog?.blog_desc?.meta_value ?? '',
            'blog_btn': pageMeta?.blog?.blog_btn?.meta_value ?? '',
        },
        clients: {
            'clients_title': pageMeta?.clients?.clients_title?.meta_value ?? '',
            'clients_desc': pageMeta?.clients?.clients_desc?.meta_value ?? '',
        },
    };
    const initialMediaData = {
        banner: {
            'banner_animation': pageMeta?.banner?.banner_animation?.meta_value ?? null,
        },
        video: {
            'video': pageMeta?.video?.video?.meta_value ?? null,
            'poster': pageMeta?.video?.poster?.meta_value ?? null
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
            tabContent = <Tab3 formData={formData} errorMessage={errorMessage} selectedMedia={selectedMedia} handleInputChange={handleInputChange} subType={`video`} />;
            break;
        case 'tab4':
            tabContent = <Tab4 formData={formData.projects} handleInputChange={handleInputChange} subType={`projects`} />;
            break;
        case 'tab5':
            tabContent = <Tab5 formData={formData.services} handleInputChange={handleInputChange} subType={`services`} />;
            break;
        case 'tab6':
            tabContent = <Tab6 formData={formData.blog} handleInputChange={handleInputChange} subType={`blog`} />;
            break;
        case 'tab7':
            tabContent = <Tab7 formData={formData.clients} handleInputChange={handleInputChange} subType={`clients`} />;
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