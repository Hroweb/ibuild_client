import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {UseForm} from "@/hooks/admin/useForm";
import {useCallback, useEffect, useState} from "react";
import CaseBannerBlock from '@/components/(Admin)/CaseSingle/BannerBlock'
import PostSEOBlock from "@/components/(Admin)/CaseSingle/PostSEOBlock"
import OverviewBlock from "@/components/(Admin)/CaseSingle/OverviewBlock"
import CaseGallery from "@/components/(Admin)/CaseSingle/CaseGallery"
import CaseThumbs from "@/components/(Admin)/CaseSingle/CaseThumbs";
import CaseCategoryList from "@/components/(Admin)/CaseSingle/CaseCategoryList"
import CaseTestimonial from "@/components/(Admin)/CaseSingle/CaseTestimonial"
import ServicesList from "@/components/(Admin)/CaseSingle/ServicesList"
import FeaturedPostBlock from "@/components/(Admin)/CaseSingle/FeaturedPostBlock"
import AddNewSection from "@/components/(Admin)/CaseSingle/AddNewSection"
import CaseBlocks from "@/components/(Admin)/CaseSingle/CaseBlocks";
import {appendFormData, handleApiError, handleBasicError, showSuccessAlert} from "@/hooks/admin/helpers";
import {deleteEventGallery, storeEvent} from "@/utils/api/(admin)/post";
//import {deleteGalleryImage, postCaseSingle} from "@/utils/(admin)/cases/api";


const TabContent = ({data}) => {
    const pageData = data?.data;
    const categories = data?.categories?.data ?? [];
    const testimonials = data?.testimonials?.data ?? [];
    const attachedTestimonials = pageData?.testimonials ? pageData?.testimonials.map(testimonial => testimonial.id) : [];

    const initialFormData = {
        'id': pageData?.id ?? false,
        'meta_description': pageData?.meta_description ?? '',
        'meta_keywords': pageData?.meta_keywords ?? '',
        'title': pageData?.title ?? '',
        'desc': pageData?.desc ?? '',
        'overview': pageData?.overview ?? '',
        'bannerColor': pageData?.bannerColor ?? '',
        'featured': pageData?.featured ?? '0',
        'chosen': pageData?.chosen ?? '0',
        'services': pageData?.services ? pageData?.services.map(service => service.id) : [],
        'events': pageData?.event_cat ? pageData?.event_cat.map(category => category.id) : [],
        'years': pageData?.event_year ? pageData?.event_year.map(category => category.id) : [],
        'sizes': pageData?.stand_size ? pageData?.stand_size.map(category => category.id) : [],
        'testimonials': attachedTestimonials,
        'gallery': [],
        'thumbs': [],
        'templates': pageData?.templates ?? ''
    }

    const initialMediaData = {
        banner: pageData?.image ?? '',
    }

    const { formData, selectedMedia, errorMessage, handleUniqueChange, handleUniqueSubmit, updateFormData } = UseForm(initialFormData, initialMediaData);
    const banner = selectedMedia.banner.preview || pageData.isNew ? selectedMedia.banner.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio/${pageData.image}`;
    const [galleryData, setGalleryData] = useState(pageData?.gallery);
    const [galImages, setGalImages] = useState({selectedImages: []});
    const [templateData, setTemplateData] = useState({
        templateFields: {},
    });
    const [processedTemplateData, setProcessedTemplateData] = useState({
        templateFields: initialFormData.templates,
    });


    const [thumbsData, setThumbsData] = useState(pageData?.thumbs);
    const [thumbImages, setThumbImages] = useState({selectedImages: []});

    const categoriesFormData = {
        'years': categories?.event_year,
        'sizes': categories?.stand_size,
        'events': categories?.event_cat,
        'attached_years': formData.years,
        'attached_sizes': formData.sizes,
        'attached_events': formData.events,
    };
    const servicesFormData = {
        'all_services': data?.services_full?.data,
        'attached_services': formData.services
    };

    const testimonialFormData = {
        'all_testimonials': testimonials,
        'attached_testimonials': attachedTestimonials,
        'selected_testimonials': formData.testimonials,
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = useCallback(async (formData) => {
        setIsSubmitting(true);
        // Submit the form data to the API
        const submissionData = new FormData();
        formData.forEach((item, index) => {
            switch(index) {
                case 'gallery':
                    galImages.selectedImages.forEach((value, key) => {
                        Object.keys(value).forEach((kk) => {
                            if (typeof value[kk] === 'object' && value[kk] instanceof File) {
                                submissionData.append(`gallery[${key}][${kk}]`, value[kk], value[kk].name);
                            }
                        });
                    });
                    break;
                case 'templates':
                    appendFormData(submissionData, templateData);
                    break;
                case 'thumbs':
                    thumbImages.selectedImages.forEach((value, key) => {
                        Object.keys(value).forEach((kk) => {
                            if (typeof value[kk] === 'object' && value[kk] instanceof File) {
                                submissionData.append(`thumbs[${key}][${kk}]`, value[kk], value[kk].name);
                            }
                        });
                    });
                    break;
                default:
                    submissionData.append(index, item);
            }

        });
        for (const [key, value] of submissionData.entries()) {
            console.log(`${key}: ${value}`);
        }
        //return false;
        try {
            const response = await storeEvent(submissionData);
            if (response.ok) {
                const reload = !pageData.id;
                showSuccessAlert(response.message, reload);
            } else{
                handleBasicError(response.error);
                //handleApiError(response, true);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    },[galImages.selectedImages, pageData.id, templateData, thumbImages.selectedImages]);

    const handleCategoryClick = useCallback((categoryId, categoryName) => {
        const categoryArray = formData[categoryName] || [];

        const isCategoryAttached = categoryArray.includes(categoryId);
        const updatedCategories = isCategoryAttached
            ? categoryArray.filter(id => id !== categoryId)
            : [...categoryArray, categoryId];

        updateFormData({ ...formData, [categoryName]: updatedCategories });
    }, [formData, updateFormData]);

    const handleServiceClick = useCallback((serviceId) => {
        const isServiceAttached = formData.services.includes(serviceId);
        const updatedServices = isServiceAttached
            ? formData.services.filter(id => id !== serviceId) // Remove ID
            : [...formData.services, serviceId]; // Add ID

        updateFormData({ ...formData, services: updatedServices });
    }, [formData, updateFormData]);

    const attachToCase = useCallback((testimonialId) => {
        const updatedTestimonials = [testimonialId]; // Only the new ID

        updateFormData({ ...formData, testimonials: updatedTestimonials });
    }, [formData, updateFormData]);

    const proceedWithDelete = async (id, type) =>{
        try {
            const result = await deleteEventGallery(type, formData.id, id);
            if (result.ok) {
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    // Process the template data when it changes
    useEffect(() => {
        if (pageData?.templates) {
            const newData = {};
            const structuredData = {};
            Object.keys(pageData.templates).forEach(templateId => {
                const { type: templateType, uuid, data } = pageData.templates[templateId];
                let templateDataInfo = {};
                if (data && data.trim() !== '') {
                    try {
                        templateDataInfo = JSON.parse(data);
                    } catch (error) {
                        console.error("Error parsing templateData.data as JSON:", error);
                        return; // Skip further execution for this template
                    }
                }

                if (!newData[uuid]) newData[uuid] = {};
                if (!newData[uuid][templateType]) newData[uuid][templateType] = {};
                if (!structuredData[uuid]) structuredData[uuid] = {};
                if (!structuredData[uuid][templateType]) structuredData[uuid][templateType] = {};

                for (const key in templateDataInfo) {
                    if (templateDataInfo.hasOwnProperty(key)){
                        if(key !== 'case-block-id'){
                            structuredData[uuid][templateType][`${key}-${uuid}`] = templateDataInfo[key];
                            if (key === 'case-block-img' || key === 'case-bl-img-1' || key === 'case-bl-img-2') {
                                // If it's an object, likely a File, handle normally or perform additional checks
                                if (typeof templateDataInfo[key] === 'object' && templateDataInfo[key] instanceof File) {
                                    newData[uuid][templateType][`${key}-${uuid}`] = templateDataInfo[key];
                                }
                            }else{
                                newData[uuid][templateType][`${key}-${uuid}`] = templateDataInfo[key];
                            }
                        }
                    }
                }
            });

            setProcessedTemplateData({ templateFields: structuredData });
            setTemplateData({ templateFields: structuredData });
        }
    }, [pageData?.templates]);

    const updateTemplates = (templateFields) => {
        setTemplateData({
            templateFields: {
                ...templateData.templateFields,
                ...templateFields // Assuming 'templateFields' is the new data you want to merge in
            }
        });
    };

    return (
        <>
            <div className={`${styles['admin-page-wrap']}`}>
                <FeaturedPostBlock
                    handleInputChange={handleUniqueChange}
                    chosen={formData.chosen}
                    featured={formData.featured}
                />
                <CaseBannerBlock
                    sectionTitle="Banner"
                    selectedFile={banner}
                    sectionTitleVal={formData.title}
                    sectionIntroTitleVal={formData.desc}
                    bannerColorVal={formData.bannerColor}
                    handleInputChange={handleUniqueChange}
                    inputFileID={`banner`}
                    errorMessage={errorMessage}
                />
                <OverviewBlock
                    sectionTitle="Overview"
                    sectionText={formData.overview}
                    handleInputChange={handleUniqueChange}
                />
                {
                    processedTemplateData && processedTemplateData.templateFields && Object.keys(processedTemplateData.templateFields).length > 0 &&
                    <CaseBlocks
                        templateData={templateData}
                        structuredData={processedTemplateData}
                        updateTemplates={updateTemplates}
                    />
                }
                <AddNewSection
                    updateTemplates={updateTemplates}
                />
                <CaseGallery
                    sectionTitle="Gallery"
                    galleryData={galleryData}
                    galImages={galImages}
                    setGalImages={setGalImages}
                    proceedWithDelete={proceedWithDelete}
                />
                <CaseThumbs
                    sectionTitle="Thumbnails"
                    thumbsData={thumbsData}
                    thumbImages={thumbImages}
                    setThumbImages={setThumbImages}
                    proceedWithDelete={proceedWithDelete}
                />
                <CaseCategoryList
                    sectionTitle="Categories"
                    dataCats={categoriesFormData}
                    onCategoryClick={handleCategoryClick}
                />
                <ServicesList
                    sectionTitle="Services List"
                    dataSv={servicesFormData}
                    onServiceClick={handleServiceClick}
                />
                <CaseTestimonial
                    sectionTitle="Testimonials"
                    dataList={testimonialFormData}
                    attachToCase={attachToCase}
                />
                <PostSEOBlock
                    sectionTitle="SEO"
                    pageMetaDesc={formData['meta_description']}
                    pageMetaKeyW={formData['meta_keywords']}
                    handleInputChange={handleUniqueChange}
                />
            </div>
            <div className={styles['admin-btn-row']}>
                <button
                    type="submit"
                    className="btn-primary"
                    onClick={(e) => handleUniqueSubmit(e, onSubmit)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : (pageData.isNew ? 'Publish' : 'Apply changes')}
                </button>
            </div>
        </>
    )
}

export default TabContent