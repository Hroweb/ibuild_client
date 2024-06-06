'use client';
import React, { createContext, useState } from 'react';

export const QuoteModalContext = createContext({
    isQuotePPVisible: false,
    toggleQuotePPClass: () => {},
});

export const QuoteModalProvider = ({ children }) => {
    const [isQuotePPVisible, setIsQuotePPVisible] = useState(false);
    const toggleQuotePPClass = () => setIsQuotePPVisible(!isQuotePPVisible);

    return (
        <QuoteModalContext.Provider value={{ isQuotePPVisible, toggleQuotePPClass }}>
            {children}
        </QuoteModalContext.Provider>
    );
};
