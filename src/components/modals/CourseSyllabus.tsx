// src/components/modals/CourseSyllabus.tsx

import React from 'react';
import { X, BookOpen, PlayCircle, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { Reel, MOCK_SYLLABUS, SyllabusItem } from '../../data/mockData'; 

interface CourseSyllabusProps {
    course: Reel;
    onClose?: () => void;
    onStartReel: (reelId: number) => void;
    isModal?: boolean;
    onGoBack?: () => void; // NEW: Handler to go back to the main course selection
}

const SyllabusContent: React.FC<CourseSyllabusProps> = ({ course, onClose, onStartReel, isModal = true, onGoBack }) => {
    const syllabus: SyllabusItem[] | undefined = MOCK_SYLLABUS[course.id];
    const totalReels = syllabus ? syllabus.length : 0;
    const completedReels = syllabus ? syllabus.filter(item => item.completed).length : 0;
    const progress = totalReels > 0 ? (completedReels / totalReels) * 100 : 0;

    if (!syllabus) return null;

    // Base styling for the container, adjusted for desktop view
    const containerClasses = isModal 
        ? "absolute inset-x-0 bottom-0 max-h-[90vh] w-full max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-300 ease-out transform translate-y-0"
        : "w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl flex flex-col h-full md:h-[80vh] overflow-hidden";
    
    // Header styling adjustment
    const headerClasses = isModal ? "rounded-t-3xl" : "rounded-t-xl";

    return (
        <div className={containerClasses}>
            
            {/* Header */}
            <div className={`p-4 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white ${headerClasses}`}>
                {/* Title and Back Button Group */}
                <div className="flex items-center">
                    {/* NEW: Back button visible only in desktop (non-modal) view */}
                    {!isModal && onGoBack && (
                        <button 
                            onClick={onGoBack} 
                            className="p-2 mr-3 text-gray-500 hover:text-gray-700 transition rounded-full hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <BookOpen className="w-6 h-6 mr-2 text-emerald-600"/> {course.title}
                    </h3>
                </div>

                {/* Close Button (only for modal view) */}
                {isModal && onClose && (
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition">
                        <X className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Progress Bar & Summary */}
            <div className="p-4 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">
                    Your Progress: {completedReels}/{totalReels} reels completed
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Syllabus List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {syllabus.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition duration-150 ${
                            item.completed 
                                ? 'bg-green-50 border-green-200 opacity-70' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 cursor-pointer'
                        }`}
                        onClick={() => onStartReel(item.reelId)} // Open reel section
                    >
                        <div className="flex items-center space-x-3">
                            {item.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            ) : (
                                <PlayCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            )}
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{index + 1}. {item.title}</p>
                                <p className="text-xs text-gray-500 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {item.duration}
                                </p>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-gray-600">{item.completed ? 'DONE' : 'START'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Export Component Wrapper
const CourseSyllabus: React.FC<CourseSyllabusProps> = (props) => {
    if (props.isModal) {
        // Modal Wrapper (for Mobile/Small screens)
        return (
            <div className="fixed inset-0 z-50 overflow-hidden flex items-end justify-center" aria-modal="true">
                <div className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={props.onClose}></div>
                <SyllabusContent {...props} />
            </div>
        );
    } else {
        // Full View Wrapper (for Desktop)
        return <SyllabusContent {...props} />;
    }
}

export default CourseSyllabus;