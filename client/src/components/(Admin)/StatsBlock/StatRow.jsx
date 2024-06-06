import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from "@/components/(Admin)/InputField/InputField"

const StatRow = ({title, onChange, inputVal, inputId}) => {
    return(
        <div className={`fx fx-jb`}>
            <div className={`${styles['admin-field-col']}`}>
                <label>{title}</label>
            </div>
            <div className={`${styles['admin-field-col']}`}>
                <div className={`${styles['admin-field']}`}>
                    <div className={`${styles['admin-field-inp']}`}>
                        <InputField
                            type="text"
                            id={inputId}
                            name={inputId}
                            placeholder="Add your title here..."
                            autoComplete="off"
                            value={inputVal}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatRow;