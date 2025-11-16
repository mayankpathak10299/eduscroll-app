// src/components/common/Header.tsx

import React from 'react';
import { Search, ChevronDown, User } from 'lucide-react'; 

interface HeaderProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    filterSubject: string;
    onFilterChange: (subject: string) => void;
    subjects: string[];
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, filterSubject, onFilterChange, subjects }) => {

    return (
        <div className="fixed top-0 left-0 right-0 z-40 p-4 bg-black/80 backdrop-blur-sm text-white border-b border-gray-700/50">
            <div className="flex items-center justify-between space-x-4">
                <span className="text-xl font-extrabold text-emerald-400 flex-shrink-0">EduScroll</span>
                
                {/* Search Input */}
                <div className="relative flex-grow max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search title or creator..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full py-2 pl-10 pr-3 bg-gray-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                </div>

                {/* Subject Filter */}
                <div className="relative">
                    <select
                        value={filterSubject}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="appearance-none py-2 px-4 pr-8 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm cursor-pointer"
                    >
                        <option value="">All Subjects</option>
                        {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                {/* User Icon (Placeholder for the profile button) */}
                <User className="w-6 h-6 text-white flex-shrink-0"/>
            </div>
        </div>
    );
}

export default Header;