// src/components/common/Footer.tsx

import React from 'react';
import { Home, Video, User } from 'lucide-react';

// FIX: Extend the type definition to include 'syllabus'
type ViewType = 'home' | 'video' | 'user' | 'syllabus';

interface FooterProps {
    activeView: ViewType;
    onChangeView: (view: 'home' | 'video' | 'user') => void; // Footer buttons still only output these three actions
}

const Footer: React.FC<FooterProps> = ({ activeView, onChangeView }) => {
    
    // We check against the visible tabs ('home', 'video', 'user') for styling, 
    // even if activeView is 'syllabus'.
    const getActiveTab = (currentView: ViewType): 'home' | 'video' | 'user' => {
        if (currentView === 'syllabus') {
            // When in syllabus view, highlight the Home tab, as that's the "parent" flow.
            return 'home'; 
        }
        return currentView as 'home' | 'video' | 'user';
    }
    
    const activeTab = getActiveTab(activeView);

    const iconClass = (view: 'home' | 'video' | 'user') => 
        `flex flex-col items-center p-2 transition-colors duration-200 cursor-pointer ${
            activeTab === view ? 'text-emerald-400' : 'text-gray-400 hover:text-white'
        }`;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-gray-700/50">
            <div className="max-w-xl mx-auto flex justify-around h-16">
                
                <div 
                    className={iconClass('home')} 
                    onClick={() => onChangeView('home')}
                >
                    <Home className="w-6 h-6" />
                    <span className="text-xs mt-1">Home</span>
                </div>

                <div 
                    className={iconClass('video')} 
                    onClick={() => onChangeView('video')}
                >
                    <Video className="w-6 h-6" />
                    <span className="text-xs mt-1">Reels</span>
                </div>

                <div 
                    className={iconClass('user')} 
                    onClick={() => onChangeView('user')}
                >
                    <User className="w-6 h-6" />
                    <span className="text-xs mt-1">Profile</span>
                </div>

            </div>
        </div>
    );
};

export default Footer;