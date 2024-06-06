import styles from './ContactBar.module.scss';
import Link from "next/link";

const ContactBar = ({render}) => {
    const data = {
        text: render
            ? render === 'cases' ? 'See all Cases'
                : render === 'blog' ? 'Subscribe to our news'
                    : 'Let’s work together'
            : 'Let’s work together',
        button: render
            ? render === 'cases' ? 'See all Cases'
                : render === 'blog' ? 'Subscribe to our news'
                    : 'Contact us'
            : 'Contact us',
        link: render
            ? render === 'cases' ? '/portfolio'
                : render === 'blog' ? '/blog'
                    : '/contact-us'
            : '/contact-us',
    };
    const renderCTBars = () => {
        const ctBars = [];


        for (let i = 0; i < 6; i++) {
            ctBars.push(
                <div key={i} className={`${styles['ct-bar']} fx fx-ac`}>
                    <div className={styles['wh-dot']}></div>
                    <div className={styles['ct-bar-txt']}>
                        <span>{data.text}</span>
                    </div>
                    <div className={styles['wh-dot']}></div>
                    <div className="btn-primary btn-primary-wh fx fx-ac fx-jc">
                        <span>{data.button}</span>
                    </div>
                </div>
            );
        }

        return ctBars;
    };
    return (
        <section className={`pg-section ${styles['contact-bar']}`}>
            <Link href={data.link}>
                <div className={`${styles['ct-bar-row']} fx`}>
                    {renderCTBars()}
                </div>
            </Link>
        </section>
    );
}

export default ContactBar;