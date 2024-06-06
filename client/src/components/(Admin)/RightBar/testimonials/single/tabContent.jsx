import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import ImageBlock from "@/components/(Admin)/ImageBlock/ImageBlock";
import {UseForm} from "@/hooks/admin/useForm";
import {useState} from 'react';
//import {postTestimonial} from "@/utils/(admin)/testimonial/api";
import {handleApiError, handleBasicError, showSuccessAlert} from "@/hooks/admin/helpers";
import {storeTestimonial} from "@/utils/api/(admin)/post";

const TabContent = ({data}) => {
    const pageData = data?.pageData || data?.data || [];
    const initialFormData = {
        'name': pageData?.name ?? '',
        'description': pageData?.description ?? '',
        'designation': pageData?.designation ?? '',
        'logo_alt': pageData?.logo_alt ?? ''
    }
    const initialMediaData = {
        'avatar': pageData?.avatar ?? '',
        'logo_src': pageData?.logo_src ?? '',
    }

    if(pageData.id) initialFormData.id = pageData.id;
    const { formData, selectedMedia, errorMessage, handleUniqueChange, handleUniqueSubmit } = UseForm(initialFormData, initialMediaData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const logo = selectedMedia?.logo_src?.preview || (selectedMedia?.logo_src && `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/testimonials/${selectedMedia.logo_src}`);
    const avatar = selectedMedia?.avatar?.preview || (selectedMedia?.avatar && `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/testimonials/${selectedMedia.avatar}`);

    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            const result = await storeTestimonial(formData);
            if(result.ok){
                showSuccessAlert(result.message, result.redirect ?? false);
            }else{
                handleBasicError(result.error);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };


    return (
        <>
            <div className={`${styles['admin-page-wrap']}`}>
                <div className={`${styles['admin-tst-row']}`}>
                    <DescBlock
                        sectionTitle="Testimonial text"
                        sectionTitleVal={formData['description']}
                        inputID="description"
                        inputName="description"
                        onChange={(event) => handleUniqueChange('description', event.target.value)}
                    />
                    <TitleBlock
                        sectionTitle="Client Name"
                        sectionTitleVal={formData['name']}
                        onChange={(event) => handleUniqueChange('name', event.target.value)}
                        inputID="name"
                        inputPlaceholder="Add client name here..."
                    />
                    <TitleBlock
                        sectionTitle="Client Designation"
                        sectionTitleVal={formData['designation']}
                        onChange={(event) => handleUniqueChange('designation', event.target.value)}
                        inputID="designation"
                        inputPlaceholder="Add client designation here..."
                    />
                    <TitleBlock
                        sectionTitle="Logo Alt"
                        sectionTitleVal={formData['logo_alt']}
                        onChange={(event) => handleUniqueChange('logo_alt', event.target.value)}
                        inputID="logo_alt"
                        inputPlaceholder="Add logo alt here..."
                    />
                    <div className={`${styles['admin-fields-2col']} ${styles['admin-tst-img']} fx fx-jb`}>
                        <ImageBlock
                            label="Company logo"
                            selectedFile={logo}
                            inputID={`tst-logo`}
                            imageAlt={formData['logo_alt']}
                            bg="yes"
                            onChange={(event) => handleUniqueChange('logo_src', event.target.value, {
                                file: event,
                                accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/svg+xml'],
                                size: 5242880
                            })}
                        />
                        <ImageBlock
                            label="Client Photo"
                            selectedFile={avatar}
                            inputID={`tst-avatar`}
                            imageAlt={formData['name']}
                            rounded="yes"
                            onChange={(event) => handleUniqueChange('avatar', event.target.value, {
                                file: event,
                                accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/svg+xml'],
                                size: 5242880
                            })}
                        />
                    </div>
                </div>
            </div>
            <div className={`${styles['admin-btn-row']}`}>
                <button 
                    type="submit" 
                    className="btn-primary" 
                    onClick={(e) => handleUniqueSubmit(e, onSubmit)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Apply changes'}
                </button>
            </div>
        </>
    )
}

export default TabContent