import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from '@/components/(Admin)/InputField/InputField'
import Image from "next/image"

const ImageBlock = ({ label, selectedFile, inputID, imageAlt, bg, rounded, onChange, errorMessage }) => {
    return (
        <div className={`${styles['admin-field-row']} fx fx-wrap fx-jb`}>
            <label>{label}</label>
            {!selectedFile ? (
                <div className="fx fx-wrap fx-jb fwidth">
                    <div className={`${styles['admin-field']} ${styles['admin-field-qt-col']} fx fx-wrap`}>
                        <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpG']} fx fx-jc fx-ac`}>
                            <InputField
                                type="file"
                                id={inputID}
                                accept=".jpeg, .png, .jpg, .svg"
                                onChange={onChange}
                            />
                        </div>
                        <div className={`${styles['admin-choose-btn']}`}>
                            <InputField
                                type="file"
                                id={inputID}
                                accept=".jpeg, .png, .jpg, .svg"
                                onChange={onChange}
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
                            onChange={onChange}
                        />
                        <span>Change File</span>
                    </div>
                </div>
            )}
            {errorMessage &&
                <div className={`${styles['admin-err']}`}>
                    <span>{errorMessage}</span>
                </div>
            }
        </div>
    );
}

export default ImageBlock;