"use client"
import { useState, useEffect } from 'react';
import styles from './CookieBar.module.scss'
import Link from "next/link"
import {CookieIcon, CookieX} from '@/components/svgs/index'
import { useConsent } from "@/context/ConsentContext"
import { setCookie, getCookie } from "@/utils/cookieUtils"

const CookieBar = ({text}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [className, setClassName] = useState('ck-init');
    const [showInitialView, setShowInitialView] = useState(true);
    const [isCustomized, setIsCustomized] = useState(false);
    const [isNecessaryVisible, setIsNecessaryVisible] = useState(false);
    const [isFunctionalVisible, setIsFunctionalVisible] = useState(false);
    const [isAnalyticsVisible, setIsAnalyticsVisible] = useState(false);
    const [isAdvertisementVisible, setIsAdvertisementVisible] = useState(false);

    const { updateConsent } = useConsent();
    const [ckFunctional, setCkFunctional] = useState('0');
    const [ckAnalytics, setCkAnalytics] = useState('0');
    const [ckAds, setCkAds] = useState('0');

    useEffect(() => {
        const checkConsentAndSetCookies = () => {
            const ckFunctional = getCookie('gc_functional') === 'true' ? 'granted' : 'denied';
            const ckAnalytics = getCookie('gc_analytics') === 'true' ? 'granted' : 'denied';
            const ckAds = getCookie('gc_ads') === 'true' ? 'granted' : 'denied';
    
            setCkFunctional(ckFunctional === 'granted' ? '1' : '0');
            setCkAnalytics(ckAnalytics === 'granted' ? '1' : '0');
            setCkAds(ckAds === 'granted' ? '1' : '0');
    
            if (ckFunctional || ckAnalytics || ckAds) {
                setClassName('ck-exists');
                setIsVisible(true);
                setShowInitialView(false);
            } else {
                setClassName('ck-init');
                setIsVisible(false);
                setShowInitialView(true);
            }
    
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                    'ad_storage': ckAds,
                    'ad_user_data': ckAds,
                    'ad_personalization': ckAds,
                    'analytics_storage': ckAnalytics,
                    'functionality_storage': ckFunctional,
                    'personalization_storage': ckFunctional,
                    'security_storage': 'granted',
				    'wait_for_update': 500
                });
            }
        };
    
        if (hasMounted) {
            checkConsentAndSetCookies();
        }
    }, [hasMounted]);


    const handleAccept = () => {
        //updateConsent('granted', 'granted');
        setCookie('gc_functional', 'true', 365);
        setCookie('gc_analytics', 'true', 365);
        setCookie('gc_ads', 'true', 365);

        handleCookieToggle('functional', 'accept');
        handleCookieToggle('analytics', 'accept');
        handleCookieToggle('ads', 'accept');

        setTimeout(() => {
            setIsVisible(false);
            setShowInitialView(false);
        }, 1000);
    };

    const handleReject = () => {
        //updateConsent('denied', 'denied');
        setCookie('gc_functional', 'false', 365);
        setCookie('gc_analytics', 'false', 365);
        setCookie('gc_ads', 'false', 365);
        
        handleCookieToggle('functional', 'reject');
        handleCookieToggle('analytics', 'reject');
        handleCookieToggle('ads', 'reject');

        setTimeout(() => {
            setIsVisible(false);
            setShowInitialView(false);
        }, 1000);
    };

    const handleCustomize = () => {
        setIsCustomized(!isCustomized);
    };

    const openCkPopup = () => {
        setShowInitialView(true);
    };

    useEffect(() => {
        setHasMounted(true);
    }, []);
    

    const closeCookieBar = () => {
        setIsVisible(false);
        setShowInitialView(false);
    };

    const toggleNecessaryContent = () => setIsNecessaryVisible(!isNecessaryVisible);
    const toggleFunctionalContent = () => setIsFunctionalVisible(!isFunctionalVisible);
    const toggleAnalyticsContent = () => setIsAnalyticsVisible(!isAnalyticsVisible);
    const toggleAdvertisementContent = () => setIsAdvertisementVisible(!isAdvertisementVisible);

    const handleCookieToggle = (type, action) => {
        let newValue = action === 'accept' ? '1' : '0';
        const consentValues = {};
        switch (type) {
            case 'functional':
                setCkFunctional(newValue);
                setCookie('gc_functional', newValue === '1' ? 'true' : 'false', 365);
                consentValues.functionality_storage = newValue === '1' ? 'granted' : 'denied';
                consentValues.personalization_storage = newValue === '1' ? 'granted' : 'denied';
                break;
            case 'analytics':
                setCkAnalytics(newValue);
                setCookie('gc_analytics', newValue === '1' ? 'true' : 'false', 365);
                consentValues.analytics_storage = newValue === '1' ? 'granted' : 'denied';
                break;
            case 'ads':
                setCkAds(newValue);
                setCookie('gc_ads', newValue === '1' ? 'true' : 'false', 365);
                consentValues.ad_storage = newValue === '1' ? 'granted' : 'denied';
                consentValues.ad_user_data = newValue === '1' ? 'granted' : 'denied';
                consentValues.ad_personalization = newValue === '1' ? 'granted' : 'denied';
                break;
            default:
                break;
        }
        updateConsent(consentValues);
    };

    return (
        <>
            <div className={`${styles['cookie-bar']} ${isVisible ? `${styles['ck-exists']}` : `${styles['ck-init']} ${styles['visible']}`} ${isCustomized ? styles['ck-customize'] : ''}`}>
                <div onClick={openCkPopup} className={`${styles['ck-initial-view']} ${!showInitialView ? styles['visible'] : styles['hidden']}`}>
                    <CookieIcon />
                    <span>Cookies <br/>Policy</span>
                </div>
                <div className={`${styles['cookie-bar-wrap']} ${showInitialView ? styles['visible'] : styles['hidden']} fx fx-jb fx-wrap`}>
                    <div className={`${styles['ck-close']}`} onClick={closeCookieBar}>
                        <CookieX />
                    </div>
                    <div className={`${styles['ck-icon']}`}>
                        <CookieIcon />
                    </div>
                    <p className={`${styles['cookie-gn-text']}`} dangerouslySetInnerHTML={{ __html: text }} />
                    <div className={`${styles['ck-preferences']}`}>
                        <div className={`${styles['ck-preference-wrap']}`}>
                            <div className={`${styles['ck-popup-text']}`}>
                                <p>We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below. The cookies that are categorized as &quot;Necessary&quot; are stored on your browser as they are essential for enabling the basic functionalities of the site. We also use third-party cookies that help us analyze how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent. </p>
                                <p>You can choose to opt-out of these cookies. But opting out of some of these cookies may have an effect on your browsing experience as per the descriptions to be found within the respective categories below.</p>
                            </div>
                            <div className={`${styles['ck-categories']}`}>
                                <div className={`${styles['ck-category-row']}`} onClick={toggleNecessaryContent}>
                                    <div className={`${styles['ck-category-info']} fx fx-ac fx-jb`}>
                                        <div className={`${styles['ck-category-name']} fx fx-ac`}>
                                            <span>Necessary</span>
                                        </div>
                                        <div>
                                            <span className={`${styles['ck-category-type']}`}>Always Enabled</span>
                                        </div>
                                    </div>
                                    {isNecessaryVisible && (
                                        <div className={`${styles['ck-category-content']}`}>
                                            <div className={`${styles['ck-content-wrap']}`}>
                                                <div className={`${styles['ck-description']}`}>
                                                    <p>Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.</p>
                                                </div>
                                                <div className={`${styles['ck-list']}`}>
                                                    <div className={`${styles['ck-row']} fx fx-wrap`}>
                                                        <p>Cookie: PHPSESSID</p>
                                                        <p>Duration: Session</p>
                                                        <p>Description: This cookie is native to PHP applications. The cookie is used to store and identify a users unique session ID for the purpose of managing user session on the website. The cookie is a session cookies and is deleted when all the browser windows are closed.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`${styles['ck-category-row']}`} onClick={toggleFunctionalContent}>
                                    <div className={`${styles['ck-category-info']} fx fx-ac fx-jb`}>
                                        <div className={`${styles['ck-category-name']} fx fx-ac`}>
                                            <span>Functional</span>
                                        </div>
                                        <div>
                                            <div className={`fx`}>
                                                <label className={`${styles['switcher-toggle']} fx fx-ac`} data-type="functional">
                                                    <input
                                                        type="checkbox"
                                                        name="functional-cookie-option"
                                                        checked={ckFunctional === '1'}
                                                        onChange={(e) => handleCookieToggle('functional', e.target.checked ? 'accept' : 'reject')}
                                                        autoComplete="off"
                                                    />
                                                    <div className={`${styles['form-switcher']} ${ckFunctional === '1' ? `${styles['switcher-on']}` : `${styles['switcher-off']}`} ${styles['sw-toggle']} fx fx-ac`}>
                                                        <span className={`${styles['form-switch-on']} ${styles['sw-toggle']}`}>On</span>
                                                        <span className={`${styles['form-switch-off']} ${styles['sw-toggle']}`}>Off</span>
                                                        <div className={`${styles['form-switch-slider']} ${styles['sw-toggle']}`}></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {isFunctionalVisible && (
                                        <div className={`${styles['ck-category-content']}`}>
                                            <div className={`${styles['ck-content-wrap']}`}>
                                                <div className={`${styles['ck-description']}`}>
                                                    <p>Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`${styles['ck-category-row']}`} onClick={toggleAnalyticsContent}>
                                    <div className={`${styles['ck-category-info']} fx fx-ac fx-jb`}>
                                        <div className={`${styles['ck-category-name']} fx fx-ac`}>
                                            <span>Analytics</span>
                                        </div>
                                        <div>
                                            <div className={`fx`}>
                                                <label className={`${styles['switcher-toggle']} fx fx-ac`} data-type="analytics">
                                                    <input
                                                        type="checkbox"
                                                        name="analytics-cookie-option"
                                                        checked={ckAnalytics === '1'}
                                                        onChange={(e) => handleCookieToggle('analytics', e.target.checked ? 'accept' : 'reject')}
                                                        autoComplete="off"
                                                    />
                                                    <div className={`${styles['form-switcher']} ${ckAnalytics === '1' ? `${styles['switcher-on']}` : `${styles['switcher-off']}`} ${styles['sw-toggle']} fx fx-ac`}>
                                                        <span className={`${styles['form-switch-on']} ${styles['sw-toggle']}`}>On</span>
                                                        <span className={`${styles['form-switch-off']} ${styles['sw-toggle']}`}>Off</span>
                                                        <div className={`${styles['form-switch-slider']} ${styles['sw-toggle']}`}></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {isAnalyticsVisible && (
                                        <div className={`${styles['ck-category-content']}`}>
                                            <div className={`${styles['ck-content-wrap']}`}>
                                                <div className={`${styles['ck-description']}`}>
                                                    <p>Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.</p>
                                                </div>
                                                <div className={`${styles['ck-list']}`}>
                                                    <div className={`${styles['ck-row']} fx fx-wrap`}>
                                                        <p>Cookie: _ga_*</p>
                                                        <p>Duration: 1 year 1 month 4 days</p>
                                                        <p>Description: Google Analytics sets this cookie to store and count page views.</p>
                                                    </div>
                                                    <div className={`${styles['ck-row']} fx fx-wrap`}>
                                                        <p>Cookie: _ga</p>
                                                        <p>Duration: 1 year 1 month 4 days</p>
                                                        <p>Description: Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage for the site&apos;s analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognise unique visitors.</p>
                                                    </div>
                                                    <div className={`${styles['ck-row']} fx fx-wrap`}>
                                                        <p>Cookie: _gcl_au</p>
                                                        <p>Duration: 3 months</p>
                                                        <p>Description: Google Tag Manager sets the cookie to experiment advertisement efficiency of websites using their services.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`${styles['ck-category-row']}`} onClick={toggleAdvertisementContent}>
                                    <div className={`${styles['ck-category-info']} fx fx-ac fx-jb`}>
                                        <div className={`${styles['ck-category-name']} fx fx-ac`}>
                                            <span>Advertisement</span>
                                        </div>
                                        <div>
                                            <div className={`fx`}>
                                                <label className={`${styles['switcher-toggle']} fx fx-ac`} data-type="ads">
                                                    <input
                                                        type="checkbox"
                                                        name="ads-cookie-option"
                                                        checked={ckAds === '1'}
                                                        onChange={(e) => handleCookieToggle('ads', e.target.checked ? 'accept' : 'reject')}
                                                        autoComplete="off"
                                                    />
                                                    <div className={`${styles['form-switcher']} ${ckAds === '1' ? `${styles['switcher-on']}` : `${styles['switcher-off']}`} ${styles['sw-toggle']} fx fx-ac`}>
                                                        <span className={`${styles['form-switch-on']} ${styles['sw-toggle']}`}>On</span>
                                                        <span className={`${styles['form-switch-off']} ${styles['sw-toggle']}`}>Off</span>
                                                        <div className={`${styles['form-switch-slider']} ${styles['sw-toggle']}`}></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {isAdvertisementVisible && (
                                        <div className={`${styles['ck-category-content']}`}>
                                            <div className={`${styles['ck-content-wrap']}`}>
                                                <div className={`${styles['ck-description']}`}>
                                                    <p>Advertisement cookies are used to provide visitors with customized advertisements based on the pages you visited previously and to analyze the effectiveness of the ad campaigns.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['cookie-btns']} fx`}>
                        <button className="fx fx-ac fx-jc" onClick={handleAccept}>Accept All</button>
                        <button className="fx fx-ac fx-jc" onClick={handleCustomize}>Customize</button>
                        <button className="fx fx-ac fx-jc" onClick={handleReject}>Reject All</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CookieBar;