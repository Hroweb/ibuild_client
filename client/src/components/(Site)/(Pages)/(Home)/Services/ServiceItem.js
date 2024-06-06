'use client'
import st from './Services.module.scss';
import Link from "next/link";
import SvArrLottieAnimation from '@/components/(Site)/(Animations)/SvArrLottieAnimation/SvArrLottieAnimation'

const ServiceItem = ({ title, description, animationData, containerId, isGeneral, subtitle, fulltext }) => {
    if(isGeneral){
        return (
            <div className={`${st['sv-item']} ${st['sv-item-gn']} fx fx-as fx-jb`} id={`sv-item-${containerId}`}>
                <div className={st['sv-gn-lcol']}>
                    <h3>{title}</h3>
                </div>
                <div className={`${st['sv-gn-rcol']} fx fx-jb fx-ac`}>
                    <div className={st['sv-desc']}>
                        <strong>{subtitle}</strong>
                        <p>{fulltext}</p>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className={`${st['sv-item']} fx fx-ac fx-jb`} id={`sv-item-${containerId}`}>
                <Link href="/services/" className={`fx fx-ac fx-jb`}>
                    <div className={st['sv-it-lcol']}>
                        <h3>{title}</h3>
                    </div>
                    <div className={`${st['sv-it-rcol']} fx fx-jb fx-ac`}>
                        <div className={st['sv-desc']}>
                            <p>{description}</p>
                        </div>
                        <div id={`sv-anim-container-${containerId}`} className={`${st['sv-anim-container']} lt-anim-ts`}>
                            <SvArrLottieAnimation animationData={animationData} containerId={`sv-anim-container-${containerId}`} rowId={`sv-item-${containerId}`} />
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default ServiceItem