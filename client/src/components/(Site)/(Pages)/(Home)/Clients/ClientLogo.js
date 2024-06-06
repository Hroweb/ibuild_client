import Image from "next/image";
import styles from './Clients.module.scss';

const ClientLogo = ({ src, alt }) => {
    const logo = (src && true) ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/clients/${src}` : null;
    return (
        <div className={styles['client-logo']}>
            <Image src={logo} alt={alt} width={120} height={60} />
        </div>
    )
}

export default ClientLogo;