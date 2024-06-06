async function getClients() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/clients/', {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        const responseData = await response.json(); // Parse JSON response
        if (!response.ok) {
            return Promise.reject(Error(`HTTP error! Status: ${response.status}`));
        }

        return { ok: response.ok, data: responseData };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function updateEventLogos(data, token=false) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/clients/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
                // 'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: data
        });

        if (!response.ok) {
            const error = new Error(`HTTP error! Status: ${response.status} Message: ${response.statusText}`);
            error.response = response; // Attach the response object to the error
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function deleteEventLogo(id){
    try {
        // Perform the API call to delete the logo
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            //return Promise.reject(Error(`HTTP error! Status: ${response.status} Message: ${response.statusText}`));
            const error = new Error(`HTTP error! Status: ${response.status} Message: ${response.statusText}`);
            error.response = response; // Attach the response object to the error
            throw error;
            //throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting logo:', error);
    }
}

export {getClients, updateEventLogos, deleteEventLogo}