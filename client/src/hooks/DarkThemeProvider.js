'use client'
import { createContext, useContext, useEffect, useState } from 'react';

export const DarkThemeContext = createContext();

export const DarkThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    useEffect(() => {
        const sectionObservers = [];
        const sections = document.querySelectorAll('.pg-section');

        sections.forEach((section) => {
            const sectionOptions = {
                root: null,
                rootMargin: '0px',
                threshold: section.classList.contains('services') ? 0.5 : 0.7,
            };

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsDarkTheme(entry.target.classList.contains('bg-dark'));
                    }
                });
            }, sectionOptions);

            sectionObserver.observe(section);
            sectionObservers.push(sectionObserver);
        });

        // Clean up the observers when the component unmounts
        return () => {
            sectionObservers.forEach((observer) => observer.disconnect());
        };
    }, []);

    return (
        <DarkThemeContext.Provider value={isDarkTheme}>
            {children}
        </DarkThemeContext.Provider>
    );
};

export const useDarkTheme = () => {
    return useContext(DarkThemeContext);
};
