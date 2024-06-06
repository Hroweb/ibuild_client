import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from '@/components/(Admin)/InputField/InputField'

const FiltersBarOption = ({ title, slug, index, checked, onChange }) => {
    return (
        <a
            className={`fx fx-ac fx-jb`}
            data-slug={slug}
        >
            <label htmlFor={`${slug}-flt-opt-${index}`}>{title}</label>
            <div className={`${styles['flt-inp']} fx`}>
                <InputField
                    type="checkbox"
                    id={`${slug}-flt-opt-${index}`}
                    checked={checked}
                    onChange={onChange}
                />
            </div>
        </a>
    )
}

export default FiltersBarOption;