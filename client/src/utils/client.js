// General client for all requests

const fetchClient = async (endpoint, { method = 'GET', headers = {}, body = null, cache = 'no-store' } = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const defaultHeaders = {
        'Accept': 'application/json',
        'Origin': process.env.SITE_URL,
        ...headers,
    };

    // Remove 'Content-Type' header if body is FormData
    if (body instanceof FormData) {
        delete defaultHeaders['Content-Type'];
    } else if (body) {
        defaultHeaders['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body || null,
            cache,
        });

        if (!response.ok) {
            // Extract error message from response if available
            let errorMessage = ``;
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
            throw networkError;
        } else {
            // Other errors
            const fetchError = `Error fetching data: ${error.message}`;
            console.error(fetchError);
            throw fetchError
        }
    }
};

export default fetchClient;