'use client'
import {useAuth} from "@/hooks/UseAuth";
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/components/(Admin)/Login/Login'), { ssr: false });

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