"use client"
import React, { useState } from 'react';
import styles from './GetQuoteForm.module.scss';
import Link from 'next/link';
import {AttachIcon, BtnArrUp} from '@/components/svgs';

const GetQuoteForm = ({isQuotePPVisible, toggleQuotePPClass}) => {
    const [categorySelectedStates, setCategorySelectedStates] = useState([false, false, false, false, false, false, false, false, false]);
    const toggleCategorySelect = (index, reset = false) => {
        const updatedStates = [...categorySelectedStates];
        reset ? updatedStates[index] = false : updatedStates[index] = !updatedStates[index];
        setCategorySelectedStates(updatedStates);
    };

    const handlePPClick = () => {
        toggleQuotePPClass(!isQuotePPVisible);
    };

    const [formData, setFormData] = useState({
        interested: [],
        name: '',
        company: '',
        email: '',
        phone: '',
        brief: '',
        file: null
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        brief: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleTypeChange = (interest, index) => {
        const updatedInterested = [...formData.interested];
        if (updatedInterested.includes(interest)) {
            // Remove the interest if it's already selected
            updatedInterested.splice(updatedInterested.indexOf(interest), 1);
        } else {
            // Add the interest if it's not selected
            updatedInterested.push(interest);
        }

        setFormData({ ...formData, interested: updatedInterested });
        toggleCategorySelect(index);
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        // Check if files array is not empty
        if (type === 'file' && files.length > 0) {
            const file = files[0];

            // Check file type
            const allowedTypes = [
                'text/plain',
                'application/msword',
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (!allowedTypes.includes(file.type)) {
                setErrors({ ...errors, [name]: 'PLEASE LOAD CORRECT FILE' });
                return;
            }

            // Check file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                setErrors({ ...errors, [name]: 'File size exceeds the limit (5MB). Please choose a smaller file.' });
                return;
            }
        }

        const newValue = type === 'file' ? files[0] : e.target.value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
        if (name in errors) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    const handlePhoneKeyDown = (e) => {
        // Allow only numeric characters and control keys
        if (!/^[0-9]*$/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(e.key)) {
            e.preventDefault();
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form validation here
        if (validateForm()) {
            setSubmitting(true);
            // Form is valid, proceed with submission
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('phone', formData.phone);
            formDataToSubmit.append('brief', formData.brief);
            formDataToSubmit.append('company', formData.company);
            formDataToSubmit.append('email', formData.email);
            formData.interested.forEach((interest, index) => {
                formDataToSubmit.append(`interested[${index}]`, interest);
            });
            if (formData.file) {
                formDataToSubmit.append('file', formData.file);
            }

            try {
                const response = await fetch('/api/get-quote', {
                    method: 'POST',
                    body: formDataToSubmit,
                });

                if (response.ok) {
                    setFormData({
                        ...formData,
                        interested: [],
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        brief: '',
                        file: null
                    });
                    setCategorySelectedStates([false, false, false, false, false, false, false, false, false]);
                    // Reset the file input value
                    const fileInput = document.getElementById('qt-file');
                    if (fileInput) {
                        fileInput.value = ''; // Clear the file input value
                    }
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 3000);
                } else {
                    console.error('Error sending message');
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
            setSubmitting(false);
        }
    };

    const validateForm = () => {
        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        const newErrors = {
            name: '',
            phone: '',
            email: '',
            brief: '',
            file: '', // New error state for file validation
        };

        let isValid = true;

        // Validation rules (you can customize these)
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (formData.phone.trim() === '') {
            newErrors.phone = 'Phone is required';
            isValid = false;
        }

        if (formData.email.trim() === '' || !validateEmail(formData.email)) {
            newErrors.email = 'Email is required';
            isValid = false;
        }

        if (formData.brief.trim() === '') {
            newErrors.brief = 'Brief is required';
            isValid = false;
        }

        // File validation only if a file is selected
        if (formData.file) {
            const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
            const allowedExtensions = ['.txt', '.doc', '.docx', '.pdf'];

            if (formData.file.size > maxSize) {
                newErrors.file = 'FILE SIZE EXCEEDS THE LIMIT.';
                isValid = false;
            }

            const fileExtension = formData.file.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(`.${fileExtension}`)) {
                newErrors.file = 'PLEASE LOAD CORRECT FILE';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };
    return (
        <div className={`${styles['quote-fm-popup']} ${isQuotePPVisible ? styles['visible'] : styles['hidden']}`}>
            <div className={`container`}>
                <div className="fx fx-je">
                    <div 
                        className={`${styles['qw-pp-ct']} mn-x fx fx-ac`}
                        onClick={handlePPClick}
                    >
                        <div className={`menu-toggle toggle-dk`}>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="menu-txt">
                            <span>
                                Close
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`${styles['fm-wrap-main']}`}>
                    <div className={`${styles['qt-fm-pp-wrap']}`}>
                        <div className={`${styles['qt-fm-pp-wrapper']}`}>
                            <h6>I&apos;m interested in...</h6>
                            <div className={`${styles['pp-cats-row']} fx fx-wrap`}>
                                {['Booth Construction', 'Video Production', 'Concierge Services', 'Booth Branding', 'Event Photography', 'Event Videography', 'Printing', 'Merchandising', 'Complete Event Solution'].map((category, index) => (
                                    <Link
                                        key={index}
                                        className={`${styles['pp-cat']} ${categorySelectedStates[index] ? styles['selected'] : ''} fx fx-ac fx-jc`}
                                        href="#"
                                        onClick={() => handleTypeChange(category, index)}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                            <div className={`${styles['qt-fm']}`}>
                                <form autoComplete="off">
                                    <div className={`${styles['qt-field']} ${errors.name && styles['invalid']}`}>
                                        <input
                                            type="text"
                                            id="qt-name"
                                            name="name"
                                            placeholder="Name Surname *"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                        <span
                                            className={`${styles['err-msg']} fx fx-ac`}>
                                            Please enter correct information
                                        </span>
                                    </div>
                                    <div className={`${styles['qt-field']} ${errors.company && styles['invalid']}`}>
                                        <input
                                            type="text"
                                            id="qt-company"
                                            name="company"
                                            placeholder="Company Name"
                                            value={formData.company}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                        <span
                                            className={`${styles['err-msg']} fx fx-ac`}>
                                            Please enter correct information
                                        </span>
                                    </div>
                                    <div className={`${styles['qt-field']} ${errors.email && styles['invalid']}`}>
                                        <input
                                            type="email"
                                            id="qt-email"
                                            name="email"
                                            placeholder="Your email *"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                        <span
                                            className={`${styles['err-msg']} fx fx-ac`}>
                                            Please enter correct information
                                        </span>
                                    </div>
                                    <div className={`${styles['qt-field']} ${errors.phone && styles['invalid']}`}>
                                        <input
                                            type="tel"
                                            id="qt-phone"
                                            name="phone"
                                            placeholder="Phone *"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onKeyDown={handlePhoneKeyDown}
                                            autoComplete="off"
                                        />
                                        <span
                                            className={`${styles['err-msg']} fx fx-ac`}>
                                            Please enter correct information
                                        </span>
                                    </div>
                                    <div className={`${styles['qt-field']} ${errors.brief && styles['invalid']}`}>
                                        <textarea
                                            id="qt-brief"
                                            name="brief"
                                            placeholder="A Brief of Your Project Idea and Design *"
                                            value={formData.brief}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                        <span
                                            className={`${styles['err-msg']} ${styles['err-msg-txt']} fx fx-ae`}>
                                            Please enter correct information
                                        </span>
                                    </div>
                                    <div className={`${styles['qt-file-field']}`}>
                                        <input
                                            type="file"
                                            id="qt-file"
                                            name="file"
                                            accept=".pdf,.txt,.doc,.docx"
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                        <div className={`fx fx-ac fx-wrap`}>
                                            <div className={`${styles['qt-file-icon']} fx fx-ac fx-jc`}>
                                                <AttachIcon />
                                            </div>
                                            <span className={`${styles['qt-file-name']}`}>
                                                {formData.file
                                                    ? `File Selected: ${formData.file.name}`
                                                    : 'If you have a brief document in .txt, .doc(x), or .pdf format, please attach.'}
                                            </span>
                                            <div className={`${styles['qt-file-err']} ${errors.file ? styles['show'] : ''}`}>
                                                <span>{errors.file}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles['qt-form-sb']} fx fx-ac fx-jb fx-wrap`}>
                                        <button type="submit" className={`fx fx-ac fx-jc ${submitting ? styles['disabled'] : ''}`} onClick={handleSubmit} disabled={submitting}>
                                            <span>
                                                {submitting ? "Submitting..." : "Send Request"}
                                            </span>
                                            <div className={`${styles['btn-arr']} fx`}>
                                                <BtnArrUp />
                                            </div>
                                        </button>
                                        <div className={`${styles['qt-sc-msg']} ${showSuccessMessage ? styles['show'] : ''}`}>
                                            <p>Thank you. The request has been sent.</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetQuoteForm;