import React, { useState, useEffect, useRef, Suspense } from 'react';
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import { ArrDown } from '@/components/svgs/admin';
import LoadingAnim from "@/components/(Admin)/LoadingAnim/LoadingAnim";
import { v4 as uuidv4 } from 'uuid';
import {UseFormCases} from "@/hooks/admin/useFormCases";
import {deleteTemplate} from "@/utils/api/(admin)/post";
import {showSuccessAlert} from "@/hooks/admin/helpers";

const templates = {
    Template1: React.lazy(() => import('@/components/(Admin)/RightBar/portfolio/templates/template1')),
    Template2: React.lazy(() => import('@/components/(Admin)/RightBar/portfolio/templates/template2')),
    Template3: React.lazy(() => import('@/components/(Admin)/RightBar/portfolio/templates/template3')),
    Template4: React.lazy(() => import('@/components/(Admin)/RightBar/portfolio/templates/template4')),
    Template5: React.lazy(() => import('@/components/(Admin)/RightBar/portfolio/templates/template5')),
    Template6: React.lazy(() => import('@/components/(Admin)/RightBar/portfolio/templates/template6')),
    Template7: React.lazy(() => import('@/components/(Admin)/RightBar/portfolio/templates/template7')),
};

const AddNewSection = ({ updateTemplates }) => {
    const [formData, setFormData] = useState({
        templateFields: {},
    });

    const [selectedMedia, setSelectedMedia] = useState(null);
    
    const [sections, setSections] = useState([]);

    const addSection = () => {
        const newSection = {
            id: uuidv4(),
            templateKey: null,
            dropdownOpen: false,
            ref: React.createRef(),
        };

        setSections(prevSections => [...prevSections, newSection]);

        setTimeout(() => {
            const adminDpRow = document.querySelector(`.${styles['admin-dp-frow']}[data-key="${newSection.id}"]`);
            if (adminDpRow) {
                smoothScrollTo(adminDpRow.offsetTop - 20, 800);
            }
        }, 100);
    };

    const smoothScrollTo = (targetPosition, duration) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const ease = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, ease);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    const toggleDropdown = (sectionId) => {
        setSections(prevSections =>
            prevSections.map(section =>
                section.id === sectionId
                    ? { ...section, dropdownOpen: !section.dropdownOpen }
                    : section
            )
        );
    };

    const handleTemplateSelection = (sectionId, templateKey, templateText) => {
        setSections(prevSections =>
            prevSections.map(section =>
                section.id === sectionId
                    ? { ...section, templateKey, dropdownOpen: false, templateText }
                    : section
            )
        );
       
        // Update the formData with the templateFields corresponding to the selected templateKey
        setFormData(prevFormData => ({
            ...prevFormData,
            templateFields: {
                ...prevFormData.templateFields,
                [sectionId]: {
                    [templateKey]: {
                        ...((prevFormData.templateFields[sectionId] || {})[templateKey] || {}),
                    }
                }
            }
        }));
    };

    const { handleInputChange, handleMediaInputChange } = UseFormCases(formData, setFormData, selectedMedia, setSelectedMedia);

    const handleInputChangeWrapper = (fieldId, value, sectionId, templateKey) => {
        handleInputChange(fieldId, value, sectionId, templateKey);
        updateTemplates(formData.templateFields);
    };

    const handleMediaInputChangeWrapper = (inputID, file, sectionId, templateKey) => {
        handleMediaInputChange(inputID, file, templateKey, sectionId);
        updateTemplates(formData.templateFields);
    };

    const handleTemplateDelete = (e,templateId) => {
        e.preventDefault()
        setSections(prevSections => {
            return prevSections.filter(section => section.id !== templateId);
        });

        setFormData(prevFormData => {
            const updatedTemplateFields = { ...prevFormData.templateFields };
            delete updatedTemplateFields[templateId];

            return {
                ...prevFormData,
                templateFields: updatedTemplateFields
            };
        });
    };

    return (
        <>
            <div className={`${styles['addNew-cs-row']}`} onClick={addSection}>
                <div className="fx fx-ac fx-jb">
                    <span>Add New Custom Section</span>
                    <div className={`${styles['addNew-toggle']}`}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            {sections.map((section, index) => (
                <div key={section.id}>
                    <div className={`${styles['admin-dp-frow']}`} key={section.id} data-key={section.id}>
                        <div className={`${styles['admin-dp-row']}`}>
                            <div className={`${styles['admin-dp-col']} ${section.dropdownOpen ? styles['opened'] : ''}`}>
                                <div className={`${styles['admin-dp-toggle']} fx fx-jb fx-ac`} onClick={() => toggleDropdown(section.id)}>
                                    <span>{section.templateText || 'Choose a template'}</span>
                                    <ArrDown />
                                </div>
                                {section.dropdownOpen && (
                                    <div ref={section.ref} className={`${styles['admin-dp-list']}`}>
                                        <a data-opt="template1" className="fx fx-ac fx-jb" onClick={() => handleTemplateSelection(section.id, 'Template1', 'T1 - 1 column (1 image & text)')}>T1 - 1 column (1 image & text)</a>
                                        <a data-opt="template2" className="fx fx-ac fx-jb" onClick={() => handleTemplateSelection(section.id, 'Template2', 'T2 - Gif Animation')}>T2 - Gif Animation</a>
                                        <a data-opt="template3" className="fx fx-ac fx-jb" onClick={() => handleTemplateSelection(section.id, 'Template3', 'T3 - 2 column (2 images, 1 fullwidth text)')}>T3 - 2 column (2 images, 1 fullwidth text)</a>
                                        <a data-opt="template4" className="fx fx-ac fx-jb" onClick={() => handleTemplateSelection(section.id, 'Template4', 'T4 - 2 column (2 images, 2 fullwidth text)')}>T4 - 2 column (2 images, 2 fullwidth text)</a>
                                        <a data-opt="template5" className="fx fx-ac fx-jb" onClick={() => handleTemplateSelection(section.id, 'Template5', 'T5 - 1 column (only image)')}>T5 - 1 column (only image)</a>
                                        <a data-opt="template6" className="fx fx-ac fx-jb" onClick={() => handleTemplateSelection(section.id, 'Template6', 'T6 - 2 column (only image)')}>T6 - 2 column (only image)</a>
                                        <a data-opt="template7" className="fx fx-ac fx-jb" onClick={() => handleTemplateSelection(section.id, 'Template7', 'T7 - 1 column (alternative option)')}>T7 - 1 column (alternative option)</a>
                                    </div>
                                )}
                            </div>
                        </div>
                        {section.templateKey && (
                            <div className={`${styles['admin-tmp-block']}`}>
                                <Suspense fallback={<LoadingAnim />}>
                                    {React.createElement(templates[section.templateKey], {
                                        key: section.id,
                                        id: section.id,
                                        handleInputChange: handleInputChangeWrapper,
                                        handleMediaInputChange: handleMediaInputChangeWrapper,
                                        formData: formData,
                                        selectedMedia: selectedMedia,
                                        handleTemplateDelete: handleTemplateDelete
                                    })}
                                </Suspense>
                            </div>
                        )}
                    </div>
                    <div className={`${styles['addNew-cs-row']}`} onClick={addSection}>
                        <div className="fx fx-ac fx-jb">
                            <span>Add Another Custom Section</span>
                            <div className={`${styles['addNew-toggle']}`}>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
export default AddNewSection;