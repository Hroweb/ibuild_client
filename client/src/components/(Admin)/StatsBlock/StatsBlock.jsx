import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import StatRow from './StatRow';

const StatsBlock = ({sectionTitle, onChange1, inputVal1, onChange2, inputVal2, onChange3, inputVal3}) => {
    return(
        <div className={`${styles['admin-field-group']}`}>
            <p>{sectionTitle}</p>
            <StatRow
                title="Projects finished"
                onChange={onChange1}
                inputVal={inputVal1}
                inputId="hp-stat-1"
            />
            <StatRow
                title="Years of Experience"
                onChange={onChange2}
                inputVal={inputVal2}
                inputId="hp-stat-2"
            />
            <StatRow
                title="Clients worldwide"
                onChange={onChange3}
                inputVal={inputVal3}
                inputId="hp-stat-3"
            />
        </div>
    );
}

export default StatsBlock;