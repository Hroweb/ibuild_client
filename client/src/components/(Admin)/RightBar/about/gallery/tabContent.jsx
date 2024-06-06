import {useState} from "react";
import InputField from "@/components/(Admin)/InputField/InputField";
import {GalClose} from "@/components/svgs/admin";
//import {postGallery, deleteGalleryImage} from "@/utils/(admin)/gallery/api";
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {showConfirmAlert, showErrorAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {storeGalleryPhotos, deleteGalleryPhoto} from "@/utils/api/(admin)/post";

const TabContent = ({data}) => {
    const images = data?.gallery;
    const [formData, setFormData] = useState({selectedImages: []});
    const [galleryData, setGalleryData] = useState(images?.data);
    const [previewImages, setPreviewImages] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

    // remove images (not uploaded)
    const removeImage = (key, isPreview = false) => {
        if(!isPreview){
            showConfirmAlert().then((result) => {
                if (result) {
                    proceedWithDelete(key).then(r => '');
                }
            });
        }else{
            // Filter out the image with the specified key
            const updatedSelectedImages = [...formData.selectedImages];
            updatedSelectedImages.splice(key, 1);
            setFormData({
                ...formData,
                selectedImages: updatedSelectedImages
            });
            const updatedPreviewImages = [...previewImages];
            updatedPreviewImages.splice(key, 1);
            setPreviewImages(updatedPreviewImages);
        }
    };

    const proceedWithDelete = async (id) =>{
        try {
            const result = await deleteGalleryPhoto(id);
            if (result.ok) {
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    const handleFileInputChange = (event) => {
        const files = Array.from(event.target.files);
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg'];
        const allowedSize = 5242880; // 5MB in bytes

        // Filter out files that are not images or exceed the allowed size
        const selectedImages = files.filter(file =>
            allowedTypes.includes(file.type) && file.size <= allowedSize
        );

        // Display error message for invalid files
        const invalidFiles = files.filter(file =>
            !allowedTypes.includes(file.type) || file.size > allowedSize
        );
        const errorMessages = invalidFiles.map(file => {
            if (!allowedTypes.includes(file.type)) {
                return `Invalid file type: ${file.name}`;
            }
            if (file.size > allowedSize) {
                return `File size exceeds the limit: ${file.name}`;
            }
            return null;
        });

        setErrorMessages(errorMessages);

        // Create preview URLs for valid images and update the state
        const previews = selectedImages.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setFormData({
            ...formData,
            selectedImages: [...formData.selectedImages, ...previews]
        });

        setPreviewImages([...previewImages, ...previews]);
    };


    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Submit the form data to the API
        if( formData.selectedImages.length > 0 ){
            setIsSubmitting(true);
            const submissionData = new FormData();
            formData.selectedImages.forEach((item, index) => {
                Object.keys(item).forEach((key) => {
                    if (typeof item[key] === 'object' && item[key] instanceof File) {
                        submissionData.append(`selectedImages[${index}][${key}]`, item[key], item[key].name);
                    }
                });
            });

            try {
                const result = await storeGalleryPhotos(submissionData);
                if(result.ok){
                    showSuccessAlert(result.message);
                }
            } catch (error) {
                console.error('Error submitting data:', error);
                // Handle error
            }
        }else{
            showErrorAlert('Choose images to upload')
        }
    };

    return (
        <>
            <div className={`${styles['admin-tabs-content']}`}>
                {!galleryData? (
                    <div className="fx fx-wrap fx-jb fwidth">
                        <div className={`${styles['admin-field']} ${styles['admin-field-qt-col']} fx fx-wrap`}>
                            <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpG']} fx fx-jc fx-ac`}>
                                <InputField
                                    type="file"
                                    id="gal-file"
                                    accept=".jpeg, .png, .jpg, .svg"
                                    multiple
                                />
                            </div>
                            <div className={`${styles['admin-choose-btn']}`}>
                                <InputField
                                    type="file"
                                    id="gal-file"
                                    accept=".jpeg, .png, .jpg, .svg"
                                    multiple
                                />
                                <span>Choose Image</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={`${styles['admin-gal-row']} fx fx-wrap fwidth`}>
                            {Object.entries(galleryData).map(([key, item]) => {
                                const bgUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/gallery/${item.image}`
                                return (
                                    <div key={key} className={`${styles['admin-field']} ${styles['admin-field-gal']} fx fx-wrap`}>
                                        <div className={`${styles['admin-gal-img']}`} style={{
                                            backgroundImage: `url(${bgUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                        }}>
                                            <div
                                                className={`${styles['gal-close']} fx fx-jc fx-ac`}
                                                onClick={() => removeImage(item.id)}
                                            >
                                                <GalClose />
                                            </div>
                                        </div>
                                    </div>
                                )})}
                            {previewImages.map((image, index) => (
                                <div key={index} className={`${styles['admin-field']} ${styles['admin-field-gal']} fx fx-wrap`}>
                                    <div className={`${styles['admin-gal-img']}`} style={{
                                        backgroundImage: `url(${image.preview})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}>
                                        <div
                                            className={`${styles['gal-close']} fx fx-jc fx-ac`}
                                            onClick={() => removeImage(index, true)}
                                        >
                                            <GalClose />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errorMessages.map((errorMessage, index) => (
                            <div key={index} className={`${styles['admin-err-area']}`}>
                                <div className={`${styles['admin-err']}`}>
                                    <span>{errorMessage}</span>
                                </div>
                            </div>
                        ))}
                        <div className={`${styles['admin-field']} ${styles['admin-add-gal-row']} fx fwidth`}>
                            <div className={`${styles['admin-choose-btn']}`}>
                                <InputField
                                    type="file"
                                    id="gal-file"
                                    accept=".jpeg, .png, .jpg, .svg"
                                    multiple
                                    onChange={handleFileInputChange}
                                />
                                <span>Choose New Image</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={styles['admin-btn-row']}>
                <button 
                    type="submit" 
                    className="btn-primary" 
                    onClick={ handleSubmit }
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Apply changes'}
                </button>
            </div>
        </>
    )
}

export default TabContent