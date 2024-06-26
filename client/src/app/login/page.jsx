'use client'
import Login from "@/components/(Admin)/Login/Login"
import {useAuth} from "@/hooks/UseAuth";

export default function LoginPage() {
    const { login, user, loading } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/admin',
    });

    if (loading && user) return null
    return (
        <Login login={login} />
    )
}