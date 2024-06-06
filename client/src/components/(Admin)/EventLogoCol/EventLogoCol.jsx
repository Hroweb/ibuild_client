import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import ImageBlock from "@/components/(Admin)/ImageBlock/ImageBlock";
import { SvDelete } from '@/components/svgs/admin';
import {useState} from "react";

const EventLogoCol = ({ eventID, eventName, logoSrc, index, handleInputChange, handleDelete }) => {
    const [previewImages, setPreviewImages] = useState({
        logo: typeof window !== 'undefined' && logoSrc instanceof File ? URL.createObjectURL(logoSrc) : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/event-logos/${logoSrc}`,
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
        <div className={`${styles['admin-logo-col']}`}>
            <div className={`${styles['close-btn']} fx`} onClick={handleDelete}>
                <SvDelete />
            </div>
            <TitleBlock 
                sectionTitle=""
                sectionTitleVal={eventName}
                inputID={eventID}
                inputPlaceholder="Add event name here..."
                onChange={(e) => handleChange('title', e.target.value)}
            />
            <ImageBlock
                label=""
                selectedFile={previewImages.logo}
                inputID={`event-${eventName}`}
                imageAlt={eventName}
                bg="yes"
                onChange={(e) => handleChange('logo', e.target.files[0])}
            />
        </div>
    )
}

export default EventLogoCol;