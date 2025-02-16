'use client';
import React, { useState } from 'react';
import { resetPassword } from '@/utils/actions/userActions';
import Link from 'next/link';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await resetPassword(formData);

        if (response.error) {
            setError(response.error);
            setSuccess('');
        } else if (response.success) {
            setSuccess(response.success);
            setError('');
            setIsEmailSent(true);
        }
    };

    return (
        <div className="forgot-password-container w-screen h-screen font-julius flex justify-center items-center flex-col">
            <div className="bg-white space-y-4 p-4 text-center">
                <h2 className="text-2xl font-bold">Bags-Topia</h2>
                <h2>Forgot Password</h2>
            </div>
            {error && <div className="text-red-500 font-bold">{error}</div>}
            
            {!isEmailSent ? (
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
                    <p className="text-sm text-gray-600">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <button type="submit" className="bg-hvr text-white p-2 rounded-sm w-full">
                        Send Reset Link
                    </button>
                </form>
            ) : (
                <div className="text-center p-4 border-2 border-hvr rounded-sm shadow-lg w-[30%]">
                    <p className="text-gray-700 mb-4 text-xl">
                       {success} 
                    </p>
                </div>
            )}
            
            <div className="my-4">
                <Link href="/login" className="text-blue-700 hover:underline">
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage; 