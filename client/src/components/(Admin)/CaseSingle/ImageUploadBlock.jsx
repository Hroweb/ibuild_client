import React, { useState } from 'react';
import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from "@/components/(Admin)/InputField/InputField"
import { VideoIcon } from '@/components/svgs/admin'
import Image from "next/image"

const ImageUploadBlock = ({ sectionTitle, inputID, allowedFormats, handleMediaInputChange, template, selectedMedia, sectionID }) => {
    //console.log(handleMediaInputChange);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleInputChangeMedia = (event) => {
        const selectedFile = event.target.files[0];

        // Generate preview URL for the selected image
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result); // Set the preview URL in state
            };
            reader.readAsDataURL(selectedFile);
        } else {
            selectedMedia ? setPreviewUrl(selectedMedia) : setPreviewUrl(null); // Reset preview URL if no file is selected
        }

        handleMediaInputChange(inputID, selectedFile, sectionID, template);
    };

    const imageUrl = previewUrl ? previewUrl : selectedMedia;
    return (
        <div className={`${styles['admin-field-cs-img']}`}>
            <div className={`${styles['admin-field']}`}>
                <label>{sectionTitle}</label>
                {previewUrl || selectedMedia ? (
                    <div className="fx fx-wrap">
                        <div className={`${styles['cs-Img']} ${styles['no-bg']} fwidth`}>
                            <Image
                                src={imageUrl}
                                width="600"
                                height="400"
                                alt='new case image'
                            />
                        </div>
                        <div className={`${styles['admin-choose-btn']}`}>
                            <InputField 
                                type="file"
                                id={inputID}
                                accept={allowedFormats}
                                onChange={handleInputChangeMedia}
                            />
                            <span>Change File</span>
                        </div>
                    </div>
                ) : (
                    <div className={`${styles['admin-field-Vd-main']}`}>
                        <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpV']} ${styles['admin-field-inpCS']} fx fx-jc fx-ac`}>
                            <InputField 
                                type="file"
                                id={inputID}
                                accept={allowedFormats}
                                onChange={handleInputChangeMedia}
                            />
                            <div className="fx fx-wrap fx-jc f-dir-col">
                                <VideoIcon />
                                <span>Choose File</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageUploadBlock;