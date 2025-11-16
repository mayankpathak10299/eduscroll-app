// src/components/modals/ProfileModal.tsx

import React from 'react';
import { User, BookOpen, LogOut, X, Edit2 } from 'lucide-react';
import { Reel } from '../../data/mockData';

interface ProfileModalProps {
    onClose: () => void;
    onLogout: () => void; // Function to switch back to the login page
    userEmail: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, onLogout, userEmail }) => {
    
    const menuItems = [
        { icon: <Edit2 className="w-5 h-5 text-emerald-500" />, label: "Profile Edit", action: () => alert("Feature: Open Profile Edit Form") },
        { icon: <BookOpen className="w-5 h-5 text-emerald-500" />, label: "My Courses", action: () => alert("Feature: Navigate to My Courses") },
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="profile-modal-title" role="dialog" aria-modal="true">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>
            
            {/* Modal Container (Slide-up effect) */}
            <div className="absolute inset-x-0 bottom-0 max-h-[90vh] w-full max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-300 ease-out transform translate-y-0">
                
                {/* Header */}
                <div className="p-4 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <User className="w-6 h-6 mr-2 text-emerald-600"/> User Profile
                    </h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Profile Info */}
                <div className="p-6 text-center border-b border-gray-100">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-emerald-600 mb-3">
                        {userEmail.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-lg font-semibold text-gray-900">Demo User</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                </div>

                {/* Menu List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => { item.action(); onClose(); }}
                            className="flex items-center w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 text-gray-700 font-medium"
                        >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </button>
                    ))}
                    
                    {/* Logout Button */}
                    <button
                        onClick={onLogout}
                        className="flex items-center w-full p-4 bg-red-50 rounded-lg hover:bg-red-100 transition duration-150 text-red-600 font-medium mt-4"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="ml-3">Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;