import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import { CheckMark } from '@/components/svgs/admin'
import Image from "next/image";

const CaseTestimonial = ({ sectionTitle, dataList, attachToCase }) => {
    const selectedTestimonials = dataList.selected_testimonials.reduce((acc, testimonialId) => {
        acc[testimonialId] = true;
        return acc;
    }, {});
    return (
        <div className={`${styles['admin-case-block']} ${styles['admin-case-block-tst']}`}>
            <h3>{sectionTitle}</h3>
            <div className={`${styles['admin-case-tst-wrap']} fwidth`}>
                <div className={`${styles['admin-tst-tbl-hd']} fx fx-jb`}>
                    <div className={`${styles['admin-tst-tbl-col']}`}>
                        <span>Client Name</span>
                    </div>
                    <div className={`${styles['admin-tst-tbl-col']}`}>
                        <span>Client Photo</span>
                    </div>
                    <div className={`${styles['admin-tst-tbl-col']}`}>
                        <span>Company Logo</span>
                    </div>
                    <div className={`${styles['admin-tst-tbl-col']}`}>
                        <span>ACTIONS</span>
                    </div>
                </div>
                <div>
                    {dataList.all_testimonials.map((item, index) => {
                        const avatar = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/testimonials/${item.avatar}`;
                        const logo_src = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/testimonials/${item.logo_src}`;
                        return(
                            /* add class  ${styles['selected']} when selected or attached, allow only one selection */
                            <div key={index} className={`${styles['admin-tst-tbl-row']} fx fx-jb fx-ac`}>
                                <div className={`${styles['admin-tst-tbl-colM']}`}>
                                    <span>{item.name}</span>
                                </div>
                                <div className={`${styles['admin-tst-tbl-colM']}`}>
                                    <div className={`${styles['admin-tst-tbl-photo']} fx fx-jc fx-ac`}>
                                        <Image src={avatar} alt={item.name} width={35} height={35} />
                                    </div>
                                </div>
                                <div className={`${styles['admin-tst-tbl-colM']}`}>
                                    <div className={`${styles['admin-tst-tbl-logo']} fx fx-ac`}>
                                        <Image src={logo_src} alt={item.logo_alt} width={78} height={14} />
                                    </div>
                                </div>
                                <div className={`${styles['admin-tst-tbl-colM']} fx fx-jc`}>
                                    {selectedTestimonials[item.id] ? (
                                        <a className={`${styles['admin-tst-attS']} fx fx-ac`}>
                                            {dataList.attached_testimonials.includes(item.id) ? 'Attached' : 'Selected'}
                                            <CheckMark />
                                        </a>
                                    ) : (
                                        // This part will be rendered if attachedTestimonials(item.id) is false
                                        <a className={`${styles['admin-tst-attD']}`} onClick={() => attachToCase(item.id)}>
                                            Attach to case
                                        </a>
                                    )}

                                </div>
                            </div>
                        )}
                    )}
                </div>
            </div>
        </div>
    )
}

export default CaseTestimonial;