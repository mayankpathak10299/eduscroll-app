// src/components/views/LoginPage.tsx

import React, { useState } from 'react';
import { LogIn, User, Lock } from 'lucide-react';

// Updated prop type to accept an email string from the success handler
const LoginPage: React.FC<{ onLoginSuccess: (page: string, email: string) => void }> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // --- AUTHENTICATION CONFIGURATION ---
    const CORRECT_EMAIL = 'demo@eduscroll.com';
    const CORRECT_PASSWORD = 'PassWord#2024';
    // ------------------------------------

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulated authentication logic
        if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
            setTimeout(() => {
                setLoading(false);
                // Pass the logged-in email back
                onLoginSuccess('dashboard', email); 
            }, 1000);
        } else {
            setTimeout(() => {
                setLoading(false);
                // Updated error message to reflect the new credentials
                setError(`Invalid credentials. Use ${CORRECT_EMAIL} and "${CORRECT_PASSWORD}".`);
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:shadow-2xl">
                <div className="p-8 md:p-10">
                    <div className="flex justify-center mb-6">
                        <LogIn className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
                        Welcome to EduScroll
                    </h2>
                    <p className="text-center text-gray-500 mb-8">
                        Sign in and start your learning journey.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-900" 
                                    placeholder={`Email address (e.g., ${CORRECT_EMAIL})`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-900" 
                                    placeholder={`Password (e.g., ${CORRECT_PASSWORD})`}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    w-full flex justify-center py-3 px-4 border border-transparent 
                                    rounded-xl shadow-sm text-lg font-medium text-white 
                                    bg-emerald-600 hover:bg-emerald-700 focus:outline-none 
                                    focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
                                    transition duration-150 ease-in-out
                                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                                `}
                            >
                                {loading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;