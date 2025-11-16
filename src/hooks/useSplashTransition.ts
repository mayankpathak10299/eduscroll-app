import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate the splash screen delay and transition.
 */
export const useSplashTransition = (delay: number = 3500) => {
    const [showSplash, setShowSplash] = useState(true);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        // Stage 1: Wait for the main animation duration
        const animationTimer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1500); // Animation duration (1.5s)

        // Stage 2: Wait for the total delay before hiding the splash screen
        const transitionTimer = setTimeout(() => {
            setShowSplash(false);
        }, delay);

        return () => {
            clearTimeout(animationTimer);
            clearTimeout(transitionTimer);
        };
    }, [delay]);

    return { showSplash, animationComplete };
};