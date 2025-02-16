"use server";
import User from "@/utils/models/user.model";
import { cookies } from 'next/headers';

export const createUser = async (formData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (!name || !email || !password || !confirmPassword || password !== confirmPassword) {
        return { error: 'Please fill in all fields correctly' };
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: 'User already exists' };
        }

        const newUser = await User.create({ name, email, password });
        
        // Set cookie with stringified user data
        cookies().set({
            name: 'user',
            value: JSON.stringify({
                id: newUser._id.toString(),
                email: newUser.email,
                name: newUser.name
            }),
            expires: Date.now() + 10 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        return { success: 'User created successfully' };
    } catch (error) {
        console.error('User creation error:', error);
        return { error: 'Error creating user' };
    }
};

export const loginUser = async (formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return { error: 'Please fill in all fields' };
    }

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return { error: 'Invalid email or password' };
        }

        // Set cookie with stringified user data
        cookies().set({
            name: 'user',
            value: JSON.stringify({
                id: user._id.toString(),
                email: user.email,
                name: user.name
            }),
            expires: Date.now() + 10 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        return { success: 'Login successful' };
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Error logging in' };
    }
};

export const logoutUser = async () => {
    try {
        cookies().delete('user');
        return { success: 'Logout successful' };
    } catch (error) {
        console.error('Logout error:', error);
        return { error: 'Error logging out' };
    }
};

export const resetPassword = async (formData) => {
    const email = formData.get('email');

    if (!email) {
        return { error: 'Please provide an email address' };
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: 'If an account exists with this email, you will receive a password reset link shortly.' };
        }

        const resetToken = Math.random().toString(36).slice(-8);
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000;
        await user.save();

        console.log(`Password reset link: http://localhost:3000/reset-password?token=${resetToken}`);

        return { success: 'If an account exists with this email, you will receive a password reset link shortly.' };
    } catch (error) {
        console.error('Password reset error:', error);
        return { error: 'Error processing your request' };
    }
}; 