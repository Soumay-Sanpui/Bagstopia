'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/actions/userActions';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            router.push('/'); 
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const response = await loginUser(formData);
        setLoading(false);

        if (response.error) {
            setError(response.error);
            setSuccess('');
        } else if (response.success) {
            setSuccess(response.success);
            setError('');
            router.push('/'); 
        }
    };

    return (
        <div className="login-container w-screen h-screen font-julius flex justify-center items-center flex-col">
            <div className="bg-white space-y-4 p-4 text-center">
                <h2 className="text-2xl font-bold">Bags-Topia</h2>
                <h2>Login</h2>
            </div>
            {error && <div className="text-red-500 font-bold">{error}</div>}
            {success && <div className="text-green-500 font-bold">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border-2 border-hvr rounded-sm shadow-lg w-[30%]">
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-2 border-hvr rounded-sm p-2 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="font-semibold">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-2 border-hvr rounded-sm p-2 outline-none"
                    />
                </div>
                <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-sm text-blue-700 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <button type="submit" className="bg-hvr text-white p-2 rounded-sm w-full flex items-center justify-center">
                    {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                    Login
                </button>
            </form>
            <div className="my-4">
                <p>Don't have an account? <Link href="/register" className="text-blue-700 underline underline-offset-4 font-bold">Register</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
