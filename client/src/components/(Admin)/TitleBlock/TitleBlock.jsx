import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from "@/components/(Admin)/InputField/InputField"
import { ErrorIcon } from '@/components/svgs/admin'

const TitleBlock = ({sectionTitle, sectionTitleVal, onChange, inputID, inputPlaceholder, isValid, inputType = 'text', classname}) => {
    return(
        <div className={`${styles['admin-field']} ${isValid ? styles['invalid'] : ''}`}>
            <label htmlFor={inputID}>{sectionTitle}</label>
            <div className={`${styles['admin-field-inp']} ${classname}`}>
                <InputField
                    type={inputType}
                    id={inputID}
                    name={inputID}
                    placeholder={inputPlaceholder}
                    autoComplete="off"
                    value={sectionTitleVal}
                    onChange={onChange}
                />
            </div>
            {isValid && (
                <div className={`${styles['admin-err']} fwidth fx fx-ac`}>
                    <div className={`fx`}>
                        <ErrorIcon />
                    </div>
                    <span>This field can’t be empty. Please type something.</span>
                </div>
            )}
        </div>
    );
}

export default TitleBlock;