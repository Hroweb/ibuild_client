async function getServicesList() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/services/', {
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

async function updateOrCreate(data) {
    //console.log(JSON.stringify(data)); return false;
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/services/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            body: JSON.stringify(data), // Convert data to JSON string
            cache: 'no-store'
        });

        //const responseData = await response.json(); // Parse JSON response
        if (!response.ok) {
            return Promise.reject(Error(`HTTP error! Status: ${response.status}`));
        }

        return await response.json();
        //return { ok: response.ok, data: responseData };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function deleteService(id){
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/services/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            body: JSON.stringify({id: id}), // Convert data to JSON string
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

export { getServicesList, updateOrCreate, deleteService }