import styles from './ProcessItems.module.scss'
import ProcessItem from './ProcessItem'

const ProcessItems = ({data, list}) => {
    const title = data?.['cp_pc_title']?.['meta_value']
        ?? data?.['clb_title']?.['meta_value']
        ?? null;
    const text = data?.['cp_pc_text']?.['meta_value']
        ?? data?.['clb_text']?.['meta_value']
        ?? null;
    const processItems = (list && list.success && true) ? list?.data : null;

    return (
        <section className="pg-section pg-section-pd bg-dark">
            <div className="container">
                <div className="sc-wrap">
                    <div className={`ps-inner fx fx-jb`}>
                        <div className={`sc-lcol-w sc-col-wh-hd`}>
                            <h2>{title}</h2>
                        </div>
                        <div className={`sc-rcol-w`}>
                            <div className={`sc-txt`}>
                                <p>{text}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles['prc-items']} fx fx-wrap fx-jb`}>
                    {
                        Array.isArray(processItems) && processItems.length > 0 ? (
                            processItems.map((process, index) => (
                                    <ProcessItem
                                        key={index}
                                        src1={process.main_photo}
                                        src2={process.hover_photo}
                                        alt={process.title}
                                        width={process.width ?? 199}
                                        height={process.height ?? 157}
                                        title={process.title}
                                        desc={process.description}
                                    />
                            ))
                        ) : (
                            <p>No process items were found</p>
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default ProcessItems;