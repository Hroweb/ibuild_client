async function getTeam() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/team`, {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function getGrow() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/team`, {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function getGallery() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/gallery/', {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

export {getTeam, getGrow}