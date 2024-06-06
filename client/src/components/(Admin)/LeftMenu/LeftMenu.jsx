"use client"
import { useState } from 'react';
import styles from './LeftMenu.module.scss';
import Link from 'next/link';
import { MenuArr } from '@/components/svgs/admin';
import { usePathname } from 'next/navigation';

const menuItems = [
    { href: '/admin', label: 'Homepage' },
    { href: '/admin/about-us', label: 'About Us', subMenuItems: ['Gallery', 'Our Team'] },
    { href: '/admin/services', label: 'Services', subMenuItems: ['Services List'] },
    { href: '/admin/portfolio', label: 'Portfolio', subMenuItems: ['Events', 'Case studies', 'Years', 'Stand sizes'] },
    { href: '/admin/blog', label: 'Blog', subMenuItems: ['Posts', 'Categories'] },
    { href: '/admin/our-process', label: 'Our Process' },
    { href: '/admin/event-logos', label: 'Event Logos' },
    { href: '/admin/testimonials', label: 'Testimonials' },
    { href: '/admin/our-clients', label: 'Our Clients' },
    { href: '/admin/contact', label: 'Contact Us' },
    { href: '/admin/privacy-policy', label: 'Privacy Policy' },
    { href: '/admin/cookie-policy', label: 'Cookie Policy' },
    { href: '/admin/terms-and-conditions', label: 'Terms & Conditions' }
];

const LeftMenu = () => {
    const pathName = usePathname();
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const toggleSubMenu = (index) => {
        setActiveSubMenu(activeSubMenu === index ? null : index);
    };

    const isActive = (href) => {
        const adminPath = '/admin/';
        const strippedHref = href.startsWith(adminPath) ? href.substring(adminPath.length) : href;

        // Check if href is '/admin'
        if (href === '/admin') {
            return pathName === '/admin' ? styles['active'] : '';
        }

        // Check if pathName includes strippedHref
        return pathName.includes(strippedHref) ? styles['active'] : '';
    };

    const createURLFromString = (str) => {
        // Convert the string to lowercase and replace spaces with dashes
        let url = str.toLowerCase().replace(/\s+/g, '-');

        // Remove any non-alphanumeric characters except dashes and underscores
        url = url.replace(/[^\w-]+/g, '');

        return url;
    }

    return (
        <div className={`${styles['admin-menu-wrap']}`}>
            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`${styles['admin-sub-item']} ${isActive(item.href)}`}
                        onClick={(e) => {
                            e.preventDefault();
                            toggleSubMenu(index);
                        }}
                    >
                        <Link href={item.href} className={`fx fx-jb fx-ac`}>
                            <span>{item.label}</span>
                            {item.subMenuItems && <MenuArr />}
                        </Link>
                        {item.subMenuItems && (
                            <ul className={`${activeSubMenu === index ? 'show' : ''}`}>
                                {item.subMenuItems.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                        <Link href={item.href+'/'+createURLFromString(subItem)} className={`fx ${isActive(item.href+'/'+createURLFromString(subItem))}`}>{subItem}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeftMenu;