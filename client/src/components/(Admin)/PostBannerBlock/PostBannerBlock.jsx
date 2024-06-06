import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import { VideoIcon } from '@/components/svgs/admin'
import InputField from '@/components/(Admin)/InputField/InputField'
import Image from "next/image"

const PostBannerBlock = ({ sectionTitle, selectedFile, inputID, handleInputChange, inputFileID, errorMessage }) => {
    return (
        <div className={`${styles['admin-field']}`}>
            <label>{ sectionTitle }</label>
            {!selectedFile ? (
                <div className={`${styles['admin-field-Vd-main']}`}>
                    <InputField
                        type="file"
                        id={inputID}
                        accept=".jpeg, .jpg, .png, .webp"
                        onChange={(event) => handleInputChange(inputFileID, event.target.value, {
                            file: event,
                            accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
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
                    <div className={`${styles['admin-bannerP']} ${styles['no-bg']} fwidth`}>
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
                            accept=".jpeg, .jpg, .png, .webp"
                            onChange={(event) => handleInputChange(inputFileID, event.target.value, {
                                file: event,
                                accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
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
    )
}

export default PostBannerBlock;