import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {VideoIcon} from "@/components/svgs/admin";
import Image from "next/image";

const Tab3 = ({formData, handleInputChange, selectedMedia, errorMessage, subType}) => {
    const videoUrl = selectedMedia?.video?.video?.preview ? selectedMedia.video.video.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/home/${selectedMedia?.video.video}`;
    const videoPoster = selectedMedia?.video?.poster?.preview ? selectedMedia?.video.poster.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/home/${selectedMedia?.video.poster}`;
    return (
    <div className={`${styles['admin-fields-wrap']}`}>
        <div className={`${styles['admin-field']}`}>
            <label>Video</label>
            {!videoUrl ? (
                <div className={`${styles['admin-field-Vd-main']}`}>
                    <input
                        type="file"
                        id="video-file"
                        name="video-file"
                        accept=".mp4"
                        autoComplete="off"
                    />
                    <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpV']} fx fx-jc fx-ac`}>
                        <div className="fx fx-wrap fx-jc f-dir-col">
                            <VideoIcon />
                            <span>Choose File</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`${styles['admin-field-video']} fx fx-wrap`}>
                    <div className={`${styles['admin-video']} fwidth`}>
                        <video key={videoUrl} width="320" height="240" controls>
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className={`${styles['admin-Vd-btn']}`}>
                        <input
                            type="file"
                            id="video-file"
                            name="video-file"
                            accept=".mp4"
                            autoComplete="off"
                            onChange={(event) => handleInputChange('video', event.target.value, subType, {
                                file: event,
                                accept: ['video/mp4', 'image/jpg'],
                                size: 76758675
                            })}
                        />
                        <span>Choose File</span>
                    </div>
                </div>
            )}
            {errorMessage.video &&
                <div className={`${styles['admin-err-area']}`}>
                    <div className={`${styles['admin-err']}`}>
                        <span>{errorMessage.video}</span>
                    </div>
                </div>
            }
        </div>
        <div className={`${styles['admin-field']}`}>
            <label>Poster</label>
            {!videoPoster ? (
                <div className={`${styles['admin-field-Vd-main']}`}>
                    <input
                        type="file"
                        id="poster-file"
                        name="poster-file"
                        accept=".jpeg, .jpg, .png, .webp"
                        autoComplete="off"
                        onChange={(event) => handleInputChange('poster', event.target.value, subType, {
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
                <div className={`${styles['admin-field-videoP']} fx fx-wrap`}>
                    <div className={`${styles['admin-videoP']} fwidth`}>
                        <Image
                            src={videoPoster}
                            width="600"
                            height="400"
                            alt='video poster'
                        />
                    </div>
                    <div className={`${styles['admin-VdP-btn']}`}>
                        <input
                            type="file"
                            id="poster-file"
                            name="poster-file"
                            accept=".jpeg, .jpg, .png, .webp"
                            autoComplete="off"
                            onChange={(event) => handleInputChange('poster', event.target.value, subType, {
                                file: event,
                                accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
                                size: 5242880
                            })}
                        />
                        <span>Choose File</span>
                    </div>
                </div>
            )}
            {errorMessage.poster &&
                <div className={`${styles['admin-err-area']}`}>
                    <div className={`${styles['admin-err']}`}>
                        <span>{errorMessage.poster}</span>
                    </div>
                </div>
            }
        </div>
    </div>
)}

export default Tab3