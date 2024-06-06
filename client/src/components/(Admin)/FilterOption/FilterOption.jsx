import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import InputField from '@/components/(Admin)/InputField/InputField'

const FilterOption = ({ key, title, slug, index }) => {
    return (
        <a 
            className={`fx fx-ac fx-jb`} 
            data-slug={slug}
            key={key}
        >
            <label for={`flt-opt-${index}`}>{title}</label>
            <div className={`${styles['flt-inp']} fx`}>
                <InputField 
                    type="checkbox"
                    id={`flt-opt-${index}`}
                />
            </div>
        </a>
    )
}

export default FilterOption;