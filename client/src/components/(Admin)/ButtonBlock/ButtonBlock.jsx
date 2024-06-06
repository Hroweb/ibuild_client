import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from "@/components/(Admin)/InputField/InputField"

const ButtonBlock = ({sectionTitle, inputID, inputVal, onChange}) => {
    return (
        <div className={`${styles['admin-field']} ${styles['admin-field-hf']}`}>
            <label>{sectionTitle}</label>
            <div className={`${styles['admin-field-inp']}`}>
                <InputField
                    type="text"
                    id={inputID}
                    name={inputID}
                    placeholder="Add your text here..."
                    autoComplete="off"
                    value={inputVal}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default ButtonBlock;