// src/components/views/DashboardPage.tsx

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer'; 
import ReelFeed from '../feed/ReelFeed';
import CommentModal from '../modals/CommentModal';
import ProfileModal from '../modals/ProfileModal'; 
import QuizModal from '../modals/QuizModal';
import CourseCard from '../common/CourseCard';
import CourseSyllabus from '../modals/CourseSyllabus'; 
import { MOCK_SYLLABUS, MOCK_REELS, Reel, MOCK_QUIZZES } from '../../data/mockData'; 

type View = 'home' | 'video' | 'user' | 'syllabus';

interface DashboardPageProps {
    onLogout: () => void; 
    userEmail: string; 
}

// Helper: Generates a mock Reel array containing only the selected reel ID
const generateCourseReelData = (startReelId: number): Reel[] => {
    let parentCourseId: number | undefined;
    for (const [key, syllabusItems] of Object.entries(MOCK_SYLLABUS)) {
        if (syllabusItems.some(item => item.reelId === startReelId)) {
            parentCourseId = parseInt(key);
            break;
        }
    }
    
    if (!parentCourseId) return [];
    
    const parentCourseReels = MOCK_SYLLABUS[parentCourseId] || [];
    
    const mockReels = parentCourseReels.map(item => ({
        id: item.reelId,
        title: item.title,
        creator: MOCK_REELS.find(r => r.id === parentCourseId)?.creator || 'Unknown',
        subject: MOCK_REELS.find(r => r.id === parentCourseId)?.subject || 'Tech',
        likes: 0,
        saved: 0,
        videoUrl: `https://placehold.co/1080x1920/2B98AB/ffffff?text=Reel%20${item.reelId}`,
        description: `Part of ${MOCK_REELS.find(r => r.id === parentCourseId)?.title} course.`,
    }));

    const startIndex = mockReels.findIndex(r => r.id === startReelId);
    if (startIndex > -1) {
        const sortedReels = [
            ...mockReels.slice(startIndex),
            ...mockReels.slice(0, startIndex)
        ];
        return sortedReels;
    }

    return mockReels;
};

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, userEmail }) => {
    const [activeView, setActiveView] = useState<View>('home'); 
    
    const [selectedReel, setSelectedReel] = useState<Reel | null>(null); 
    const [showComments, setShowComments] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    
    // Course and Syllabus State
    const [selectedCourse, setSelectedCourse] = useState<Reel | null>(null);
    const [customReels, setCustomReels] = useState<Reel[]>(MOCK_REELS); 

    // Quiz State
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [quizReel, setQuizReel] = useState<Reel | null>(null);

    // NEW STATE: Course Completion Status (Using Course ID as key)
    const [courseCompletion, setCourseCompletion] = useState<{ [key: number]: boolean }>({
        5: false, // OOPs course
        8: false, // Prerequisites course
        9: false, // Git course
    });

    // Search and Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('');
    
    // Get the primary courses based on their order in MOCK_REELS
    const oopCourse = MOCK_REELS[0]; // ID 5
    const prereqCourse = MOCK_REELS[1]; // ID 8
    const gitCourse = MOCK_REELS[2]; // ID 9
    
    // LOCKING LOGIC
    const isPrereqLocked = !courseCompletion[oopCourse.id]; 
    const isGitLocked = !courseCompletion[prereqCourse.id]; 


    const changeView = useCallback((view: View) => {
        if (view === 'user') {
            setShowProfileModal(true);
            return;
        }
        
        if (view === 'home') {
             if (selectedCourse) {
                 setActiveView('syllabus'); 
                 return; 
             } else {
                 setCustomReels(MOCK_REELS);
                 setActiveView('home');
                 setSearchTerm(''); 
                 setFilterSubject('');
                 return;
             }
        }
        
        if (view === 'video') {
            setCustomReels(MOCK_REELS);
        }

        setActiveView(view);
        setSearchTerm(''); 
        setFilterSubject('');
        setSelectedCourse(null); 
    }, [selectedCourse]);

    const goBackToHome = useCallback(() => {
        setActiveView('home');
        setSelectedCourse(null); 
    }, []);

    const viewSyllabus = useCallback((course: Reel) => {
        setSelectedCourse(course);
        
        if (typeof window !== 'undefined' && window.innerWidth >= 768) { 
             setActiveView('syllabus'); 
        }
    }, []);

    const startCourseReel = useCallback((startReelId: number) => {
        const courseReels = generateCourseReelData(startReelId);
        
        setCustomReels(courseReels);
        setActiveView('video');
    }, []);


    useEffect(() => {
        if (activeView === 'user' && !showProfileModal) {
            setActiveView('home'); 
        }
    }, [activeView, showProfileModal]);

    // --- Quiz Logic ---
    const handleVideoEnd = useCallback((reelId: number) => {
        const reel = customReels.find(r => r.id === reelId);
        
        if (reel && MOCK_QUIZZES[reelId]) { 
            setQuizReel(reel);
            setShowQuizModal(true);
        }
    }, [customReels]);

    const handleQuizComplete = useCallback((isCorrect: boolean, quizPassed: boolean) => {
        if (quizPassed && quizReel) {
            let parentCourseId: number | undefined;
            for (const [key, syllabusItems] of Object.entries(MOCK_SYLLABUS)) {
                if (syllabusItems.some(item => item.reelId === quizReel.id)) {
                    parentCourseId = parseInt(key);
                    break;
                }
            }
            
            if (parentCourseId) {
                 setCourseCompletion(prev => ({
                     ...prev,
                     [parentCourseId]: true, // Mark the parent course as complete
                 }));
            }
        }
        setShowQuizModal(false);
    }, [quizReel]);
    // ------------------


    // 1. Get all unique subjects for the filter dropdown
    const uniqueSubjects = useMemo(() => {
        const subjects = MOCK_REELS.map(reel => reel.subject);
        return Array.from(new Set(subjects)).sort();
    }, []);

    // 2. Filter Logic (Applies to the currently active reel list: customReels)
    const filteredReels = useMemo(() => {
        return customReels.filter(reel => {
            const matchesSearch = 
                reel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reel.creator.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesSubject = filterSubject === '' || reel.subject === filterSubject;

            return matchesSearch && matchesSubject;
        });
    }, [searchTerm, filterSubject, customReels]);


    const handleOpenComments = (reelId: number) => {
        const reel = customReels.find(r => r.id === reelId);
        if (reel) {
            setSelectedReel(reel); 
            setShowComments(true);
        }
    };

    const handleCloseComments = () => {
        setShowComments(false);
        setSelectedReel(null); 
    };

    const renderContent = () => {
        const lockedCourse = isPrereqLocked ? oopCourse : (isGitLocked ? prereqCourse : null);
        
        switch (activeView) {
            case 'video':
                return (
                    <div 
                        // The height calculation must remain here to define the scrollable area
                        className="w-full"
                        style={{ height: 'calc(100vh - 72px - 64px)' }} 
                    >
                         <ReelFeed 
                             reels={filteredReels} 
                             onOpenComments={handleOpenComments} 
                             onVideoEnd={handleVideoEnd} 
                         />
                    </div>
                );
            
            case 'home':
                return (
                    <div 
                        // FIX 2: Changed overflow-x-hidden to overflow-y-auto (Keep scrolling here!)
                        className="w-full px-4 overflow-x-hidden overflow-y-auto bg-gray-900 text-white"
                        style={{ height: 'calc(100vh - 64px)' }} 
                    >
                        <div className="flex flex-col items-center justify-start pt-8">
                            <h1 className="text-3xl font-extrabold text-emerald-400 mb-8">Featured Learning Paths</h1>
                            
                            <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center">
                                {oopCourse && (
                                    <CourseCard 
                                        course={oopCourse}
                                        onViewSyllabus={viewSyllabus} 
                                        isLocked={false} 
                                    />
                                )}
                                {prereqCourse && (
                                    <CourseCard 
                                        course={prereqCourse}
                                        onViewSyllabus={viewSyllabus} 
                                        isLocked={isPrereqLocked} 
                                    />
                                )}
                                {gitCourse && (
                                    <CourseCard 
                                        course={gitCourse}
                                        onViewSyllabus={viewSyllabus} 
                                        isLocked={isGitLocked} 
                                    />
                                )}
                            </div>
                            
                            {lockedCourse && (
                                <p className="text-sm text-red-400 mt-4 font-medium">
                                    Finish the **{lockedCourse.title}** course quiz to unlock the next course!
                                </p>
                            )}
                            
                            <p className="text-gray-500 mt-8 text-center text-sm">
                                Click 'View Course Syllabus' to see the full list of 10 reels.
                            </p>
                        </div>
                    </div>
                );
            
            case 'syllabus':
                return (
                    <div 
                         className="w-full h-full flex items-center justify-center bg-gray-900 p-8"
                         style={{ height: 'calc(100vh - 64px)' }} 
                    >
                        {selectedCourse && (
                            <CourseSyllabus
                                course={selectedCourse}
                                onStartReel={startCourseReel} 
                                onGoBack={goBackToHome} 
                                isModal={false} 
                            />
                        )}
                    </div>
                );

            case 'user':
                return (
                    <div 
                        className="w-full h-full flex items-center justify-center bg-gray-900 text-white"
                        style={{ height: 'calc(100vh - 64px)' }} 
                    >
                        <p className="text-xl text-gray-400">Loading Profile...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Header is fixed */}
            {activeView === 'video' && (
                <Header 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    filterSubject={filterSubject} 
                    onFilterChange={setFilterSubject}
                    subjects={uniqueSubjects}
                />
            )}
            
            <div 
                // FIX 3: Removed h-screen and overflow-hidden from outer wrapper
                className="w-full"
            > 
                {renderContent()}
            </div>

            {/* Modals and Overlays */}
            {/* ... (Modals remain unchanged) ... */}

            <Footer activeView={activeView} onChangeView={changeView} />
        </>
    );
};

export default DashboardPage;