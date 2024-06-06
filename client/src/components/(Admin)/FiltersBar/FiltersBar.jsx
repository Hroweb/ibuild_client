'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import { ArrDown } from '@/components/svgs/admin';
import FiltersBarOption from "@/components/(Admin)/FiltersBar/FiltersBarOption";

const FiltersBar = ({ filtersFormData, onApplyFilters }) => {
    const [dropdownStates, setDropdownStates] = useState({});
    // Initializing checkedOptions to track the checked state of each filter option
    const [checkedOptions, setCheckedOptions] = useState(() =>
        Object.keys(filtersFormData).reduce((acc, key) => ({
            ...acc,
            [key]: filtersFormData[key].map(() => false)
        }), {})
    );
    const [appliedFilters, setAppliedFilters] = useState({});
    const ftColRefs = useRef({});
    const ftListRefs = useRef({});

    // Effect to handle clicks outside dropdowns to close them
    useEffect(() => {
        function handleClickOutside(event) {
            Object.keys(ftColRefs.current).forEach(key => {
                if (ftColRefs.current[key] && !ftColRefs.current[key].contains(event.target)) {
                    setDropdownStates(prevStates => ({
                        ...prevStates,
                        [key]: false
                    }));
                }
            });
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Effect to adjust dropdowns' maxHeight when open/close
    useEffect(() => {
        Object.keys(dropdownStates).forEach(key => {
            const isOpen = dropdownStates[key];
            const adminFtList = ftListRefs.current[key];
            if (!adminFtList) return;

            const computedStyle = window.getComputedStyle(adminFtList);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);
            adminFtList.style.maxHeight = isOpen ? `${adminFtList.scrollHeight + paddingTop + paddingBottom}px` : '0';
        });
    }, [dropdownStates]);

    // Handles checkbox state change for filters
    const handleCheckboxChange = (filterKey, index) => {
        setCheckedOptions(prev => ({
            ...prev,
            [filterKey]: prev[filterKey].map((checked, i) => i === index ? !checked : checked)
        }));
    };

    // Handles the submission of selected filters
    const handleSubmit = () => {
        const selectedFilters = Object.keys(checkedOptions).reduce((acc, key) => ({
            ...acc,
            [key]: checkedOptions[key]
                .map((checked, i) => checked ? filtersFormData[key][i].slug : null)
                .filter(n => n !== null)
        }), {});
        onApplyFilters(selectedFilters);
        setAppliedFilters(selectedFilters);
    };

    // Clears all selected filters
    const handleClearFilters = () => {
        // Reset checkedOptions to all false values
        const resetCheckedOptions = Object.keys(checkedOptions).reduce((acc, key) => ({
            ...acc,
            [key]: checkedOptions[key].map(() => false)
        }), {});
        setCheckedOptions(resetCheckedOptions);
        // Optionally call onApplyFilters with empty filters if needed
        onApplyFilters(Object.keys(resetCheckedOptions).reduce((acc, key) => ({...acc, [key]: []}), {}));
        setAppliedFilters(Object.keys(resetCheckedOptions).reduce((acc, key) => ({...acc, [key]: []}), {}));
    };

    // Toggles the visibility of dropdowns
    const handleToggleDropdown = (key) => {
        setDropdownStates(prevStates => ({
            ...prevStates,
            [key]: !prevStates[key]
        }));
    };

    return (
        <>
            <div className="fx">
                {/* Render filter options */}

                {Object.entries(filtersFormData).map(([key, value]) => {
                    // Display text based on appliedFilters
                    const displayText = appliedFilters[key]?.length > 0
                        ? value.filter(option => appliedFilters[key].includes(option.slug)).map(option => option.title).join(', ')
                        : `All ${key.charAt(0).toUpperCase() + key.slice(1)}`;

                    return (
                        <div
                            key={key}
                            ref={el => ftColRefs.current[key] = el}
                            className={`${styles['admin-ft-col']} ${dropdownStates[key] ? styles['opened'] : ''}`}
                        >
                            <div
                                className={`${styles['admin-ft-toggle']} fx fx-jb fx-ac`}
                                onClick={() => handleToggleDropdown(key)}
                            >
                                <span>{displayText}</span>
                                <ArrDown />
                            </div>
                            <div ref={el => ftListRefs.current[key] = el} className={`${styles['admin-ft-list']}`}>
                                {value.map((item, index) => (
                                    <FiltersBarOption
                                        key={`${key}-${index}`}
                                        title={item.title}
                                        slug={item.slug}
                                        index={index}
                                        checked={checkedOptions[key]?.[index]}
                                        onChange={() => handleCheckboxChange(key, index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={`${styles['admin-ft-btn']} fx`}>
                <div className={`${styles['admin-ft-btn-clear']} fx`}>
                    <button type="button" onClick={handleClearFilters}>Clear</button>
                </div>
                <div className={`${styles['admin-ft-llne']}`}></div>
                <div className={`${styles['admin-ft-btn']} fx`}>
                    <button type="button" onClick={handleSubmit}>Apply Filters</button>
                </div>
            </div>
        </>
    );
};

export default FiltersBar;