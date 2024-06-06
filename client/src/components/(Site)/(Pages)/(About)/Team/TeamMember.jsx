import styles from './Team.module.scss'
import Image from "next/image"

const TeamMember = ({ src, alt, width, height, title, position, text }) => {
    src = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/team/${src}` ?? null;
    return (
        <div className={`${styles['team-item']}`}>
            <div className={`${styles['team-photo']}`}>
                <Image src={src} alt={alt} width={width} height={height} />
                <div className={`${styles['team-adt-info']} fx fx-ac fx-jc`}>
                    <div className={`${styles['team-adt-wrap']}`}>
                        <h4>About team member</h4>
                        <p>{ text }</p>
                    </div>
                </div>
            </div>
            <div className={`${styles['team-info']}`}>
                <h5>{ title }</h5>
                <h6>{ position }</h6>
            </div>
        </div>
    );
}

export default TeamMember;