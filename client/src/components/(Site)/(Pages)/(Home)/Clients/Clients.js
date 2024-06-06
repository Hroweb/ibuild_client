import styles from './Clients.module.scss';
import ClientLogo from './ClientLogo';

const Clients = ({data, list}) => {
    const clientsList = list?.data || null;
    const title = data?.['clients_title']?.['meta_value']
        ?? data?.['cp_cl_title']?.['meta_value']
        ?? null;

    const desc = data?.['clients_desc']?.['meta_value']
        ?? data?.['cp_cl_text']?.['meta_value']
        ?? null;

    return (
        <section className={`pg-section pg-section-pd ${styles.clients} bg-dark`}>
            <div className="container">
                <div className="sc-wrap">
                    <h2>{title}</h2>
                    <div className={`sc-inner`}>
                        <div className={`sc-lcol`}>
                            <div className={`sc-txt`}>
                                <p>{desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['cl-logos-list']} fx fx-wrap fx-ac`}>
                        {
                            Array.isArray(clientsList) && clientsList.length > 0 ? (
                                clientsList.map((event, index) => (
                                    <ClientLogo
                                        key={index}
                                        src={event.logo}
                                        alt={event.title}
                                    />
                                ))
                            ) : (
                                <p>No clients were found</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Clients;