'use client';
import styles from './SubscribeForm.module.scss';
import { BtnArrUp } from '@/components/svgs/index';
import {useState} from "react";
import SentAnim from './SentAnim';

const SubscribeForm = () => {
    const [error, setError] = useState('');
    const [formSubmitted, setformSubmitted] = useState(false);
    const [formDisabled, setformDisabled] = useState(false);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setformDisabled(true);
        setError('');
        const email = document.getElementById('sb-email').value;
        if (!validateEmail(email)) {
            setError('PLEASE ENTER CORRECT EMAIL ADDRESS...');
            setformDisabled(false);
            return;
        }
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('email', email);

        // Perform the API request to subscribe
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                body: formDataToSubmit,
            });

            if (response.ok) {
                setformSubmitted(true);
                setformDisabled(false);
                document.getElementById('sb-email').value = '';
                setError('');
            } else {
                const data = await response.json();
                setError(data.error || 'Unknown error')
            }
        } catch (error) {
            setError('Error subscribing')
        }
    };

    return (
        <div className={styles['sbs-form']}>
            <form name="subscribe-form" id="sb-form" method="post" autoComplete="off">
                <div className={`${styles['sb-row']} fx fx-jb`}>
                    <div className={`${styles['sb-col']} ${formSubmitted ? styles.hidden : '' }`}>
                        <input type="email"
                               name="sb-email"
                               id="sb-email"
                               defaultValue=""
                               placeholder="YOUR EMAIL"
                               autoComplete="off" 
                        />
                    </div>
                    <div className={`${styles['sb-btn-col']} btn-primary-sm fx fx-ac fx-jc ${formSubmitted ? styles.hidden : ''} ${formDisabled ? styles.disabled : ''}`}>
                        <input type="submit" name="sb-submit-btn" id="sb-submit-btn" defaultValue="Send" onClick={handleSubmit}/>
                        <div className={`${styles['btn-arr']}`}>
                            <BtnArrUp />
                        </div>
                    </div>
                    <SentAnim formSubmitted={formSubmitted}/>
                </div>
                <div className={`${styles['sb-form-msg']} ${ error && error !== '' ? '' : styles['hidden'] }`}>
                    <span>{error}</span>
                </div>
            </form>
        </div>
    );
}

export default SubscribeForm;