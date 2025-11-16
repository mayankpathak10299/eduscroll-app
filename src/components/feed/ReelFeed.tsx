// src/components/feed/ReelFeed.tsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Reel } from '../../data/mockData';
import ReelCard from './ReelCard';

const ReelFeed: React.FC<{ reels: Reel[], onOpenComments: (id: number) => void }> = ({ reels, onOpenComments }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const totalReels = reels.length;

    // Reset index when reels list changes (i.e., when filtering/searching)
    useEffect(() => {
        setActiveIndex(0);
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [reels]);

    const scrollToReel = useCallback((index: number) => {
        if (containerRef.current && typeof window !== 'undefined') {
            containerRef.current.scrollTo({
                top: index * window.innerHeight,
                behavior: 'smooth',
            });
            setActiveIndex(index);
        }
    }, []);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (typeof window === 'undefined') return;
        // Throttle/debounce this in a real app
        const newIndex = Math.round(e.currentTarget.scrollTop / window.innerHeight);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    }, [activeIndex]);
    
    // Keyboard navigation for desktop testing (Up/Down arrows)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (activeIndex < totalReels - 1) {
                    scrollToReel(activeIndex + 1);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (activeIndex > 0) {
                    scrollToReel(activeIndex - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, totalReels, scrollToReel]);

    if (reels.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
                <p className="text-xl text-gray-400">No reels found.</p>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
            onScroll={handleScroll}
        >
            {reels.map((reel, index) => (
                <div key={reel.id} id={`reel-${reel.id}`} className="snap-start h-screen">
                    <ReelCard reel={reel} onOpenComments={onOpenComments} />
                </div>
            ))}
            
            {/* Navigation Indicators */}
            <div className="fixed top-1/2 left-2 transform -translate-y-1/2 flex flex-col space-y-1 z-30">
                {reels.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                            index === activeIndex ? 'bg-emerald-400 w-2 h-6' : 'bg-gray-500/50'
                        }`}
                        onClick={() => scrollToReel(index)}
                    ></div>
                ))}
            </div>
            
            {/* Scroll Arrows for mobile navigation */}
            {activeIndex > 0 && (
                <button 
                    className="fixed top-4 right-4 z-30 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition md:hidden"
                    onClick={() => scrollToReel(activeIndex - 1)}
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}
            {activeIndex < totalReels - 1 && (
                <button 
                    className="fixed bottom-4 right-4 z-30 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition md:hidden"
                    onClick={() => scrollToReel(activeIndex + 1)}
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default ReelFeed;