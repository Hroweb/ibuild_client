import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import BlogInfoBlock from "@/components/(Admin)/BlogSingle/BlogInfoBlock";
import PostSEOBlock from "@/components/(Admin)/CaseSingle/PostSEOBlock";
import {UseForm} from "@/hooks/admin/useForm";
import {useState, useCallback} from "react";
import {handleApiError, showSuccessAlert} from "@/hooks/admin/helpers";
import {storePost} from "@/utils/api/(admin)/post";

const TabContent = ({data}) => {
    const pageData = data?.data;

    const initialFormData = {
        'meta_description': pageData?.meta_description ?? '',
        'meta_keywords': pageData?.meta_keywords ?? '',
        'title': pageData?.title ?? '',
        'short_desc': pageData?.short_desc ?? '',
        'ovw_text': pageData?.ovw_text ?? '',
        'content': pageData?.content ?? '',
        'date': pageData?.created_at ?? '',
        'id': pageData?.id ?? false,
        'top_news': pageData?.top_news ?? 0,
        'categories': pageData?.categories ? pageData?.categories.map(category => category.id) : []
    }

    const initialMediaData = {
        banner: pageData?.image ?? '',
    }

    const { formData, selectedMedia, errorMessage, handleUniqueChange, handleUniqueSubmit, updateFormData } = UseForm(initialFormData, initialMediaData);
    const banner = selectedMedia.banner.preview || pageData.isNew ? selectedMedia.banner.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/blog/${pageData.id}/${pageData.image}`;
    const filtersFormData = {
        'all_categories': data?.categories?.data,
        'attached_categories': formData.categories
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = useCallback(async (formData) => {

        setIsSubmitting(true);

        // Submit the form data to the API
        try {
            const response = await storePost(formData);
            if (response.ok) {
                showSuccessAlert(response.message, !!pageData.isNew)
            } else{
                handleApiError(response, true);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    },[]);

    const handleCategoryClick = useCallback((categoryId) => {
        const isCategoryAttached = formData.categories.includes(categoryId);
        const updatedCategories = isCategoryAttached
            ? formData.categories.filter(id => id !== categoryId) // Remove ID
            : [...formData.categories, categoryId]; // Add ID

        updateFormData({ ...formData, categories: updatedCategories });
    }, [formData, updateFormData]);

    return (
        <>
            <div className={`${styles['admin-page-wrap']}`}>
                <BlogInfoBlock
                    sectionTitle="Article Details"
                    selectedFile={banner}
                    sectionTitleVal={formData.title}
                    shortDescVal={formData.short_desc}
                    ovwTextVal={formData.ovw_text}
                    blogContent={formData.content}
                    categories={filtersFormData}
                    publishDate={formData.date}
                    handleInputChange={handleUniqueChange}
                    errorMessage={errorMessage}
                    handleCategoryClick={handleCategoryClick}
                    topNews={formData.top_news}
                />
                <PostSEOBlock
                    sectionTitle="SEO"
                    pageMetaDesc={formData.meta_description}
                    pageMetaKeyW={formData.meta_keywords}
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