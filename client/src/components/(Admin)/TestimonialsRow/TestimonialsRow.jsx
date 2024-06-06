import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import { MenuArr } from '@/components/svgs/admin'
import Image from "next/image"

const TestimonialsRow = ({ name, avatar, logo_src, logo_alt, id, onDelete}) => {
    const avatarImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/testimonials/${avatar}` ?? null;
    const logoImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/testimonials/${logo_src}` ?? null;
    return (
        <div className={`${styles['admin-tbl-row']} fwidth fx fx-jb fx-ac`}>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-tst']}`}>
                <h2>{name}</h2>
                <div className={`${styles['cs-actions']}`}>
                    <a href={`/admin/testimonials/${id}`}>Edit</a>
                    <a href="#" onClick={() => onDelete(id)}>Delete</a>
                </div>
            </div>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-tst']}`}>
                <div className={`${styles['admin-tst-tbl-photo']} fx fx-jc fx-ac`}>
                    <Image width="60" height="60" src={avatarImg} alt={name}/>
                </div>
            </div>
            <div className={`${styles['admin-tbl-mcol']} ${styles['admin-tbl-col-tst']}`}>
                <div className={`${styles['admin-tst-tbl-logo']} fx fx-ac`}>
                    <Image width="90" height="40" src={logoImg} alt={logo_alt} />
                </div>
            </div>
            <div className={`${styles['admin-tbl-mcol']} fx fx-jc`}>
                <a href={`/admin/testimonials/${id}`}>
                    <MenuArr />
                </a>
            </div>
        </div>
    )
}

export default TestimonialsRow;