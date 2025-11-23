// src/components/common/CourseCard.tsx

import React from 'react';
import { PlayCircle, Users, Heart, Video, Lock } from 'lucide-react'; // Import Lock icon
import { Reel } from '../../data/mockData';

interface CourseCardProps {
    course: Reel;
    onViewSyllabus: (course: Reel) => void;
    isLocked: boolean; // NEW: Prop to indicate lock status
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onViewSyllabus, isLocked }) => {
    
    const handleClick = () => {
        if (!isLocked) {
            onViewSyllabus(course);
        }
    };

    return (
        <div 
            className={`w-full max-w-sm mx-auto rounded-xl shadow-2xl overflow-hidden transition duration-300 border 
            ${isLocked 
                ? 'bg-gray-700 border-gray-600 opacity-60 cursor-not-allowed' 
                : 'bg-gray-800 border-emerald-600/50 transform hover:scale-[1.01] cursor-pointer'
            }`}
            onClick={handleClick}
        >
            <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                    {isLocked ? (
                        <Lock className="w-8 h-8 text-gray-400" />
                    ) : (
                        <PlayCircle className="w-8 h-8 text-emerald-400" />
                    )}
                    <h2 className="text-2xl font-extrabold text-white">{course.title}</h2>
                </div>
                
                <p className="text-gray-400 mb-6">{course.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-400 mb-6 border-t border-b border-gray-700 py-3">
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-emerald-500" />
                        <span>Creator: **{course.creator}**</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>{course.likes} Likes</span>
                    </div>
                </div>

                <button
                    disabled={isLocked}
                    className={`w-full py-3 font-bold rounded-lg shadow-lg transition duration-150 flex items-center justify-center space-x-2 
                        ${isLocked 
                            ? 'bg-gray-600 text-gray-400' 
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                >
                    {isLocked ? (
                        <>
                            <Lock className="w-5 h-5" />
                            <span>Course Locked</span>
                        </>
                    ) : (
                        <>
                            <Video className="w-5 h-5" />
                            <span>View Course Syllabus</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;