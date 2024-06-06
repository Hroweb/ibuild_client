import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import StatsBlock from "@/components/(Admin)/StatsBlock/StatsBlock";

const Tab2 = ({formData, errorMessage, selectedMedia, handleInputChange, subType}) => {
const bannerAnim = selectedMedia?.banner?.banner_animation?.preview ? selectedMedia?.banner?.banner_animation?.preview : selectedMedia?.banner?.banner_animation;
    return (
        <div className={`${styles['admin-fields-wrap']}`}>
            <div className={`${styles['admin-field']}`}>
                <label>Banner Animation</label>
                {!bannerAnim ? (
                    <div className={`${styles['admin-field-inp']} ${styles['admin-field-inpF']}`}>
                        <input
                            type="file"
                            id="bk-file"
                            name="file"
                            accept=".json"
                            autoComplete="off"
                        />
                        <span>Choose the animation file</span>
                    </div>
                ) : (
                    <div className={`${styles['anim-file-sel']}`}>
                        <div className={`${styles['anim-file-sel-name']}`}>
                            <span>{bannerAnim}</span>
                        </div>
                        <div className={`${styles['admin-anim-btn']} fx`}>
                            <input
                                type="file"
                                id="anim-file"
                                name="anim-file"
                                accept=".json"
                                autoComplete="off"
                                onChange={(event) => handleInputChange('banner_animation', event.target.value, subType, {
                                    file: event,
                                    accept: ['application/json'],
                                    size: 5242880
                                })}
                            />
                            <span>Choose New File</span>
                        </div>
                    </div>
                )}
                {errorMessage.bannerAnim &&
                    <div className={`${styles['admin-err-area']}`}>
                        <div className={`${styles['admin-err']}`}>
                            <span>{errorMessage.bannerAnim}</span>
                        </div>
                    </div>
                }
            </div>
            <TitleBlock
                sectionTitle="Section title"
                sectionTitleVal={formData.banner_section_title}
                onChange={(event) => handleInputChange('banner_section_title', event.target.value, subType)}
                inputID="hp-title"
                inputPlaceholder="Add your title here..."
            />
            <DescBlock
                sectionTitle="Description"
                sectionTitleVal={formData.banner_section_desc}
                inputID="hp-desc"
                inputName="hp-desc"
                onChange={(event) => handleInputChange('banner_section_desc', event.target.value, subType)}
            />
            <StatsBlock
                sectionTitle="Stats"
                onChange1={(event) => handleInputChange('projects_finished', event.target.value, subType)}
                inputVal1={formData.projects_finished}
                onChange2={(event) => handleInputChange('years_of_experience', event.target.value, subType)}
                inputVal2={formData.years_of_experience}
                onChange3={(event) => handleInputChange('clients_worldwide', event.target.value, subType)}
                inputVal3={formData.clients_worldwide}
            />
        </div>
    )
}

export default Tab2