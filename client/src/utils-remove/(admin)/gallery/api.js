async function getGallery() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/gallery/', {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return Promise.reject(Error(`HTTP error! Status: ${response.status}`));
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function getTeam() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/team/', {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return Promise.reject(Error(`HTTP error! Status: ${response.status}`));
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function postGallery(data) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/gallery/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            body: data, // Convert data to JSON string
            cache: 'no-store'
        });

        if (!response.ok) {
            return Promise.reject(Error(`HTTP error! Status: ${response.status}`));
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function deleteGalleryImage(id){
    try {
        // Perform the API call to delete the logo
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            const error = new Error(`HTTP error! Status: ${response.status} Message: ${response.statusText}`);
            error.response = response; // Attach the response object to the error
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting logo:', error);
    }
}

export {getGallery, getTeam, postGallery, deleteGalleryImage}