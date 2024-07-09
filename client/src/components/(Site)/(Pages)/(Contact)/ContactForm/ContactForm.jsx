'use client';
import { useState, useEffect } from "react";
import styles from './ContactForm.module.scss'
import {BtnArrUp, AttachIcon, Facebook, Linkedin, Instagram, EmailIcon, MapIcon, AttachCVIcon} from '@/components/svgs';
import Link from "next/link";

const ContactForm = ({data}) => {
    const [formData, setFormData] = useState({
        type: 'workWithUs',
        interested: [],
        name: '',
        email: '',
        brief: '',
        phone: '',
        file: null,
        company: '',
        message: '',
        cv_letter: '',
        cv: null,
    });

    let categorySelectedStates = [];
    
    const [categorySelectedStatesWorkWithUs, setCategorySelectedStatesWorkWithUs] = useState(Array(9).fill(false));
    const [categorySelectedStatesCollaboration, setCategorySelectedStatesCollaboration] = useState(Array(4).fill(false));
    const [categorySelectedStatesJoinTheTeam, setCategorySelectedStatesJoinTheTeam] = useState(Array(5).fill(false));

    const toggleCategorySelect = (category, index, e) => {
        e.preventDefault();

        let updatedStates = [];

        // Update the selected categories based on the active tab
        if (formData.type === 'workWithUs') {
            updatedStates = [...categorySelectedStatesWorkWithUs];
            updatedStates[index] = !updatedStates[index];
            setCategorySelectedStatesWorkWithUs(updatedStates);
        } else if (formData.type === 'collaboration') {
            updatedStates = [...categorySelectedStatesCollaboration];
            updatedStates[index] = !updatedStates[index];
            setCategorySelectedStatesCollaboration(updatedStates);
        } else if (formData.type === 'joinTheTeam') {
            updatedStates = [...categorySelectedStatesJoinTheTeam];
            updatedStates[index] = !updatedStates[index];
            setCategorySelectedStatesJoinTheTeam(updatedStates);
        }

        const selectedOptions = optionsArray.filter((_, i) => updatedStates[i]);
        setFormData({ ...formData, interested: selectedOptions });
    };

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        brief: '',
        message: '',
        phone: '',
        cv_letter: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handlePhoneKeyDown = (e) => {
        // Allow only numeric characters and control keys
        if (!/^[0-9]*$/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleTypeChange = (type, e) => {
        e.preventDefault();
        setFormData({ ...formData, type, interested: [] });
        //setFormData({ ...formData, interested: [] });
        setErrors({
            name: '',
            email: '',
            brief: '',
            cv_letter: '',
            message: '',
        });
        setCategorySelectedStatesWorkWithUs(Array(9).fill(false));
        setCategorySelectedStatesCollaboration(Array(4).fill(false));
        setCategorySelectedStatesJoinTheTeam(Array(5).fill(false));
    };

    /*useEffect(() => {
        console.log(formData.type);
    }, [formData.type]);*/

    const handleChange = (e) => {
        //console.log(formData.type); 
        const { name, value, type, files } = e.target;
        // Check if files array is not empty
        if (type === 'file' && files.length > 0 && formData.type === 'joinTheTeam') {
            const file = files[0];

            // Check file type
            const allowedTypes = [
                'application/msword', // DOC files
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX files
                'application/pdf', // PDF files
                'image/jpeg', // JPEG files
                'image/jpg', // JPG files
            ];
            if (!allowedTypes.includes(file.type)) {
                setErrors({ ...errors, [name]: 'Invalid file type. Please upload a .png, .jpg, .jpeg, .doc(x), or .pdf file.' });
                return;
            }

            // Check file size (2MB limit)
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (file.size > maxSize) {
                setErrors({ ...errors, [name]: 'File size exceeds the limit (2MB). Please choose a smaller file.' });
                return;
            }
        }else if(type === 'file' && files.length > 0 && formData.type === 'workWithUs'){
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

    const validateForm = () => {
        function isValidEmail(email) {
            const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            return emailRegex.test(email);
        }

        const newErrors = {
            name: '',
            email: '',
            brief: '',
            cv_letter: '',
            message: '',
            phone: '',
            cv: '',
        };

        let isValid = true;

        // Validation rules (you can customize these)
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (formData.email.trim() === '' || !isValidEmail(formData.email)) {
            newErrors.email = 'Email is required and must be a valid email address';
            isValid = false;
        }

        if (formData.type === 'workWithUs') {
            if (formData.phone.trim() === '') {
                newErrors.phone = 'Phone is required';
                isValid = false;
            }
            if (formData.brief.trim() === '') {
                newErrors.brief = 'Brief is required';
                isValid = false;
            }
            // Remove fields not relevant to workWithUs
            delete newErrors.message;
            delete newErrors.cv_letter;
            delete newErrors.cv;
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
        } else if (formData.type === 'collaboration') {
            if (formData.message.trim() === '') {
                newErrors.message = 'Message is required';
                isValid = false;
            }
            // Remove fields not relevant to collaboration
            delete newErrors.brief;
            delete newErrors.cv_letter;
            delete newErrors.cv;
        } else if (formData.type === 'joinTheTeam') {
            if (!formData.cv) {
                newErrors.cv = 'CV is required';
                isValid = false;
            }

            if (formData.cv_letter.trim() === '') {
                newErrors.cv_letter = 'Cover Letter is required';
                isValid = false;
            }
            // Remove fields not relevant to joinTheTeam
            delete newErrors.message;
            delete newErrors.brief;
        }

        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(formData.interested); return false;
        if (validateForm()) {
            // Form is valid, proceed with submission
            //console.log('Form Data:', formData);
            setSubmitting(true);
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('type', formData.type);

            if(formData.interested && formData.interested.length > 0){
                formData.interested.forEach((interest, index) => {
                    formDataToSubmit.append(`interested[${index}]`, interest);
                });
            }

            //console.log(formData.interested);

            switch (formData.type){
                case 'workWithUs':
                    formDataToSubmit.append('name', formData.name);
                    formDataToSubmit.append('email', formData.email);
                    formDataToSubmit.append('brief', formData.brief);
                    if(formData.company){
                        formDataToSubmit.append('company', formData.company);
                    }
                    if(formData.phone){
                        formDataToSubmit.append('phone', formData.phone);
                    }
                    if (formData.file) {
                        formDataToSubmit.append('file', formData.file);
                    }
                    break;
                case 'collaboration':
                    formDataToSubmit.append('name', formData.name);
                    formDataToSubmit.append('email', formData.email);
                    formDataToSubmit.append('message', formData.message);
                    if(formData.company){
                        formDataToSubmit.append('company', formData.company);
                    }
                    break;
                case 'joinTheTeam':
                    formDataToSubmit.append('name', formData.name);
                    formDataToSubmit.append('email', formData.email);
                    formDataToSubmit.append('cv', formData.cv);
                    formDataToSubmit.append('cv_letter', formData.cv_letter);
                    break;
            }
            try {
                const response = await fetch('/api/contact-us', {
                    method: 'POST',
                    body: formDataToSubmit,
                });

                if (response.ok) {
                    setFormData({
                        ...formData,
                        interested: [],
                        name: '',
                        email: '',
                        brief: '',
                        company: '',
                        message: '',
                        cv_letter: '',
                        phone: '',
                        cv: null,
                        file: null
                    })
                    setCategorySelectedStatesWorkWithUs(Array(9).fill(false));
                    setCategorySelectedStatesCollaboration(Array(4).fill(false));
                    setCategorySelectedStatesJoinTheTeam(Array(5).fill(false));
                    const fileInput = document.getElementById('cv');
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

    let optionsArray = [];

    if (formData.type === 'workWithUs') {
        optionsArray = ['Booth Construction', 'Video Production', 'Concierge Services', 'Booth Branding', 'Event Photography', 'Event Videography', 'Printing', 'Merchandising', 'Complete Event Solution'];
        categorySelectedStates = categorySelectedStatesWorkWithUs;
    } else if (formData.type === 'collaboration') {
        optionsArray = ['Subcontracting', 'Consultation', 'Connection', 'Joint project'];
        categorySelectedStates = categorySelectedStatesCollaboration;
    } else if (formData.type === 'joinTheTeam') {
        optionsArray = ['Designer', 'Architect', 'Installer', 'Project Manager', 'Sales Manager'];
        categorySelectedStates = categorySelectedStatesJoinTheTeam;
    }

    return (
        <div className={`pg-section bg-light ${styles['ct-sc']}`}>
            <div className="container">
                <div className={`fx fx-wrap fx-jb`}>
                    <div className={`${styles['ct-lcol']}`}>
                        <form onSubmit={handleSubmit} className="fx fx-wrap" autoComplete="off">
                            <div className={`${styles['ct-tabs']} fx`}>
                                <button
                                    className={`${formData.type === 'workWithUs' ? styles.active : ''}`}
                                    onClick={(e) => handleTypeChange('workWithUs', e)}
                                >
                                    Get a Quote
                                </button>
                                <button
                                    className={`${formData.type === 'collaboration' ? styles.active : ''}`}
                                    onClick={(e) => handleTypeChange('collaboration', e)}
                                >
                                    Collaborate
                                </button>
                                <button
                                    className={`${formData.type === 'joinTheTeam' ? styles.active : ''}`}
                                    onClick={(e) => handleTypeChange('joinTheTeam', e)}
                                >
                                    Join the Team
                                </button>
                            </div>
                            <div className={`${styles['ct-tags']} fx fx-wrap`}>
                                <h2>I&apos;m interested in...</h2>
                                <div className={`${styles['ct-tags-wrap']} fx fx-wrap`}>
                                {
                                    optionsArray.map((category, index) => (
                                        <button
                                            key={index}
                                            className={`${styles['ct-tag']} ${categorySelectedStates[index] ? styles['selected'] : ''} fx fx-ac fx-jc`}
                                            href="#"
                                            onClick={(e) => toggleCategorySelect(category, index, e)}
                                        >
                                            {category}
                                        </button>
                                    ))
                                }
                                </div>
                            </div>
                            <div className={`${styles['ct-form-wrap']} fx fx-wrap`}>
                                <div className={`${styles['ct-field']} ${errors.name && styles['invalid']}`}>
                                    <input
                                        type="text"
                                        id="ct-name"
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
                                {(formData.type === 'workWithUs' || formData.type === 'collaboration') && (
                                    <div className={`${styles['ct-field']} ${errors.company && styles['invalid']}`}>
                                        <input
                                            type="text"
                                            id="ct-company"
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
                                )}
                                <div className={`${styles['ct-field']} ${errors.email && styles['invalid']}`}>
                                    <input
                                        type="email"
                                        id="ct-email"
                                        name="email"
                                        placeholder="Your Email *"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <span
                                        className={`${styles['err-msg']} fx fx-ac`}>
                                    Please enter correct information
                                </span>
                                </div>
                                {formData.type === 'workWithUs' && (
                                    <div className={`${styles['ct-field-wrap']}`}>
                                        <div className={`${styles['ct-field']} ${errors.phone && styles['invalid']}`}>
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
                                        <div className={`${styles['ct-field']} ${errors.brief && styles['invalid']}`}>
                                            <textarea
                                                id="ct-brief"
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
                                        <div className={`${styles['ct-fileQ-field']} fx fx-ac fx-wrap`}>
                                            <input
                                                type="file"
                                                id="qt-file"
                                                name="file"
                                                accept=".pdf,.txt,.doc,.docx"
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            <div className={`${styles['ct-file-icon']} fx fx-ac fx-jc`}>
                                                <AttachIcon />
                                            </div>
                                            <span className={`${styles['ct-file-name']}`}>
                                                {formData.file
                                                    ? `File Selected: ${formData.file.name}`
                                                    : 'If you have a brief document in .txt, .doc(x), or .pdf format, please attach.'}
                                            </span>
                                            <div className={`${styles['ct-file-err']} ${errors.file ? styles['show'] : ''}`}>
                                                <span>{errors.file}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {formData.type === 'collaboration' && (
                                    <div className={`${styles['ct-field']} ${errors.message && styles['invalid']}`}>
                                        <textarea
                                            id="ct-message"
                                            name="message"
                                            placeholder="Message *"
                                            value={formData.message}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                            <span
                                                className={`${styles['err-msg']} ${styles['err-msg-txt']} fx fx-ae`}>
                                            Please enter correct information
                                        </span>
                                    </div>
                                )}
                                {formData.type === 'joinTheTeam' && (
                                    <>
                                        <div className={`${styles['ct-file-field']} fx fx-jb ${errors.cv && styles['invalid']}`}>
                                            <div className={`${styles['ct-ff-col']} fx fx-ac`}>
                                                <label htmlFor="cv">ADD RESUME/CV *</label>
                                                <span className={`${styles['ct-txt-val']}`}>
                                                    {formData.cv
                                                        ? `File Selected: ${formData.cv.name}`
                                                        : 'Please attach your file.'}
                                                </span>
                                            </div>
                                            <AttachCVIcon />
                                            <input
                                                type="file"
                                                name="cv"
                                                id="cv"
                                                accept=".pdf,.jpg,.jpeg,.doc,.docx"
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {errors.cv && <span className="error">{errors.cv}</span>}
                                        </div>
                                        <div className={`${styles['ct-field']} ${errors.cv_letter && styles['invalid']}`}>
                                        <textarea
                                            id="ct-cv_letter"
                                            name="cv_letter"
                                            placeholder="Cover Letter *"
                                            value={formData.cv_letter}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                            <span
                                                className={`${styles['err-msg']} ${styles['err-msg-txt']} fx fx-ae`}>
                                            Please enter correct information
                                        </span>
                                        </div>
                                    </>
                                )}
                                <div className={`${styles['ct-form-sb']} fx fx-ac fx-jb fx-wrap`}>
                                    <button type="submit" className='fx fx-ac fx-jc' disabled={loading || submitting}>
                                        <span>
                                            {submitting ? "Sending..." : "Send Request"}
                                        </span>
                                        <div className={`${styles['btn-arr']} fx`}>
                                            <BtnArrUp />
                                        </div>
                                    </button>
                                    <div className={`${styles['ct-sc-msg']} ${showSuccessMessage ? styles['show'] : ''}`}>
                                        <p>Thank you. The request has been sent.</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={`${styles['ct-rcol']}`}>
                        <h3>Get in touch</h3>
                        <div className={`${styles['ct-social']} fx fx-ac`}>
                            <Link href={`${data['linkedin_link']?.['meta_value'] ?? 'https://www.linkedin.com/company/ipoint-int/'}`} target="_blank">
                                <Linkedin/>
                            </Link>
                            <Link href={`${data['fb_link']?.['meta_value'] ?? 'https://web.facebook.com/Ipoint.Int'}`} target="_blank">
                                <Facebook/>
                            </Link>
                            <Link href={`${data['insta_link']?.['meta_value'] ?? 'https://www.instagram.com/ipoint_int/'}`} target="_blank">
                                <Instagram/>
                            </Link>
                        </div>
                        <div className={`${styles['ct-addr-wrap']}`}>
                            <div className={`${styles['ct-info-row']}`}>
                                <Link href={`mailto:${data['email']['meta_value'] ?? 'info@ipoint.com.mt'}`} className="fx fx-ac">
                                    <div className={`${styles['ct-info-icon']} fx`}>
                                        <EmailIcon />
                                    </div>
                                    <span>{`${data['email']['meta_value'] ?? 'info@ipoint.com.mt'}`}</span>
                                </Link>
                            </div>
                            <div className={`${styles['ct-info-row']}`}>
                                <Link href="/" className="fx fx-as">
                                    <div className={`${styles['ct-info-icon']} fx`}>
                                        <MapIcon />
                                    </div>
                                    <span>{`${data['address']['meta_value'] ?? '42, Triq L-Amaroz, <br/> Mgarr, Malta'}`}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;