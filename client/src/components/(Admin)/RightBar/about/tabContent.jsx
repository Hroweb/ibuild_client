import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {UseForm} from "@/hooks/admin/useForm";
import {useState} from 'react';
import {Tab1, Tab2, Tab3, Tab4, Tab5, Tab6, Tab7, Tab8} from "@/components/(Admin)/RightBar/about/tabs";
import {handleApiError, showErrorAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {updatePageData} from "@/utils/api/(admin)/post";

const TabContent = ({data,activeTab}) => {
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
            'cp_title': pageMeta?.banner?.cp_title?.meta_value ?? '',
            'cp_video_link': pageMeta?.banner?.cp_video_link?.meta_value ?? '',
        },
        intro: {
            'cp_intro_title': pageMeta?.intro?.cp_intro_title?.meta_value ?? '',
            'cp_intro_text': pageMeta?.intro?.cp_intro_text?.meta_value ?? '',
        },
        process: {
            'cp_pc_title': pageMeta?.process?.cp_pc_title?.meta_value ?? '',
            'cp_pc_text': pageMeta?.process?.cp_pc_text?.meta_value ?? '',
        },
        grow: {
            'cp_gr_title_1': pageMeta?.grow?.cp_gr_title_1?.meta_value ?? '',
            'cp_gr_title_2': pageMeta?.grow?.cp_gr_title_2?.meta_value ?? '',
            'cp_grow_1_title': pageMeta?.grow?.cp_grow_1_title?.meta_value ?? '',
            'cp_grow_1_text': pageMeta?.grow?.cp_grow_1_text?.meta_value ?? '',
            'cp_grow_2_title': pageMeta?.grow?.cp_grow_2_title?.meta_value ?? '',
            'cp_grow_2_text': pageMeta?.grow?.cp_grow_2_text?.meta_value ?? '',
            'cp_grow_3_title': pageMeta?.grow?.cp_grow_3_title?.meta_value ?? '',
            'cp_grow_3_text': pageMeta?.grow?.cp_grow_3_text?.meta_value ?? '',
            'grow_btn': pageMeta?.grow?.grow_btn?.meta_value ?? '',
        },
        gallery: {
            'cp_gal_title': pageMeta?.gallery?.cp_gal_title?.meta_value ?? '',
            'cp_gal_text': pageMeta?.gallery?.cp_gal_text?.meta_value ?? '',
        },
        team: {
            'cp_team_title': pageMeta?.team?.cp_team_title?.meta_value ?? '',
            'cp_team_text': pageMeta?.team?.cp_team_text?.meta_value ?? '',
        },
        clients: {
            'cp_cl_title': pageMeta?.clients?.cp_cl_title?.meta_value ?? '',
            'cp_cl_text': pageMeta?.clients?.cp_cl_text?.meta_value ?? '',
        }
    };

    // formData for images,aka box icons and banner
    const initialMediaData = {
        banner: {
            'banner': pageMeta?.banner?.banner?.meta_value ?? null,
        },
        grow: {
            'box1_icon': pageMeta?.grow?.box1_icon?.meta_value ?? null,
            'box2_icon': pageMeta?.grow?.box2_icon?.meta_value ?? null,
            'box3_icon': pageMeta?.grow?.box3_icon?.meta_value ?? null,
        },
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
            console.error('i am here', error);
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
            tabContent = <Tab3 formData={formData.intro} handleInputChange={handleInputChange} subType={`intro`} />;
            break;
        case 'tab4':
            tabContent = <Tab4 formData={formData.process} handleInputChange={handleInputChange} subType={`process`} />;
            break;
        case 'tab5':
            tabContent = <Tab5 formData={formData.grow} errorMessage={errorMessage} selectedMedia={selectedMedia} handleInputChange={handleInputChange} subType={`grow`} />;
            break;
        case 'tab6':
            tabContent = <Tab6 formData={formData.gallery} handleInputChange={handleInputChange} subType={`gallery`} />;
            break;
        case 'tab7':
            tabContent = <Tab7 formData={formData.team} handleInputChange={handleInputChange} subType={`team`} />;
            break;
        case 'tab8':
            tabContent = <Tab8 formData={formData.clients} handleInputChange={handleInputChange} subType={`clients`} />;
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