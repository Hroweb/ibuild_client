import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import ImageBlock from "@/components/(Admin)/ImageBlock/ImageBlock";
import {useState} from "react";

const ProcessItem = ({ titleLabel, titleVal, titleInputID, titleInpPlaceholder, descLabel, descVal, descInpID, imageFile1, imageFile2, index, handleInputChange }) => {
    const [previewImages, setPreviewImages] = useState({
        main_photo: typeof window !== 'undefined' && imageFile1 instanceof File ? URL.createObjectURL(imageFile1) : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/processes/${imageFile1}`,
        hover_photo: typeof window !== 'undefined' && imageFile2 instanceof File ? URL.createObjectURL(imageFile2) : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/processes/${imageFile2}`,
    });
    const handleChange = (fieldId, value) => {
        handleInputChange(index, fieldId, value);
        // If the field is for a file, update the preview as well
        if ((fieldId === 'main_photo' || fieldId === 'hover_photo') && value && (value instanceof File || value instanceof Blob)) {
            setPreviewImages((prev) => ({
                ...prev,
                [fieldId]: URL.createObjectURL(value),
            }));
        }
    };
    return (
        <div className={`${styles['admin-prc-item']}`}>
            <h3>Process Item {index+1}</h3>
            <div className={`${styles['admin-prc-item-wrap']}`}>
                <TitleBlock
                    sectionTitle={titleLabel}
                    sectionTitleVal={titleVal}
                    onChange={(e) => handleChange('title', e.target.value)}
                    inputID={titleInputID}
                    inputPlaceholder={titleInpPlaceholder}
                    //classname={errors[index]?.title ? `${styles['invalid']}` : ''}
                />
                <DescBlock
                    sectionTitle={descLabel}
                    sectionTitleVal={descVal}
                    inputID={descInpID}
                    inputName={descInpID}
                    onChange={(e) => handleChange('description', e.target.value)}
                    //classname={errors[index]?.desc ? `${styles['invalid']}` : ''}
                />
                <div className={`${styles['admin-prc-images']} ${styles['admin-fields-2col']} fx`}>
                    <ImageBlock
                        label="Main Photo"
                        selectedFile={previewImages.main_photo}
                        inputID={`prc_1`}
                        imageAlt={`process item`}
                        onChange={(e) => handleChange('main_photo', e.target.files[0])}
                    />
                    <ImageBlock
                        label="Hover Animation Photo"
                        selectedFile={previewImages.hover_photo}
                        inputID={`prc_hover_1`}
                        imageAlt={`process item`}
                        onChange={(e) => handleChange('hover_photo', e.target.files[0])}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProcessItem;