import Link from 'next/link';
import './MainNav.scss'
import NavigationItem from "@/components/(Site)/MainNav/NavigationItem";
import useHeaderState from '@/hooks/UseHeaderState';
import { usePathname } from 'next/navigation'

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
                        <div className="rcol-wrap fx fx-wrap fx-ae">
                            <div className="rcol-top">
                                <h6>Social</h6>
                                <div className="main-social">
                                    <Link href="https://www.instagram.com/ipoint_int/" target="_blank">Instagram</Link>
                                    <Link href="https://www.linkedin.com/company/ipoint-int/" target="_blank">LinkedIn</Link>
                                    <Link href="https://web.facebook.com/Ipoint.Int" target="_blank">Facebook</Link>
                                    <Link href="https://www.youtube.com/@antoinevella7449" target="_blank">Youtube</Link>
                                </div>
                            </div>
                            <div className="rcol-btm">
                                <h5>Get in touch</h5>
                                <Link href="mailto:info@ipoint.com.mt">info@ipoint.com.mt</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainNav;