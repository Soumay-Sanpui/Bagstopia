'use client';
import React, { useState } from 'react';
import { createUser } from '@/utils/actions/userActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

const RegisterPage = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const response = await createUser(formData);
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
        <div className="register-container w-screen h-screen font-julius flex justify-center items-center flex-col">
            <div className="bg-white space-y-4 p-4 text-center">
                <h2 className="text-2xl font-bold">Bags-Topia</h2>
                <h2>Register</h2>
            </div>
            {error && <div className="text-red-500 font-bold">{error}</div>}
            {success && <div className="text-green-500 font-bold">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border-2 border-hvr rounded-sm shadow-lg w-[30%]">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="border-2 border-hvr rounded-sm p-2 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
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
                        required
                        className="border-2 border-hvr rounded-sm p-2 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="font-semibold">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        className="border-2 border-hvr rounded-sm p-2 outline-none"
                    />
                </div>
                <button type="submit" className="bg-hvr text-white p-2 rounded-sm w-full flex items-center justify-center">
                    {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                    Register
                </button>
            </form>
            <div className="my-4">
                <p>Already have an account? <Link href="/login" className="text-blue-700 underline underline-offset-4 font-bold">Login</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;
