'use client';

import { lusitana } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    KeyIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signup } from '@/app/lib/api';
import Link from "next/link";

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await signup(email, password,false);
            setMessage('Signup successful! You can now log in.');
            router.push('/authentication/login');
        } catch (err) {
            console.error(err);
            // @ts-ignore
            setMessage(err.response?.data?.detail || 'Signup failed');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSignup} className="space-y-3 w-full max-w-sm">
                <div className="rounded-lg bg-white px-6 pb-6 pt-8 shadow-md">
                    <h1 className={`${lusitana.className} mb-3 text-2xl text-center`}>
                        Create Account
                    </h1>

                    <div className="w-full">
                        {/* Email */}
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    minLength={3}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="mt-6 w-full">
                        Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                    </Button>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-700">
                            Already have an account?{' '}
                            <Link
                                href="/authentication/login"
                                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                    {message && (
                        <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
                    )}
                </div>
            </form>
        </div>
    );
}
