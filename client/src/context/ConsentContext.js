"use client";
import React, { createContext, useContext } from 'react';

const ConsentContext = createContext();

export function ConsentProvider({ children }) {
    const updateConsent = (consentValues) => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag('consent', 'update', consentValues);
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