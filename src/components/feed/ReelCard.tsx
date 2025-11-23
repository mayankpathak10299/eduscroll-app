// src/components/feed/ReelCard.tsx

import React, { useState, useEffect } from 'react';
import { Reel } from '../../data/mockData';
import ReelInfo from './ReelInfo'; 
import ReelActions from './ReelActions'; 

const ReelCard: React.FC<{ reel: Reel, onOpenComments: (id: number) => void, onVideoEnd: () => void }> = ({ reel, onOpenComments, onVideoEnd }) => {
    const [hasEnded, setHasEnded] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasEnded(true);
            onVideoEnd();
        }, 5000); 

        return () => {
            clearTimeout(timer);
            setHasEnded(false);
        };
    }, [reel.id, onVideoEnd]);

    return (
        // FIX: The container is now a grid/flex layout, ensuring content is layered correctly.
        <div className="relative w-full h-full flex-shrink-0 bg-black overflow-hidden">
            
            {/* 1. Video Content (Absolute/Background Layer) */}
            <img 
                src={reel.videoUrl} 
                alt={reel.title} 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* 2. Gradient Overlay (Absolute Layer) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 z-10"></div>
            
            {/* 3. Main Content Layer (Absolute, sits on top for final positioning) */}
            {/* We use flex-col and justify-end to guarantee all overlays stick to the bottom edge. */}
            <div className="absolute inset-0 w-full h-full flex flex-col justify-end z-20 p-4">
                
                {/* Spacer/Empty space to fill the top, pushing content down */}
                <div className="flex-1 min-h-[10px]"></div>

                {/* Overlays Container (The actual bottom row) */}
                <div className="flex w-full items-end justify-between">
                    
                    {/* Reel Info (Left Side Text) */}
                    <div className="flex-1 min-w-0 pr-4">
                        <ReelInfo reel={reel} />
                    </div>
                    
                    {/* Reel Actions (Right Side Icons) */}
                    <div className="flex-shrink-0 mb-4"> 
                        <ReelActions reel={reel} onOpenComments={onOpenComments} />
                    </div>
                </div>
            </div>

            {/* Simulated Quiz Prompt Overlay */}
            {hasEnded && (
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                    <p className="text-white text-3xl font-extrabold bg-black/40 p-4 rounded-xl animate-pulse">
                        Video Complete!
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReelCard;