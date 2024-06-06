async function authenticateUser(credentials) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate user');
        }

        const data = await response.json();
        const token = data.token;

        // Store the token in client-side storage (e.g., localStorage)
        localStorage.setItem('token', token);

        return token;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
}