import {useState, useRef, useEffect} from 'react';
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import InputField from "@/components/(Admin)/InputField/InputField";
import {DeleteIcon, EditIcon, SaveIcon} from "@/components/svgs/admin";
import {delCategoryFromApi, saveCategoryToApi} from "@/utils/api/(admin)/post";
import {showConfirmAlert, showSuccessAlert, slugify, sortByTitle} from "@/hooks/admin/helpers";

const TabContent = ({data}) => {
    let category = data?.pageData?.categories?.data ?? false;
    const title = data?.pageData?.title ?? null;
    const subTitle = data?.pageData?.subTitle;
    const type = data?.pageData?.type;
    const inputRef = useRef(null);
    const [newItemId, setNewItemId] = useState(null);
    if(type !== 'event_cat') category = sortByTitle(category, true);

    const initialFormData = {
        'eventCat':category.map(cat => ({ ...cat, readOnly: 'readonly' }))
    };
    const [formData, setFormData] = useState(initialFormData);
    const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [newItemId]);

    const handleAddNew = () => {
        const newItem = {
            id: generateUniqueId(),
            title: 'New Item',
            slug: 'new-item',
            type: type
        };
        setFormData(prevState => ({
            ...prevState,
            eventCat: [
                ...prevState.eventCat,
                newItem
            ]
        }));
        setNewItemId(newItem.id);
    };


    const handleEditClick = async (id) => {
        // Find the category to check its current readOnly status
        const categoryToEdit = formData.eventCat.find(cat => cat.id === id);

        // Check if the category is currently editable (not readOnly)
        if (categoryToEdit && !categoryToEdit.readOnly) {
            const dataToSave = {
                id: categoryToEdit.id,
                title: categoryToEdit.title,
                type: categoryToEdit.type,
                slug: categoryToEdit.slug
            };

            // Save changes to API
            try {
                const result = await saveCategoryToApi(dataToSave);
                if(result.ok){
                    showSuccessAlert(result.message);
                }
            } catch (error) {
                console.error('Error saving changes:', error);
                // Optionally, handle error (e.g., showing an error message)
                return;
            }
        }

        // Set focus on the input field associated with the item being edited
        const inputFieldId = `${id}`;
        const inputField = document.getElementById(inputFieldId);
        if (inputField) {
            inputField.focus();
            inputField.setSelectionRange(inputField.value.length, inputField.value.length);
        }

        // Regardless of saving, toggle the readOnly status
        setFormData(prevState => ({
            ...prevState,
            eventCat: prevState.eventCat.map(cat => {
                if (cat.id === id) {
                    return { ...cat, readOnly: !cat.readOnly };
                }
                return cat;
            })
        }));
    };

    const handleDeleteClick = (id) => {
        if(String(id).startsWith('_')) {
            proceedWithDeletion(id)
        } else {
            showConfirmAlert().then((result) => {
                if (result) {
                    deleteCategoryFromApi(id).then(r => '');
                }
            });
        }
    };

    const deleteCategoryFromApi = async (id) => {
        try {
            const result = await delCategoryFromApi(id);
            if(result.ok){
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            return;
        }
        // After successful deletion from the backend, update the state
        proceedWithDeletion(id);
    };

    const proceedWithDeletion = (id) => {
        setFormData(prevState => ({
            ...prevState,
            eventCat: prevState.eventCat.filter(cat => cat.id !== id)
        }));
    }

    const handleInputChange = (id, newValue) => {
        setFormData(prevState => ({
            ...prevState,
            eventCat: prevState.eventCat.map(cat => cat.id === id ? { ...cat, title: newValue, slug: slugify(newValue) } : cat)
        }));
    };

    return (
        <>
            <div className={`${styles['admin-page-wrap']}`}>
                <h2>{subTitle}</h2>
                <div className={`${styles['admin-cat-block']}`}>
                    <h3>All { title }</h3>
                    <div className={`${styles['admin-cats-list']}`}>
                        {formData.eventCat.map((item, index) => (
                            item.title !== 'All Stands' &&
                            <div className={`${styles['admin-cat-row']} fx fx-ac fx-jb`} key={item.id}>
                                <div className={`${styles['admin-cat-field']}`}>
                                    <InputField
                                        ref={newItemId === item.id ? inputRef : null}
                                        type="text"
                                        id={item.id}
                                        name={`category-${item.id}`}
                                        placeholder="Category name"
                                        autoComplete="off"
                                        value={item.title}
                                        readOnly={item.readOnly}
                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                    />
                                </div>
                                <div className="fx fx-ac">
                                    <div className={`${styles['admin-cat-edit']} fx fx-ac fx-jc`} onClick={() => handleEditClick(item.id)}>
                                        {item.readOnly ? <EditIcon /> : <SaveIcon onClick={() => handleEditClick(item.id)} />}
                                    </div>
                                    <div className={`${styles['admin-cat-del']} fx fx-ac fx-jc`}>
                                        <DeleteIcon onClick={() => handleDeleteClick(item.id)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={`${styles['admin-addBtn-row']}`}>
                        <button type="button" className="btn-primary" onClick={handleAddNew}>
                            Add New
                        </button>
                    </div>
                </div>
            </div>
        </>
      )
}

export default TabContent