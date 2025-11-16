import React from 'react';
import { Heart, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import { Reel } from '../../data/mockData';
import { MOCK_COMMENTS } from '../modals/CommentModal'; // Import from local mock data for comment count

const ReelActions: React.FC<{ reel: Reel, onOpenComments: (id: number) => void }> = ({ reel, onOpenComments }) => {
    // Check if the key exists and if it's an array before getting the length
    const commentsForReel = MOCK_COMMENTS[reel.id as keyof typeof MOCK_COMMENTS];
    const commentCount = commentsForReel ? commentsForReel.length : 0;

    const formatCount = (count: number) => 
        count > 999 ? `${(count / 1000).toFixed(1)}K` : count;

    return (
        <div className="absolute right-4 bottom-20 flex flex-col space-y-6 text-white z-20">
            <div className="flex flex-col items-center cursor-pointer transition transform hover:scale-110">
                <Heart className="w-8 h-8 drop-shadow-lg" />
                <span className="text-xs font-semibold drop-shadow-lg">{formatCount(reel.likes)}</span>
            </div>
            
            <div 
                className="flex flex-col items-center cursor-pointer transition transform hover:scale-110"
                onClick={() => onOpenComments(reel.id)}
            >
                <MessageSquare className="w-8 h-8 drop-shadow-lg" />
                <span className="text-xs font-semibold drop-shadow-lg">
                    {formatCount(commentCount)}
                </span>
            </div>
            
            <div className="flex flex-col items-center cursor-pointer transition transform hover:scale-110">
                <Bookmark className="w-8 h-8 drop-shadow-lg" />
                <span className="text-xs font-semibold drop-shadow-lg">{formatCount(reel.saved)}</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer transition transform hover:scale-110">
                <Share2 className="w-8 h-8 drop-shadow-lg" />
                <span className="text-xs font-semibold drop-shadow-lg">Share</span>
            </div>
        </div>
    );
};

export default ReelActions;