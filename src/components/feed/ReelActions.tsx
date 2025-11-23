// src/components/feed/ReelActions.tsx

import React, { useState } from 'react';
import { Heart, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import { Reel } from '../../data/mockData';
import { MOCK_COMMENTS } from '../modals/CommentModal'; 

const ReelActions: React.FC<{ reel: Reel, onOpenComments: (id: number) => void }> = ({ reel, onOpenComments }) => {
    
    // --- DEMO STATE ---
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likeCount, setLikeCount] = useState(reel.likes);
    // ----------------------
    
    const commentsForReel = MOCK_COMMENTS[reel.id as keyof typeof MOCK_COMMENTS];
    const commentCount = commentsForReel ? commentsForReel.length : 0;

    const formatCount = (count: number): string => 
        count > 999 ? `${(count / 1000).toFixed(1)}K` : String(count);

    // --- HANDLERS ---
    const handleLike = () => {
        setIsLiked(prev => {
            setLikeCount(prev ? likeCount - 1 : likeCount + 1);
            return !prev;
        });
    };

    const handleSave = () => {
        setIsSaved(prev => !prev);
    };
    // --------------------

    return (
        // FIX: Increased Z-index to z-50 to guarantee click priority over all other overlays (z-10, z-20).
        <div className="flex flex-col space-y-6 text-white z-50"> 
            
            {/* LIKE/HEART BUTTON */}
            <div 
                className="flex flex-col items-center cursor-pointer transition transform hover:scale-110"
                onClick={handleLike}
            >
                <Heart 
                    className={`w-8 h-8 drop-shadow-lg transition ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                />
                <span className="text-xs font-semibold drop-shadow-lg">
                    {formatCount(likeCount)}
                </span>
            </div>
            
            {/* COMMENT BUTTON - Clickable area must be highest priority */}
            <div 
                className="flex flex-col items-center cursor-pointer transition transform hover:scale-110"
                onClick={() => onOpenComments(reel.id)} 
            >
                <MessageSquare className="w-8 h-8 drop-shadow-lg" />
                <span className="text-xs font-semibold drop-shadow-lg">
                    {formatCount(commentCount)}
                </span>
            </div>
            
            {/* SAVE/BOOKMARK BUTTON */}
            <div 
                className="flex flex-col items-center cursor-pointer transition transform hover:scale-110"
                onClick={handleSave}
            >
                <Bookmark 
                    className={`w-8 h-8 drop-shadow-lg transition ${isSaved ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} 
                />
                <span className="text-xs font-semibold drop-shadow-lg">
                    {formatCount(reel.saved)}
                </span>
            </div>
            
            {/* SHARE BUTTON */}
            <div 
                className="flex flex-col items-center cursor-pointer transition transform hover:scale-110"
                onClick={() => alert(`Sharing reel: ${reel.title}`)}
            >
                <Share2 className="w-8 h-8 drop-shadow-lg" />
                <span className="text-xs font-semibold drop-shadow-lg">Share</span>
            </div>
        </div>
    );
};

export default ReelActions;