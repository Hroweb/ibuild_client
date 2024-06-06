import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock"
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock"
import ImageBlock from "@/components/(Admin)/ImageBlock/ImageBlock"
import {useState} from "react"

const TeamBlock = ({ sectionTitle, teamMemberName, teamMemberPos, teamMemberBio, teamMemberPhoto, handleInputChange, blockIndex, index }) => {
    const [previewImages, setPreviewImages] = useState({
        photo: typeof window !== 'undefined' && teamMemberPhoto instanceof File ? URL.createObjectURL(teamMemberPhoto) : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/team/${teamMemberPhoto}`
    });
    const handleChange = (fieldId, value) => {
        handleInputChange(index, fieldId, value);
        // If the field is for a file, update the preview as well
        if (fieldId === 'photo' && value && (value instanceof File || value instanceof Blob)) {
            setPreviewImages((prev) => ({
                ...prev,
                [fieldId]: URL.createObjectURL(value),
            }));
        }
    };
    return (
        <div className={`${styles['admin-field-team-row']}`}>
            <div className="fx fx-jb fx-ae">
                <div className={`${styles['admin-field-hf-col']}`}>
                    <TitleBlock 
                        sectionTitle={sectionTitle}
                        sectionTitleVal={teamMemberName}
                        onChange={(e) => handleChange('name', e.target.value)}
                        inputID="cp-team-name"
                        inputPlaceholder="Add your name here..."
                    />
                </div>
                <div className={`${styles['admin-field-hf-col']}`}>
                    <TitleBlock 
                        sectionTitle=" "
                        sectionTitleVal={teamMemberPos}
                        onChange={(e) => handleChange(`position`, e.target.value)}
                        inputID="cp-team-pos"
                        inputPlaceholder="Add your position here..."
                    />
                </div>
            </div>
            <DescBlock 
                sectionTitle="About Team member"
                sectionTitleVal={teamMemberBio}
                inputID="cp-team-bio"
                inputName="cp-team-bio"
                onChange={(e) => handleChange(`bio`, e.target.value)}
            />
            <ImageBlock
                label="Photo"
                selectedFile={previewImages.photo}
                inputID={`team-member-${blockIndex}`}
                imageAlt={teamMemberName}
                onChange={(e) => handleChange('photo', e.target.files[0])}
            />
        </div>
    )
}

export default TeamBlock;