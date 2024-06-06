import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import Image from "next/image"
import { VideoIcon } from '@/components/svgs/admin'
import InputField from '@/components/(Admin)/InputField/InputField'
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock"
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock"

const CaseBannerBlock = ({ sectionTitle, selectedFile, sectionTitleVal, sectionIntroTitleVal, bannerColorVal, handleInputChange, inputFileID, errorMessage }) => {
    return (
        <div className={`${styles['admin-case-block']}`}>
            <h3>{sectionTitle}</h3>
            <div className={`${styles['admin-case-wrap']} fwidth`}>
                <div className={`${styles['admin-field']}`}>
                    <label>Banner Image</label>
                    {!selectedFile ? (
                        <div className={`${styles['admin-field-Vd-main']}`}>
                            <InputField
                                type="file"
                                id="case-banner-file"
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
                                    id="case-banner-file"
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
                <TitleBlock
                    sectionTitle="Title"
                    sectionTitleVal={sectionTitleVal}
                    onChange={(event) => handleInputChange('title', event.target.value)}
                    inputID="case-title"
                    inputPlaceholder="Add your title here..."
                />
                <DescBlock
                    sectionTitle="Intro text"
                    sectionTitleVal={sectionIntroTitleVal}
                    inputID="case-intro-text"
                    inputName="case-intro-text"
                    onChange={(event) => handleInputChange('desc', event.target.value)}
                />
                <TitleBlock
                    sectionTitle="Banner Color (HEX)"
                    sectionTitleVal={bannerColorVal}
                    onChange={(event) => handleInputChange('bannerColor', event.target.value)}
                    inputID="case-bannerC"
                    inputPlaceholder="Add your color hex here..."
                />
            </div>
        </div>
    )
}

export default CaseBannerBlock;