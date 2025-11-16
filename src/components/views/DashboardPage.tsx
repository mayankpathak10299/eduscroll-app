// src/components/views/DashboardPage.tsx

import React, { useState, useMemo, useCallback, useEffect } from 'react'; // Added useEffect
import Header from '../common/Header';
import Footer from '../common/Footer'; 
import ReelFeed from '../feed/ReelFeed';
import CommentModal from '../modals/CommentModal';
import ProfileModal from '../modals/ProfileModal'; // Import the new modal
import { MOCK_REELS, Reel } from '../../data/mockData';

type View = 'home' | 'video' | 'user';

interface DashboardPageProps {
    onLogout: () => void; // Prop passed from App.tsx
    userEmail: string; // Prop passed from App.tsx
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, userEmail }) => {
    const [activeView, setActiveView] = useState<View>('video'); 
    const [showComments, setShowComments] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false); // New state for profile modal
    const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
    
    // Search and Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('');

    const changeView = useCallback((view: View) => {
        // If user clicks 'user', don't change the underlying view, just open the modal
        if (view === 'user') {
            setShowProfileModal(true);
            return;
        }
        setActiveView(view);
        setSearchTerm(''); 
        setFilterSubject('');
    }, []);

    // Effect to handle the 'user' view selection
    useEffect(() => {
        if (activeView === 'user' && !showProfileModal) {
            // If the modal closes and the view is still 'user', switch back to video (or last view)
            setActiveView('video'); 
        }
    }, [activeView, showProfileModal]);

    // 1. Get all unique subjects for the filter dropdown
    const uniqueSubjects = useMemo(() => {
        const subjects = MOCK_REELS.map(reel => reel.subject);
        return Array.from(new Set(subjects)).sort();
    }, []);

    // 2. Filter Logic (only applied to the 'video' view)
    const filteredReels = useMemo(() => {
        return MOCK_REELS.filter(reel => {
            const matchesSearch = 
                reel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reel.creator.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesSubject = filterSubject === '' || reel.subject === filterSubject;

            return matchesSearch && matchesSubject;
        });
    }, [searchTerm, filterSubject]);


    const handleOpenComments = (reelId: number) => {
        const reel = MOCK_REELS.find(r => r.id === reelId);
        if (reel) {
            setSelectedReel(reel);
            setShowComments(true);
        }
    };

    const handleCloseComments = () => {
        setShowComments(false);
        setSelectedReel(null);
    };

    // Conditional rendering of the main content area
    const renderContent = () => {
        switch (activeView) {
            case 'video':
                return <ReelFeed reels={filteredReels} onOpenComments={handleOpenComments} />;
            case 'home':
                return (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                        <p className="text-xl text-gray-400">Home View: All Courses (Coming Soon)</p>
                    </div>
                );
            case 'user':
                // Temporarily display the profile content until modal opens
                return (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                        <p className="text-xl text-gray-400">Loading Profile...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Header is only useful for the 'video' view where search/filter is present */}
            {activeView === 'video' && (
                <Header 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    filterSubject={filterSubject} 
                    onFilterChange={setFilterSubject}
                    subjects={uniqueSubjects}
                />
            )}
            
            {/* Main Content Area: Padding is needed if the Header is visible (video view) */}
            <div 
                className={`h-screen overflow-hidden ${activeView === 'video' ? 'pt-[72px]' : 'pt-0'} pb-16`} 
            > 
                {renderContent()}
            </div>

            {/* Conditionally render the comment modal */}
            {showComments && selectedReel && (
                <CommentModal reel={selectedReel} onClose={handleCloseComments} />
            )}
            
            {/* New Profile Modal */}
            {showProfileModal && (
                <ProfileModal 
                    onClose={() => setShowProfileModal(false)}
                    onLogout={onLogout}
                    userEmail={userEmail}
                />
            )}

            {/* Footer Navigation */}
            <Footer activeView={activeView} onChangeView={changeView} />
        </>
    );
};

export default DashboardPage;