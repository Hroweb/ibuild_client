const fetchClient = async (endpoint, { method = 'GET', headers = {}, body = null, cache = 'no-store', revalidate } = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
    const defaultHeaders = {
        'Accept': 'application/json',
        'Origin': process.env.SITE_URL,
        ...headers,
    };

    // Add Authorization header if requiresAuth is true and token exists
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Remove 'Content-Type' header if body is FormData
    if (body instanceof FormData) {
        delete defaultHeaders['Content-Type'];
    } else if (body) {
        defaultHeaders['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
    }

    try {
        const fetchOptions = {
            method,
            headers: defaultHeaders,
            body: body || null,
        };

        // Conditionally add cache or revalidate
        if (revalidate) {
            fetchOptions.next = { revalidate };
        } else {
            fetchOptions.cache = cache;
        }

        const response = await fetch(`${baseURL}${endpoint}`, fetchOptions);

        if (!response.ok) {
            // Extract error message from response if available
            let errorMessage = '';
            try {
                const errorData = await response.json();
                errorMessage += ` ${errorData.message || JSON.stringify(errorData)}`;
            } catch (e) {
                // Fallback to response status text if JSON parsing fails
                errorMessage += ` - ${response.statusText}`;
            }
            console.error(errorMessage);
            return { error: errorMessage };
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError') {
            // Network errors, such as failed to fetch
            const networkError = `Network error: ${error.message}`;
            console.error(networkError);
            throw error;
        } else {
            // Other errors
            const fetchError = `Error fetching data: ${error.message}`;
            console.error(fetchError);
            throw error;
        }
    }
};

export default fetchClient;