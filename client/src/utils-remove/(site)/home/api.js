async function getAnimation(page, title) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${page}/${title}`, {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return undefined;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function getHomeLogos() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/logos/`, {
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

async function getHomeServices(){
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/services/', {
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

async function getHomePosts(num = 3){
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/blog/posts/${num}`, {
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

async function getHomeCases(per_page = 6) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/events/case_studies/${per_page}`, {
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

export {getAnimation, getHomeLogos, getHomeServices, getHomePosts, getHomeCases}