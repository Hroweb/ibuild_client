async function getSingleTstInfo(id) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonial/${id}`, {
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

async function postTestimonial(data){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonial/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            body: data,
            mode: 'cors'
        });

        /*if (!response.ok) {
            return Promise.reject(Error(`HTTP error! Status: ${response.status}`));
        }*/

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function deleteTestimonial(id){
    try {
        // Perform the API call to delete the logo
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonial/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            //return Promise.reject(Error(`HTTP error! Status: ${response.status} Message: ${response.statusText}`));
            const error = new Error(`HTTP error! Status: ${response.status} Message: ${response.statusText}`);
            error.response = response; // Attach the response object to the error
            throw error;
            //throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting testimonial:', error);
    }
}

export { getSingleTstInfo, postTestimonial, deleteTestimonial }