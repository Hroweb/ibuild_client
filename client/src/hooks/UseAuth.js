import useSWR from 'swr';
import {useCallback, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

const apiUri = process.env.NEXT_PUBLIC_BACKEND_URL; // Ensure this is set in your .env.local file

// Function to setup fetch with JWT included
const authenticatedFetch = (url, options = {}) => {
    const token = localStorage.getItem('jwt_token');
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(res => {
        if (!res.ok) {
            return res.text().then(text => {
                const error = new Error('Failed to fetch');
                error.status = res.status;
                try {
                    error.body = JSON.parse(text);
                } catch {
                    error.body = text; // Use raw text if JSON parsing fails
                }
                throw error;
            });
        }
        return res.text().then(text => text ? JSON.parse(text) : {});
    });
};

const fetcher = url => authenticatedFetch(url);

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const { data: user, error, mutate } = useSWR(`${apiUri}/api/user`, fetcher, {
        revalidateOnFocus: false,
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
    });

    const login = async ({ setError, setStatus, ...props }) => {
        setError([]);
        setStatus(null);

        try {
            const response = await fetch(`${apiUri}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(props)
            });
            const data = await response.json();

            if (!response.ok || !data.status) {
                setError(data.message || 'Login failed');
            } else {
                localStorage.setItem('jwt_token', data.token); // Store the JWT in localStorage
                await mutate(); // revalidate user data
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = useCallback(async () => {
        try {
            await fetch(`${apiUri}/api/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('jwt_token');
            await mutate(null);
            router.push('/login');
        }
    }, [mutate, router]);

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
        }
        if (middleware === 'auth' && error) {
            logout().then(r => '');
        }
    }, [user, error, middleware, redirectIfAuthenticated, router, logout]);

    return {
        user,
        login,
        logout,
        loading, // Return the loading state
    };
};
