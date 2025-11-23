// src/App.tsx

"use client";

import React, { useState, useCallback } from 'react';
import LoginPage from '../../components/views/LoginPage';
import SplashScreen from '../../components/views/SplashScreen';
import DashboardPage from '../../components/views/DashboardPage';
import { SubscriptionProvider } from '../../context/SubscriptionContext'; 

const App = () => {
    const [currentPage, setCurrentPage] = useState('splash');
    const [userEmail, setUserEmail] = useState('demo@eduscroll.com'); 

    const handlePageChange = useCallback((newPage: string) => {
        setCurrentPage(newPage);
    }, []);

    const handleLoginSuccess = (newPage: string, email: string) => {
        setUserEmail(email);
        handlePageChange(newPage);
    };

    let Content;
    switch (currentPage) {
        case 'splash':
            Content = <SplashScreen onTransitionEnd={handlePageChange} />;
            break;
        case 'login':
            Content = <LoginPage onLoginSuccess={(page) => handleLoginSuccess(page, 'demo@eduscroll.com')} />; 
            break;
        case 'dashboard':
            // Wrap DashboardPage in the SubscriptionProvider
            Content = (
                <SubscriptionProvider>
                    <DashboardPage 
                        onLogout={() => handlePageChange('login')} 
                        userEmail={userEmail}
                    />
                </SubscriptionProvider>
            );
            break;
        default:
            Content = <LoginPage onLoginSuccess={(page) => handleLoginSuccess(page, 'demo@eduscroll.com')} />;
    }

    return (
        // FIX: Ensure the root container takes up full screen width (w-full)
        // If your original code had something like 'max-w-xl mx-auto' here, remove it.
        <div className="font-sans antialiased min-h-screen w-full"> 
            <style global jsx>{`
                /* Override Next.js default body styling to enable the full-screen reel experience */
                body { 
                    margin: 0;
                    padding: 0;
                    overflow: hidden !important; 
                }
                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: white }
                }
                /* Using the class name from the original design */
                .text-reveal {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    animation: 
                        typing 1.5s steps(8, end), 
                        blink-caret .75s step-end infinite;
                }
            `}</style>
            
            {Content}
        </div>
    );
};

export default App;