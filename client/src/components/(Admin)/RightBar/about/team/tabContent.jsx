import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import { useState, useCallback } from "react";
import TeamBlock from "@/components/(Admin)/TeamBlock/TeamBlock";
import {showErrorAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {updateTeamMembers} from "@/utils/api/(admin)/post";

const TabContent = ({data}) => {
    const pageMeta = data?.data;
    const teamMembers =  data?.team?.data;
    
    const [formData, setFormData] = useState({
        teamMembers: teamMembers.map((team) => ({
            id: team.id,
            name: team.name ?? '',
            position: team.position ?? '',
            bio: team.bio ?? '',
            photo: team.photo ?? '',
        }))
    });

    const handleInputChange = useCallback((index, field, value) => {
        setFormData((prevFormData) => {
            const updatedTeamMembers = [...prevFormData.teamMembers];
            updatedTeamMembers[index] = {
                ...updatedTeamMembers[index],
                [field]: value,
            };
            return { ...prevFormData, teamMembers: updatedTeamMembers };
        });
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const isEmptyFieldPresent = formData.teamMembers.some(team => {
            return !team.name.trim() || !team.position.trim() || !team.bio || !team.photo;
        });

        if (isEmptyFieldPresent) {
            // Alert or handle the error in a user-friendly manner
            showErrorAlert('Please fill in all fields and select files before submitting');
            return; // Stop the form submission
        }
        // Prepare the formData to be sent
        const submissionData = new FormData();
        formData.teamMembers.forEach((team, index) => {
            Object.keys(team).forEach((key) => {
                if ((key === 'photo') && !(team[key] instanceof File)) {
                    // If no file has been selected for main_photo or hover_photo, skip this iteration
                    return;
                }
                if (typeof team[key] === 'object' && team[key] instanceof File) {
                    submissionData.append(`teamMembers[${index}][${key}]`, team[key], team[key].name);
                } else {
                    submissionData.append(`teamMembers[${index}][${key}]`, team[key]);
                }
            });
        });
        // TODO: Make API call with submissionData
        try {
            const result = await updateTeamMembers(submissionData);
            if(result.ok){
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }, [formData]);

    return (
        <>
            <div className={`${styles['admin-tabs-content']}`}>
                {formData.teamMembers.map((team, index) => (
                    <TeamBlock 
                        key={index}
                        blockIndex={index + 1}
                        sectionTitle={`Team Member ${index + 1}`}
                        teamMemberName={team.name}
                        teamMemberPos={team.position}
                        teamMemberBio={team.bio}
                        teamMemberPhoto={team.photo}
                        handleInputChange={handleInputChange}
                        index={index}
                    />
                ))}
            </div>
            <div className={styles['admin-btn-row']}>
                <button 
                    type="submit" 
                    className="btn-primary" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Apply changes'}
                </button>
            </div>
        </>
    );
}

export default TabContent