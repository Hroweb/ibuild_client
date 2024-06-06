// admin api requests
import {showErrorAlert} from "@/hooks/admin/helpers";

async function getPageData(page) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/pages/' + page, {
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

async function updatePageData(page, newData, token=false) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/pages/' + page, {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: newData
        });

        return await response.json();
    } catch (error) {
        console.error('api catch error', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function refreshJWTToken() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${expiredToken}` // Send the expired token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        const newToken = data.token; // Assuming the server returns a new token

        // Update the stored token with the new token
        localStorage.setItem('token', newToken);

        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}

export { getPageData, updatePageData };
