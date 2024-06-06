'use client';
import {useContext} from "react";
import useHeaderState from '@/hooks/UseHeaderState';
import { QuoteModalContext } from '@/providers/QuoteModalContext';
import MainNav from "@/components/(Site)/MainNav/MainNav";
import GetQuoteForm from "@/components/(Site)/GetQuoteForm/GetQuoteForm";
import {Logo, LogoText} from "@/components/svgs";
import Button from '@/components/(Site)/Button/Button'

import Link from "next/link";
import './Header.scss';

const Header = () => {
    const { scrolled, isDarkTheme, isHeaderVisible, setHeaderVisible } = useHeaderState();
    const { isQuotePPVisible, toggleQuotePPClass } = useContext(QuoteModalContext);

    const toggleHeaderClass = () => {
        setHeaderVisible(!isHeaderVisible);
    };

    return (
        <div className={`st-hd fx fx-wrap ${isHeaderVisible ? 'st-hd-mn-vis' : 'st-hd-mn-hid'}`}>
            <div className={`main-st ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                <header className={`${scrolled ? 'scrolled' : ''} ${isHeaderVisible ? 'mn-vis' : 'mn-hid'}`}>
                    <div className="container">
                        <div className="hd-row fx fx-jb fx-ac">
                            <div className={`hd-lcol`}>
                                <div className="logo">
                                    <Link href="/" className="fx fx-wrap">
                                        <Logo />
                                        <LogoText />
                                    </Link>
                                </div>
                            </div>
                            <div className="hd-rcol fx fx-ac">
                                <div className={`hd-btn-col`}>
                                    <Button 
                                        classList={`btn-primary ${isDarkTheme ? 'btn-primary-wh' : 'btn-primary-dk'} fx fx-ac fx-jc`}
                                        link="#"
                                        toggleQuotePPClass={toggleQuotePPClass}
                                        buttonText="Get a Quote"
                                    />
                                </div>
                                <div className={`hd-menu-col fx fx-ac`}>
                                    <div
                                        className="hd-menu-toggle fx fx-ac"
                                        onClick={isQuotePPVisible ? toggleQuotePPClass : isHeaderVisible ? toggleHeaderClass : toggleHeaderClass}
                                    >
                                        <div className={`menu-toggle ${isDarkTheme ? 'toggle-wh' : 'toggle-dk'}`}>
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
                            </div>
                        </div>
                    </div>
                </header>
                <MainNav isHeaderVisible={isHeaderVisible} toggleHeaderClass={toggleHeaderClass} />
                <GetQuoteForm isQuotePPVisible={isQuotePPVisible} toggleQuotePPClass={toggleQuotePPClass}/>
            </div>
        </div>
    )
}

export default Header