import React from 'react';
import { Reel } from '../../data/mockData';
import ReelInfo from './ReelInfo';
import ReelActions from './ReelActions';

const ReelCard: React.FC<{ reel: Reel, onOpenComments: (id: number) => void }> = ({ reel, onOpenComments }) => {
    return (
        <div className="relative w-full h-screen flex-shrink-0 bg-black overflow-hidden">
            {/* Video Content Placeholder (using the image URL for simulation) */}
            <img 
                src={reel.videoUrl} 
                alt={reel.title} 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 z-10"></div>
            
            <ReelInfo reel={reel} />
            <ReelActions reel={reel} onOpenComments={onOpenComments} />
        </div>
    );
};

export default ReelCard;