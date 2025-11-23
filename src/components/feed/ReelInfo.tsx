// src/components/feed/ReelInfo.tsx

import React from 'react';
import { Reel } from '../../data/mockData';
import { useSubscription } from '../../context/SubscriptionContext'; 

const ReelInfo: React.FC<{ reel: Reel }> = ({ reel }) => {
    const { followedCreators, toggleFollow } = useSubscription();
    const isFollowed = followedCreators.has(reel.creator);

    return (
        // FIX: Removed all layout positioning/padding (bottom-0, w-3/4, pb-4, etc.)
        <div className="text-white z-20"> 
            <div className="mb-2">
                <span className="px-2 py-0.5 bg-emerald-600/80 text-xs font-bold rounded-full">{reel.subject}</span>
            </div>
            <h2 className="text-xl font-bold drop-shadow-md">{reel.title}</h2>
            <p className="text-sm font-light drop-shadow-md mt-1 mb-2">{reel.description}</p>
            
            {/* Creator Info & Subscription Button */}
            <div className="flex items-center justify-between mt-2 pr-10">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-300 rounded-full mr-2 flex items-center justify-center text-xs font-bold text-gray-800 flex-shrink-0">
                        {reel.creator.charAt(0)}
                    </div>
                    <p className="text-sm font-medium drop-shadow-md">@{reel.creator.replace(/\s/g, '').toLowerCase()}</p>
                </div>

                {/* Subscription/Follow Button */}
                <button
                    onClick={() => toggleFollow(reel.creator)}
                    className={`
                        py-1 px-3 text-xs font-semibold rounded-full border 
                        transition-colors duration-200 shadow-md flex-shrink-0
                        ${isFollowed 
                            ? 'bg-gray-700 border-gray-500 text-gray-300 hover:bg-gray-600'
                            : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700'
                        }
                    `}
                >
                    {isFollowed ? 'Following' : '+ Follow'}
                </button>
            </div>
            
            {/* Continue Learning CTA */}
            {reel.externalLink && (
                <a 
                    href={reel.externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 block text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors drop-shadow-md underline"
                >
                    {reel.externalLinkText || "Continue Learning"}
                </a>
            )}
        </div>
    );
};

export default ReelInfo;