import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import InputField from '@/components/(Admin)/InputField/InputField'

const FeaturedPostBlock = ({featured, chosen, handleInputChange}) => {
    return (
        <div className={`${styles['case-top-box']} fx fx-jb`}>
            <h3>Case Actions</h3>
            <a
                className={`fx fx-ac`}
            >
                <div className={`${styles['case-inp']} fx`}>
                    <InputField
                        type="checkbox"
                        id={`ft-case`}
                        checked={featured === '1' ? 'checked' : false}
                        onChange={(e) => handleInputChange('featured', e.target.checked ? '1' : '0')}
                    />
                </div>
                <label htmlFor={`ft-case`}>Make as Featured Case</label>
            </a>
            <a
                className={`fx fx-ac`}
            >
                <div className={`${styles['case-inp']} fx`}>
                    <InputField
                        type="checkbox"
                        id={`ft-case-chosen`}
                        checked={chosen === '1' ? 'checked' : false}
                        onChange={(e) => handleInputChange('chosen', e.target.checked ? '1' : '0')}
                    />
                </div>
                <label htmlFor={`ft-case-chosen`}>Make Primary</label>
            </a>
        </div>
    )
}

export default FeaturedPostBlock;