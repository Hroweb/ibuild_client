import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import {useCallback, useState, useEffect} from "react";
import { SvDelete } from '@/components/svgs/admin';
import {showConfirmAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {storeServices, deleteService} from "@/utils/api/(admin)/post";

const TabContent = ({data}) => {
    const list = data?.svList?.data ?? [];
    const [servicesList, setServicesList] = useState(list || []);
    const [errors, setErrors] = useState([]);
    const [isAddNewVisible, setIsAddNewVisible] = useState(false);

    const deleteLastService = useCallback(() => {
        setServicesList(currentList => {
            const lastService = currentList[currentList.length - 1];
            if (lastService && !lastService.title && !lastService.subtitle && !lastService.description && !lastService.fulltext) {
                setIsAddNewVisible(false);
                return currentList.slice(0, -1);
            }
            return currentList;
        });
    }, []);

    // Using useCallback to memoize the handler to prevent unnecessary re-renders
    const handleAddNewToggle = useCallback(() => {
        setIsAddNewVisible(prev => !prev);
        if (!isAddNewVisible /*&& !isOpened*/) {
            setServicesList(currentList => [
                ...currentList,
                { title: '', subtitle: '', description: '', fulltext: '' }
            ]);
        } else {
            deleteLastService();
        }
    }, [deleteLastService, isAddNewVisible]);

    // Optimized to prevent recreating function on every render
    const handleInputChange = useCallback((index, field, value) => {
        setServicesList(currentList => currentList.map((item, idx) => {
            if (idx === index) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    }, []);

    const validateServices = useCallback(() => {
        const newErrors = servicesList.map(service => ({
            title: service.title ? '' : 'Title is required.',
            subtitle: service.subtitle ? '' : 'Subtitle is required.',
            description: service.description ? '' : 'Description is required.',
            fulltext: service.fulltext ? '' : 'Full text is required.',
        }));

        setErrors(newErrors);

        return !newErrors.some(serviceError => Object.values(serviceError).some(errorMessage => errorMessage));
    }, [servicesList]);

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

    const scrollToInvalidItem = useCallback((index) => {
        const invalidItem = document.querySelector(`.${styles['sv-item']}:nth-child(${index + 1})`);
        if (invalidItem) {
            setTimeout(() => {
                smoothScrollTo(invalidItem.offsetTop - 20, 800);
            }, 100);
        }
    }, []);

    useEffect(() => {
        const firstInvalidIndex = errors.findIndex(error => Object.values(error).some(errorMessage => errorMessage));
        if (firstInvalidIndex !== -1) {
            scrollToInvalidItem(firstInvalidIndex);
        }
    }, [errors, scrollToInvalidItem]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = useCallback(async (event) => {

        setIsSubmitting(true);

        event.preventDefault();
        if (!validateServices()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await storeServices(servicesList);
            if (response.ok) {
                showSuccessAlert(response.message);
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }, [servicesList, validateServices]);

    const handleServiceDelete = useCallback(async (id) => {
        if (undefined === id) {
            deleteLastService();
        } else {
            showConfirmAlert().then((result) => {
                if (result) {
                    proceedWithDelete(id).then(r => '');
                }
            });
        }
    }, [deleteLastService]);

    const proceedWithDelete = async (id) =>{
        try {
            const response = await deleteService(id);
            if (response.ok) {
                showSuccessAlert(response.message);
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    return (
        <>
            <div className={`${styles['admin-tabs-content']}`}>
                <div>
                    {servicesList.map((service, index) => (
                        <div key={index} className={`${styles['sv-item']}`}>
                            <div onClick={() => handleServiceDelete(service.id)} className={`${styles['close-btn']} fx`}>
                                <SvDelete />
                            </div>
                            <TitleBlock
                                sectionTitle="Service name"
                                sectionTitleVal={service.title}
                                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                inputID={`service-title-${index}`}
                                inputPlaceholder="Service title"
                                classname={errors[index]?.title ? `${styles['invalid']}` : ''}
                            />
                            <DescBlock
                                sectionTitle="SubTitle"
                                sectionTitleVal={service.subtitle}
                                inputID={`sv-item-subtitle-${index}`}
                                inputName={`sv-item-subtitle-${index}`}
                                onChange={(event) => handleInputChange(index, 'subtitle', event.target.value)}
                                classname={errors[index]?.subtitle ? `${styles['invalid']}` : ''}
                            />
                            <DescBlock
                                sectionTitle="Short Description"
                                sectionTitleVal={service.description}
                                inputID={`sv-item-desc-${index}`}
                                inputName={`sv-item-desc-${index}`}
                                onChange={(event) => handleInputChange(index, 'description', event.target.value)}
                                classname={errors[index]?.description ? `${styles['invalid']}` : ''}
                            />
                            <DescBlock
                                sectionTitle="Full Text"
                                sectionTitleVal={service.fulltext}
                                inputID={`sv-item-text-${index}`}
                                inputName={`sv-item-text-${index}`}
                                onChange={(event) => handleInputChange(index, 'fulltext', event.target.value)}
                                classname={errors[index]?.fulltext ? `${styles['invalid']}` : ''}
                            />
                        </div>
                    ))}
                    <div className={`${styles['addNew-sv-row']} ${isAddNewVisible ? styles['show-new-row'] : ''}`} onClick={handleAddNewToggle}>
                        <div className="fx fx-ac fx-jb">
                            <span>Add New Service</span>
                            <div className={`${styles['addNew-toggle']} ${isAddNewVisible ? styles['opened'] : ''}`}>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['admin-btn-row']}>
                <button 
                    type="submit" 
                    className="btn-primary" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Apply changes'}
                </button>
            </div>
        </>
    )
}

export default TabContent