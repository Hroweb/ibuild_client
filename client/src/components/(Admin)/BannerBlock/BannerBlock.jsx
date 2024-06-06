import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import Image from "next/image"
import { VideoIcon } from '@/components/svgs/admin'
import InputField from '@/components/(Admin)/InputField/InputField'

const BannerBlock = ({ title, selectedFile, errorMessage, inputID, handleInputChange, subType }) => {
    return (
        <div className={`${styles['admin-field']}`}>
            <label>{title}</label>
            {!selectedFile ? (
                <div className={`${styles['admin-field-Vd-main']}`}>
                    <InputField
                        type="file"
                        id={inputID}
                        accept=".jpeg, .jpg, .png, .svg"
                        onChange={(event) => handleInputChange(inputID, event.target.value, subType, {
                            file: event,
                            accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'],
                            size: 5242880
                        })}
                    />
                    <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpV']} fx fx-jc fx-ac`}>
                        <div className="fx fx-wrap fx-jc f-dir-col">
                            <VideoIcon />
                            <span>Choose File</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`${styles['admin-field-banner']} fx fx-wrap`}>
                    <div className={`${styles['admin-bannerP']} fwidth`}>
                        <Image
                            src={selectedFile}
                            width="600"
                            height="400"
                            alt='banner image'
                        />
                    </div>
                    <div className={`${styles['admin-choose-btn']}`}>
                        <InputField
                            type="file"
                            id={inputID}
                            accept=".jpeg, .jpg, .png, .svg"
                            onChange={(event) => handleInputChange(inputID, event.target.value, subType, {
                                file: event,
                                accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'],
                                size: 5242880
                            })}
                        />
                        <span>Change File</span>
                    </div>
                </div>
            )}
            {errorMessage.banner &&
                <div className={`${styles['admin-err-area']}`}>
                    <div className={`${styles['admin-err']}`}>
                        <span>{errorMessage.banner}</span>
                    </div>
                </div>
            }
        </div>
    );
}

export default BannerBlock;