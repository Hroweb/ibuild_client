async function getAllBlogPosts(per_page = 15) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/blog/posts/${per_page}`, {
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

async function getAllBlogCats() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/blog/categories/', {
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

async function getSingleBlogInfo(slug) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/post/${slug}`, {
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

async function postBlogSingle(data){
    console.log(JSON.stringify(data));
    for (const value of data.values()) {
        console.log(value);
    }
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/blog/posts/edit/', {
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

async function deletePost(id){
    try {
        // Perform the API call to delete the logo
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/post/${id}`, { method: 'DELETE' });
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

export { getAllBlogPosts, getAllBlogCats, getSingleBlogInfo, postBlogSingle, deletePost }