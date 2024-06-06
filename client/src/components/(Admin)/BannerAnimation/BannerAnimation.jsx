import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from '@/components/(Admin)/InputField/InputField'

const BannerAnimation = ({ animationFile, inputID, handleInputChange, errorMessage, inputFileID, subType }) => {
    return (
        <div className={`${styles['admin-field']}`}>
            <label>Banner Animation</label>
            {!animationFile ? (
                <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpF']}`}>
                    <InputField 
                        type="file"
                        id={inputID}
                        accept=".json"
                        onChange={(event) => handleInputChange(inputFileID, event.target.value, subType, {
                            file: event,
                            accept: ['application/json'],
                            size: 5242880
                        })}
                    />
                    <span>Choose the animation file</span>
                </div>
            ) : (
                <div className={`${styles['anim-file-sel']}`}>
                    <div className={`${styles['anim-file-sel-name']}`}>
                        <span>{animationFile}</span>
                    </div>
                    <div className={`${styles['admin-anim-btn']} fx`}>
                        <InputField
                            type="file"
                            id="bk-file"
                            accept=".json"
                            onChange={(event) => handleInputChange(inputFileID, event.target.value, subType, {
                                file: event,
                                accept: ['application/json'],
                                size: 5242880
                            })}
                        />
                        <span>Choose New File</span>
                    </div>
                </div>
            )}
            {errorMessage.pf_banner_anim &&
                <div className={`${styles['admin-err-area']}`}>
                    <div className={`${styles['admin-err']}`}>
                        <span>{errorMessage.pf_banner_anim}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default BannerAnimation;