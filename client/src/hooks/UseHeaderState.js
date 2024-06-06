import { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

const useHeaderState = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [isHeaderVisible, setHeaderVisible] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Reset states on route change
        setScrolled(false);
        setIsDarkTheme(true);
        setHeaderVisible(false);

        // Scroll logic
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        // Intersection observer logic
        const sectionObservers = [];
        if (typeof window !== 'undefined') {
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
                            setIsDarkTheme(!entry.target.classList.contains('bg-dark'));
                        }
                    });
                }, sectionOptions);

                sectionObserver.observe(section);
                sectionObservers.push(sectionObserver);
            });
        }

        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
            sectionObservers.forEach((observer) => observer.disconnect());
        };
    }, [pathname, searchParams]);

    return { scrolled, isDarkTheme, isHeaderVisible, setHeaderVisible };
};

export default useHeaderState;