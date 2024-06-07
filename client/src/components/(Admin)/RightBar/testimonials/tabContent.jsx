import { useEffect, useState } from "react";
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import LoadingAnim from "@/components/(Admin)/LoadingAnim/LoadingAnim";
import TestimonialsRow from "@/components/(Admin)/TestimonialsRow/TestimonialsRow";
import {showSuccessAlert, showErrorAlert, showConfirmAlert} from "@/hooks/admin/helpers";
import {deleteTestimonial} from "@/utils/api/(admin)/post";

const TabContent = ({ data }) => {
    const testimonials = data?.testimonials?.data ?? [];

    // states
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        <LoadingAnim />
    }

    const handleDeleteTestimonial = (id) => {
        showConfirmAlert().then((result) => {
            if (result) {
                proceedWithDelete(id).then(r => '');
            }
        });
    };

    const proceedWithDelete = async (id) =>{
        try {
            const result = await deleteTestimonial(id);
            if (result.ok) {
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    return (
        <>
            <div className={`${styles['admin-page-wrap']}`}>
                <div className={`${styles['admin-tbl-area']} ${styles['admin-tbl-mg']}`}>
                    {/* Table Header */}
                    <div className={`${styles['admin-tbl-top']} fx fx-jb`}>
                        <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-tst']}`}>
                            <span>Client Name</span>
                        </div>
                        <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-tst']} ${styles['al-cnt']}`}>
                            <span>Client Photo</span>
                        </div>
                        <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-tst']} ${styles['al-cnt']}`}>
                            <span>Company Logo</span>
                        </div>
                        <div className={`${styles['admin-tbl-col']}`}>
                            <span>Actions</span>
                        </div>
                    </div>
                    {/* Table Rows */}
                    <div>
                        {testimonials.map((item, index) => (
                            <TestimonialsRow
                                key={index}
                                name={item.name}
                                avatar={item.avatar}
                                logo_src={item.logo_src}
                                logo_alt={item.logo_alt}
                                id={item.id}
                                onDelete={handleDeleteTestimonial}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default TabContent;