import styles from './EventLogos.module.scss';
import EventLogo from "@/components/(Site)/(Pages)/(Home)/EventLogos/EventLogo";

const EventLogos = ({data}) => {
    const eventLogosData = data?.data ?? [];
    if (!eventLogosData || eventLogosData.length === 0) {
        return null; // Or you can return some fallback UI, like a message or a placeholder
    }

    return (
        <section className="event-logos">
            <div className={`${styles['ev-logos-row']} fx`}>
                <div className={`${styles['ev-logo-bar']} fx`}>
                    {eventLogosData.map((event, index) => (
                        <EventLogo key={index} {...event} />
                    ))}
                </div>
                <div className={`${styles['ev-logo-bar']} fx`}>
                    {eventLogosData.map((event, index) => (
                        <EventLogo key={index} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventLogos;