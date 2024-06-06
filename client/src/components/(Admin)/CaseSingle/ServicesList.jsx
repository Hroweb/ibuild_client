import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";

const ServicesList = ({ sectionTitle , dataSv, onServiceClick}) => {
    const attachedServices = dataSv.attached_services.reduce((acc, serviceId) => {
        acc[serviceId] = true;
        return acc;
    }, {});
    return (
        <div className={`${styles['admin-cat-block']} ${styles['admin-cat-block-case']} ${styles['admin-cat-block-sv']}`}>
            <h3>{sectionTitle}</h3>
            <div className={`${styles['admin-cat-wrap']} fwidth`}>
                <div>
                    <div className={`${styles['admin-cats-row']}`}>
                        <div className={`${styles['admin-cat-list']} fx fx-wrap`}>
                            {dataSv.all_services.map((item, index) => {
                                //const isSelected = Array.isArray(dataSv) && dataSv.some(attachedItem => attachedItem.title === item.title);
                                return (
                                    <a
                                        data-svid={item.id}
                                        key={index}
                                        className={attachedServices[item.id] ? styles['selected'] : ''}
                                        onClick={() => onServiceClick(item.id)}
                                    >
                                        {item.title}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesList;