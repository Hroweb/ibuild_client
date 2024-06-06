import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import { ErrorIcon } from '@/components/svgs/admin'

const DescBlock = ({sectionTitle, sectionTitleVal, onChange, inputId, inputName, isValid, classname}) => {
    return(
        <div className={`${styles['admin-field']} ${isValid ? styles['invalid'] : ''}`}>
            <label htmlFor={inputId}>{sectionTitle}</label>
            <div className={`${styles['admin-field-inp']} ${classname}`}>
                <textarea
                    id={inputId}
                    name={inputName}
                    placeholder="Add your text here..."
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

export default DescBlock;