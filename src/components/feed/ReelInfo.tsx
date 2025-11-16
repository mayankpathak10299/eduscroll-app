import React from 'react';
import { Reel } from '../../data/mockData';

const ReelInfo: React.FC<{ reel: Reel }> = ({ reel }) => (
    <div className="absolute left-4 bottom-4 text-white z-20 w-3/4">
        <div className="mb-2">
            <span className="px-2 py-0.5 bg-emerald-600/80 text-xs font-bold rounded-full">{reel.subject}</span>
        </div>
        <h2 className="text-xl font-bold drop-shadow-md">{reel.title}</h2>
        <p className="text-sm font-light drop-shadow-md mt-1">{reel.description}</p>
        <div className="flex items-center mt-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full mr-2 flex items-center justify-center text-xs font-bold text-gray-800">
                {reel.creator.charAt(0)}
            </div>
            <p className="text-sm font-medium drop-shadow-md">@{reel.creator.replace(/\s/g, '').toLowerCase()}</p>
        </div>
    </div>
);

export default ReelInfo;