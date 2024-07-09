import Link from 'next/link';
import './MainNav.scss'
import NavigationItem from "@/components/(Site)/MainNav/NavigationItem";
import useHeaderState from '@/hooks/UseHeaderState';
import { usePathname } from 'next/navigation'
import Social from "@/components/(Site)/MainNav/Social";

const MainNav = ({ isHeaderVisible, toggleHeaderClass}) => {
    const pathName = usePathname();
    const handleMenuClick = () => {
        toggleHeaderClass(!isHeaderVisible);
    };
    return (
        <div className={`main-menu ${isHeaderVisible ? 'visible' : 'hidden'}`}>
            <div className="container">
                <div className="main-menu-ct-wrap fx fx-je">
                    <div 
                        className="main-menu-ct mn-x fx fx-ac"
                        onClick={handleMenuClick}
                    >
                        <div className={`menu-toggle toggle-dk`}>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="menu-txt">
                            <span>
                                Menu
                            </span>
                        </div>
                    </div>
                </div>
                <div className="main-menu-wrap fx fx-jb">
                    <div className="main-menu-lcol">
                        <h6>Menu</h6>
                        <div className="menu-items">
                            <ul>
                                <NavigationItem toggleHeaderClass={toggleHeaderClass} href="/" label="Home" currentPath={pathName} />
                                <NavigationItem toggleHeaderClass={toggleHeaderClass} href="/about-us" label="About us" currentPath={pathName} />
                                <NavigationItem toggleHeaderClass={toggleHeaderClass} href="/services" label="Services" currentPath={pathName} />
                                <NavigationItem toggleHeaderClass={toggleHeaderClass} href="/portfolio" label="Portfolio" currentPath={pathName} />
                                <NavigationItem toggleHeaderClass={toggleHeaderClass} href="/contact-us" label="Contact Us" currentPath={pathName} />
                            </ul>
                        </div>
                    </div>
                    <div className="main-menu-rcol">
                        <Social />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainNav;