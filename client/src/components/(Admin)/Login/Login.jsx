"use client"
import {useEffect, useState} from 'react';
import styles from "./Login.module.scss"
import "@/app/_baseadmin.scss"
import Image from "next/image"
import InputField from "@/components/(Admin)/InputField/InputField"
import { ErrorIcon } from '@/components/svgs/admin'
import {useRouter} from "next/navigation";

const Login = ({login}) => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && error.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    },[router.reset, error.length])

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailField = document.getElementById('login-usr').value;

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!isEmailValid(emailField)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        //console.log(error); return false;
        await login({
            email,
            password,
            setError,
            setStatus,
        })
    }

    return (
        <div className={`${styles['login-pg']} fx fx-jb`}>
            <div className={`${styles['login-col']} fx fx-ac fx-je`}>
                <div className={`${styles['login-col-wrap']}`}>
                    <div>
                        <Image
                            src="/build-logo-login.svg"
                            width="77"
                            alt="IPOINT Build logo"
                            height="100"
                        />
                    </div>
                    <div className={`${styles['login-col-fm']}`}>
                        <h1>Login</h1>
                        <h2>Please fill in your details</h2>
                        <div className={`${styles['login-form']}`}>
                            <form onSubmit={handleSubmit}>
                                <div className={`${styles['admin-field']} ${error ? styles['admin-field-err'] : ''}`}>
                                    <InputField
                                        type="email"
                                        id="login-usr"
                                        name="login-usr"
                                        placeholder="Username *"
                                        autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={`${styles['admin-field']} ${error ? styles['admin-field-err'] : ''}`}>
                                    <InputField
                                        type="password"
                                        id="login-pass"
                                        name="login-pass"
                                        placeholder="Password *"
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && error.length > 0 && (
                                    <div className={`${styles['admin-err-area']} fx fx-ac`}>
                                        <div className={`${styles['err-icon']} fx`}>
                                            <ErrorIcon />
                                        </div>
                                        <span>{error}</span>
                                    </div>
                                )}
                                <div className={`${styles['admin-field-btn']}`}>
                                    <button type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles['login-col']} fx fx-ac`}></div>
        </div>
    );
}

export default Login;