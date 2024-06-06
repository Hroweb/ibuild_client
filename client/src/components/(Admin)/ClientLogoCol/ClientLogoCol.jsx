import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import { SvDelete } from '@/components/svgs/admin';
import ImageBlock from "@/components/(Admin)/ImageBlock/ImageBlock";
import {useState} from "react";

const ClientLogoCol = ({ logoSrc, imageAlt, index, handleInputChange, handleDelete}) => {
    const [previewImages, setPreviewImages] = useState({
        logo: typeof window !== 'undefined' && logoSrc instanceof File ? URL.createObjectURL(logoSrc) : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/clients/${logoSrc}`,
    });
    const handleChange = (fieldId, value) => {
        handleInputChange(index, fieldId, value);
        // If the field is for a file, update the preview as well
        if (fieldId === 'logo' && value && (value instanceof File || value instanceof Blob)) {
            setPreviewImages((prev) => ({
                ...prev,
                [fieldId]: URL.createObjectURL(value),
            }));
        }
    };
    return (
        <div className={`${styles['admin-logo-col']} ${styles['admin-logoC-col']}`}>
            <div className={`${styles['close-btn']} fx`} onClick={handleDelete}>
                <SvDelete />
            </div>
            <ImageBlock
                label=""
                selectedFile={previewImages.logo}
                inputID={`client_${index}`}
                onChange={(e) => handleChange('logo', e.target.files[0])}
                imageAlt={imageAlt}
                bg="yes"
            />
        </div>
    )
}

export default ClientLogoCol;