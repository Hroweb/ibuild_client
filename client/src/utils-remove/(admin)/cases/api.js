async function getAllCases(per_page = 15) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/events/case_studies/${per_page}`, {
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

async function getAllYears() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/categories/event_year/', {
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

export default function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

async function getAllStandSizes() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/categories/stand_size/', {
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

async function getAllEvents() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/categories/event_cat/', {
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

async function getSingleCaseInfo(slug) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/case_study/${slug}`, {
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

async function getAllTestimonials() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/testimonials/', {
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

async function getCaseCats(cat = false) {
    const endpoint = cat ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/categories/' + cat : process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/categories/';
    try {
        const response = await fetch(endpoint, {
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

async function saveCategoryToApi(data) {
    try {
        console.log(JSON.stringify(data))
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/categories/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            body: JSON.stringify(data), // Assuming 'data' is an instance of FormData
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

async function delCategoryFromApi(id){
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/categories/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            body: JSON.stringify({ id: id }), // Assuming 'data' is an instance of FormData
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

async function postCaseSingle(data){
    /*console.log(JSON.stringify(data));
    for (const value of data.values()) {
        console.log(value);
    }*/
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/event/case_study/edit/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            body: data, // Assuming 'data' is an instance of FormData
            cache: 'no-store'
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function deleteGalleryImage(eventID, photoID, type) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/case_study/${type}/${eventID}/${photoID}`;
        const response = await fetch(url, { method: 'DELETE' });

        if (!response.ok) {
            const error = new Error(`HTTP error! Status: ${response.status} Message: ${response.statusText}`);
            error.response = response;
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting gallery image:', error);
    }
}

async function deleteEvent(id){
    try {
        // Perform the API call to delete the logo
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/case_study/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            const error = new Error(`HTTP error! Status: ${response.status} Message: ${response.statusText}`);
            error.response = response; // Attach the response object to the error
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting testimonial:', error);
    }
}

export { getAllCases, formatDate, getAllYears, getAllStandSizes, getAllEvents, getSingleCaseInfo, getAllTestimonials, getCaseCats, saveCategoryToApi, delCategoryFromApi, postCaseSingle, deleteGalleryImage, deleteEvent }