"use client"
import React, { createContext, useContext } from 'react';

const ConsentContext = createContext();

export function ConsentProvider({ children }) {
    const updateConsent = (ad_storage, analytics_storage) => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': ad_storage,
                'analytics_storage': analytics_storage
            });
        }
    };

    console.log(updateConsent);

    return (
        <ConsentContext.Provider value={{ updateConsent }}>
            {children}
        </ConsentContext.Provider>
    );
}

export function useConsent() {
    return useContext(ConsentContext);
}