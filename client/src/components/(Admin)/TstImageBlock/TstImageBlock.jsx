import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from '@/components/(Admin)/InputField/InputField'
import Image from "next/image"

const TstImageBlock = ({ label, selectedFile, inputID, imageAlt, bg, rounded }) => {
    return (
        <div className={`${styles['admin-field-row']} fx fx-wrap fx-jb`}>
            <label>{label}</label>
            {!selectedFile ? (
                <div className="fx fx-wrap fx-jb fwidth">
                    <div className={`${styles['admin-field']} fx fx-wrap`}>
                        <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpImg']} ${rounded ? styles.bRadius : ''} fx fx-jc fx-ac`}>
                            <InputField 
                                type="file"
                                id={inputID}
                                accept=".jpeg, .png, .jpg, .svg"
                            />
                        </div>
                        <div className={`${styles['admin-choose-btn']} fwidth fx`}>
                            <InputField 
                                type="file"
                                id={inputID}
                                accept=".jpeg, .png, .jpg, .svg"
                            />
                            <span>Choose File</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`${styles['admin-field']} ${styles['admin-field-icon']} fx fx-wrap`}>
                    <div className={`${styles['admin-img-field']} ${bg ? styles.hasBg : ''} ${rounded ? styles.bRadius : ''}`}>
                        <Image 
                            src={selectedFile}
                            width="200"
                            height="200"
                            alt={imageAlt}
                        />
                    </div>
                    <div className={`${styles['admin-choose-btn']}`}>
                        <InputField 
                            type="file"
                            id={inputID}
                            accept=".jpeg, .png, .jpg, .svg"
                        />
                        <span>Change File</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TstImageBlock;