// src/context/SubscriptionContext.tsx

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

// --- Types ---
interface SubscriptionContextType {
    followedCreators: Set<string>;
    toggleFollow: (creator: string) => void;
}

// --- Mock Data ---
// Initialize with some followed creators (by creator name)
const initialFollowedCreators = new Set<string>(["Dr. Physics"]);

// --- Context ---
const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// --- Provider Component ---
export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [followedCreators, setFollowedCreators] = useState<Set<string>>(initialFollowedCreators);

    const toggleFollow = useCallback((creator: string) => {
        setFollowedCreators(prevFollowed => {
            const newFollowed = new Set(prevFollowed);
            if (newFollowed.has(creator)) {
                newFollowed.delete(creator);
            } else {
                newFollowed.add(creator);
            }
            return newFollowed;
        });
    }, []);

    const value = {
        followedCreators,
        toggleFollow,
    };

    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
};

// --- Custom Hook ---
export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};