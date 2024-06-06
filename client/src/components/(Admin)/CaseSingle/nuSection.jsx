'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import { ArrDown } from '@/components/svgs/admin';
import { Template1, Template2, Template3, Template4, Template5, Template6, Template7 } from '@/components/(Admin)/RightBar/portfolio/templates/';

const AddNewSection = () => {
    const [dropdownState, setDropdownState] = useState(false);
    const adminFtList = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (adminFtList.current && !adminFtList.current.contains(event.target)) {
                setDropdownState(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const isOpen = dropdownState;
        const adminFtListElem = adminFtList.current;
        if (!adminFtListElem) return;

        const computedStyle = window.getComputedStyle(adminFtListElem);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        adminFtListElem.style.maxHeight = isOpen ? `${adminFtListElem.scrollHeight + paddingTop + paddingBottom}px` : '0';
    }, [dropdownState]);


    const handleToggleDropdown = () => {
        setDropdownState(!dropdownState);
    };

    return (
        <>
            <div className={`${styles['addNew-cs-row']}`}>
                <div className="fx fx-ac fx-jb">
                    <span>Add New Custom Section</span>
                    <div className={`${styles['addNew-toggle']}`}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className={`${styles['admin-dp-row']}`}>
                <div
                    className={`${styles['admin-dp-col']} ${dropdownState ? styles['opened'] : ''}`}
                >
                    <div
                        className={`${styles['admin-dp-toggle']} fx fx-jb fx-ac`}
                        onClick={() => handleToggleDropdown()}
                    >
                        <span>Choose a template</span>
                        <ArrDown />
                    </div>
                    <div ref={adminFtList} className={`${styles['admin-dp-list']}`}>
                        <a data-opt="template1" className="fx fx-ac fx-jb">1 column (1 image & text)</a>
                        <a data-opt="template2" className="fx fx-ac fx-jb">Gif Animation</a>
                        <a data-opt="template3" className="fx fx-ac fx-jb">2 column (2 images, 1 fullwidth text)</a>
                        <a data-opt="template4" className="fx fx-ac fx-jb">2 column (2 images, 2 fullwidth text)</a>
                        <a data-opt="template5" className="fx fx-ac fx-jb">1 column (only image)</a>
                        <a data-opt="template6" className="fx fx-ac fx-jb">2 column (only image)</a>
                        <a data-opt="template7" className="fx fx-ac fx-jb">1 column (alternative option)</a>
                    </div>
                </div>
            </div>
            <div className={`${styles['admin-tmp-block']}`}>
                <Template1
                    index="1"
                />
                <Template2
                    index="2"
                />
                <Template3
                    index="3"
                />
                <Template4
                    index="4"
                />
                <Template5
                    index="5"
                />
                <Template6
                    index="6"
                />
                <Template7
                    index="7"
                />
            </div>
        </>
    )
}

export default AddNewSection;
