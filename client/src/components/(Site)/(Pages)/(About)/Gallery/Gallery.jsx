import styles from './Gallery.module.scss'
import GallerySlider from './GallerySlider'

const Gallery = ({ data, list }) => {
    const title = data?.['cp_gal_title']?.['meta_value'] ?? ''
    const content = data?.['cp_gal_text']?.['meta_value'] ?? ''
    const photos = (list && list.success && true) ? list.data : null

    return (
        <section className={`pg-section pg-section-pd bg-light ${styles['gl-sc']}`}>
            <div className="container">
                <div className="fx fx-jb fx-as fx-wrap">
                    <div className={`${styles['gl-lcol']}`}>
                        <h2>{ title }</h2>
                        <div className={`${styles['gl-text']}`}>
                            <p> {content} </p>
                        </div>
                    </div>
                    <div className={`${styles['gl-rcol']}`}>
                        <div>
                            <GallerySlider photos={photos} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Gallery