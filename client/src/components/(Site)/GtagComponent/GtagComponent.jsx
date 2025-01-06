'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import Cookies from 'js-cookie';

const GtagComponent = () => {
    useEffect(() => {
        // Function to get cookie values
        const getCookie = (name) => Cookies.get(name);

        // Set consent values based on cookies
        const adStorageConsent = getCookie('gc_ads') === 'true' ? 'granted' : 'denied';
        const analyticsConsent = getCookie('gc_analytics') === 'true' ? 'granted' : 'denied';
        const functionalityConsent = getCookie('gc_functional') === 'true' ? 'granted' : 'denied';

        // Initialize GTM with consent
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-W25S3RRHLL');

        // Apply consent settings
        gtag('consent', 'update', {
            'ad_storage': adStorageConsent,
            'analytics_storage': analyticsConsent,
            'functionality_storage': functionalityConsent,
        });
    }, []);

    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-W25S3RRHLL" strategy="afterInteractive" />
        </>
    );
};

export default GtagComponent;
