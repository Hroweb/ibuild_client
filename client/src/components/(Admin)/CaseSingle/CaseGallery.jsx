'use client';
import React, { useState } from 'react';
import styles from '@/components/(Admin)/RightBar/RightBar.module.scss';
import { GalClose, ErrorIcon } from '@/components/svgs/admin';
import InputField from '@/components/(Admin)/InputField/InputField';
import {showConfirmAlert} from "@/hooks/admin/helpers";

const CaseGallery = ({ sectionTitle, galleryData, galImages, setGalImages, proceedWithDelete }) => {
    const [previewImages, setPreviewImages] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFileInputChange = (event) => {
        const files = Array.from(event.target.files);
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg', 'image/webp'];
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

        setGalImages({
            ...galImages,
            selectedImages: [...galImages.selectedImages, ...previews]
        });

        setPreviewImages([...previewImages, ...previews]);
    };

    const removeImage = (imageId, isPreview = false) => {
        if(!isPreview){
            showConfirmAlert().then((result) => {
                if (result) {
                    proceedWithDelete(imageId, 'gallery').then(r => '');
                }
            });
        }else{
            const updatedSelectedImages = [...galImages.selectedImages];
            updatedSelectedImages.splice(imageId, 1);
            setGalImages({
                ...galImages,
                selectedImages: updatedSelectedImages
            });
            // Remove the image from previewImages based on imageId
            const updatedPreviewImages = [...previewImages];
            updatedPreviewImages.splice(imageId, 1);
            setPreviewImages(updatedPreviewImages);
        }
    };
    return (
        <div className={`${styles['admin-case-block']}`}>
            <h3>{sectionTitle}</h3>
            <div className={`${styles['admin-case-wrap']} fwidth`}>
                {!galleryData? (
                    <div className="fx fx-wrap fx-jb fwidth">
                        <div className={`${styles['admin-field']} fx fx-wrap fwidth`}>
                            {previewImages.length > 0 ? (
                                previewImages.map((image, index) => (
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
                                ))
                            ) : (
                                <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpGal']} ${styles['admin-field-inpG']} fx fx-jc fx-ac`}>
                                    <InputField
                                        type="file"
                                        id="case-gal-file"
                                        accept=".jpeg, .png, .jpg, .svg, .webp"
                                        multiple
                                        onChange={handleFileInputChange}
                                    />
                                </div>
                            )}
                            {Object.keys(errorMessages).length > 0 && (
                                <div className={`${styles['admin-err-area']} ${styles['admin-err-area-img']} fx fx-ac fx-wrap fwidth`}>
                                    {errorMessages.map((errorMessage, index) => (
                                        <div key={index} className={`${styles['admin-err-gal']} fwidth fx fx-ac`}>
                                            <div className={`fx`}>
                                                <ErrorIcon />
                                            </div>
                                            <span>{errorMessage}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className={`${styles['admin-field']} ${styles['admin-add-gal-row']} fx fwidth`}>
                                <div className={`${styles['admin-choose-btn']}`}>
                                    <InputField
                                        type="file"
                                        id="case-gal-file"
                                        accept=".jpeg, .png, .jpg, .svg, .webp"
                                        multiple
                                        onChange={handleFileInputChange}
                                    />
                                    <span>Choose Image (s)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <h4>Uploaded Images</h4>
                        <div className={`${styles['admin-gal-row']} fx fx-wrap fwidth`}>
                            {Object.entries(galleryData).map(([key, item]) => {
                                const image = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio/${item.src}`;
                                return(
                                    <div key={key} className={`${styles['admin-field']} ${styles['admin-field-gal']} fx fx-wrap`}>
                                        <div className={`${styles['admin-gal-img']}`} style={{
                                            backgroundImage: `url(${image})`,
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
                        {Object.keys(errorMessages).length > 0 && (
                            <div className={`${styles['admin-err-area']} fx fx-ac fx-wrap`}>
                                {errorMessages.map((errorMessage, index) => (
                                    <div key={index} className={`${styles['admin-err-gal']} fwidth fx fx-ac`}>
                                        <div className={`fx`}>
                                            <ErrorIcon />
                                        </div>
                                        <span>{errorMessage}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={`${styles['admin-field']} ${styles['admin-add-gal-row']} fx fwidth`}>
                            <div className={`${styles['admin-choose-btn']}`}>
                                <InputField
                                    type="file"
                                    id="gal-file"
                                    accept=".jpeg, .png, .jpg, .svg, .webp"
                                    multiple
                                    onChange={handleFileInputChange}
                                />
                                <span>Choose New Image</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default CaseGallery;
