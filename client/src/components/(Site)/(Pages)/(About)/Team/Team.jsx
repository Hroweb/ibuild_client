import styles from './Team.module.scss'
import TeamMember from '@/components/(Site)/(Pages)/(About)/Team/TeamMember'


const Team = ({ data, list }) => {
    const title = data?.['cp_team_title']?.['meta_value'] ?? null;
    const content = data?.['cp_team_text']?.['meta_value'] ?? null;
    const TeamMembers = (list && list.success && true) ? list.data : null;

    return (
        <section className={`pg-section pg-section-pd bg-light ${styles['team-members']}`}>
            <div className="container">
                <div className="fx fx-jb fx-wrap">
                    <div className={`${styles['tm-lcol']}`}>
                        <h2>{ title }</h2>
                    </div>
                    <div className={`${styles['tm-rcol']}`}>
                        <div className={`${styles['tm-text']}`}>
                            <p> {content} </p>
                        </div>
                    </div>
                </div>
                <div className={`${styles['tm-wrap']} fx fx-jb`}>
                    {
                        Array.isArray(TeamMembers) && TeamMembers.length > 0 ? (
                            TeamMembers.map((team, index) => (
                                    <TeamMember
                                        key={index}
                                        src={team.photo}
                                        alt={team.name}
                                        width={team.width ?? 320}
                                        height={team.height ?? 376}
                                        title={team.name}
                                        position={team.position}
                                        text={team.bio}
                                    />
                            ))
                        ) : (
                            <p>No team members were found</p>
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default Team;