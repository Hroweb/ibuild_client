"use client";
import React, { createContext, useContext } from 'react';

const ConsentContext = createContext();

export function ConsentProvider({ children }) {
    const updateConsent = (consentValues) => {
        if (typeof window !== "undefined" && window.gtag) {
            const defaultConsent = {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
				'wait_for_update': 500
            };

            // Merge the provided consent values with the defaults
            const updatedConsent = { ...defaultConsent, ...consentValues };

            window.gtag('consent', 'update', updatedConsent);
        }
    };

    return (
        <ConsentContext.Provider value={{ updateConsent }}>
            {children}
        </ConsentContext.Provider>
    );
}

export function useConsent() {
    return useContext(ConsentContext);
}