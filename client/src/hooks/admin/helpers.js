import Swal from "sweetalert2";

export const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
}

export const showSuccessAlert = (message, back = false) => {
    Swal.fire({
        position: "center",
        padding: '0 1em 3em',
        icon: "success",
        iconColor: "#34F55F",
        title: message,
        showConfirmButton: false,
        timer: 1500
    }).then(function(){
        (!back) ? location.reload() : window.history.back();
    })
};

export const showErrorAlert = (message, title = false) => {
    if(title){
        Swal.fire({
            position: "center",
            padding: '0 1em 3em',
            icon: "error",
            iconColor: "#FF135A",
            title: title,
            text: message,
            showConfirmButton: false,
            timer: 5000
        });
    }else{
        Swal.fire({
            position: "center",
            padding: '0 1em 3em',
            icon: "error",
            iconColor: "#FF135A",
            title: message,
            showConfirmButton: false,
            timer: 5000
        });
    }
};

export const showConfirmAlert = async () => {
    try {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert back!",
            icon: "warning",
            iconColor: "#FF135A",
            padding: '0 1em 2.5em',
            showCancelButton: true,
            confirmButtonColor: "#FF135A",
            cancelButtonColor: "#CECECE",
            confirmButtonText: "Yes, delete it!"
        });

        // Return true or false based on confirmation directly
        return result.isConfirmed;
    } catch (error) {
        // Optionally, handle errors
        console.error("Error showing confirmation alert", error);
        throw error; // or return a default value
    }
};

export const handleApiError = (error, msg=false, isCases = false) => {
    if (error && error.errors) {
        const apiErrors = error.errors;
        const firstErrorKey = Object.keys(apiErrors)[0]; // Get the first key from the errors object

        if (firstErrorKey && apiErrors[firstErrorKey].length > 0) {
            let firstErrorMessage = apiErrors[firstErrorKey][0];
            let errorTitle = false;
            if(isCases) errorTitle = firstErrorKey;

            // Display the simplified error message
            showErrorAlert(!!msg ? firstErrorMessage : 'Please fill in all required fields!', errorTitle);
        } else {
            // Fallback for unexpected error format
            showErrorAlert('An unexpected error occurred.');
        }
    } else {
        // Fallback for any error that doesn't contain the expected errors property
        showErrorAlert('Ann unexpected error occurred.');
    }
};

export const handleBasicError = (msg) => {
    showErrorAlert(msg);
}

export const appendFormData = (formData, data, path = []) => {
    // Iterate over each key in the data object
    Object.entries(data).forEach(([key, value]) => {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key);
        const newPath = [...path, key];

        if (isUUID) {
            // Since UUID represents a section, we prepare to include the sectionId within each template's scope
            // However, the template name is not known at this level, so actual appending will happen within the object iteration below
        }

        if (value instanceof File) {
            // Handle file keys specifically
            let formKey = newPath.join('][');
            formKey = formKey.replace(/(case-block-[a-z0-9-]+|case-bl-[a-z0-9-]+|case-col-[a-z0-9-]+|case-2col-img-[a-z0-9-]+)-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/g, '$1');
            formData.append(`templates[${formKey}]`, value, value.name);
        } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
            // This object could be the templates object where each key is a template name
            // We pass the UUID down to include it within each template
            appendFormData(formData, value, newPath, isUUID ? key : undefined);
        } else {
            // For primitive values, append them directly
            let formKey = newPath.join('][');
            formKey = formKey.replace(/(case-block-[a-z0-9-]+|case-bl-[a-z0-9-]+|case-col-[a-z0-9-]+|case-2col-img-[a-z0-9-]+)-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/g, '$1');
            //formData.append(`templates[${formKey}]`, value);
            if (!formKey.includes('img') && !formKey.includes('gif')) {
                formData.append(`templates[${formKey}]`, value);
            }
        }

        // Check if the UUID was passed down and this key is a template name
        if (path.length > 0 && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(path[path.length - 1])) {
            // Append sectionId within this template context
            let sectionIdPath = [...path, key, 'case-block-id'];
            let sectionIdKey = sectionIdPath.join('][');
            formData.append(`templates[${sectionIdKey}]`, path[path.length - 1]);
        }
    });
}

export const findValueByPrefix = (object, prefix) => {
    const values = [];
    for (const key in object) {
        if (object.hasOwnProperty(key) && key.startsWith(prefix)) {
            values.push(object[key]); // Collect all matching values
        }
    }
    return values.length > 0 ? values : null; // Return the array of values or null if no match is found
}

export const sortByTitle = (data, toInt = false) => {
    return data.sort((a, b) => {
        if(toInt){
            return parseInt(a.title) - parseInt(b.title);
        }
        return a.title.localeCompare(b.title);
    });
}