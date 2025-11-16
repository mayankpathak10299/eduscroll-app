import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Reel, Comment, MockCommentsType } from '../../data/mockData';

// Mock Comment Data - kept here for local state initialization
export const MOCK_COMMENTS: MockCommentsType = {
    1: [ 
        { id: 101, user: "ScienceFan99", text: "This explained wave-particle duality better than my professor!", time: "2h ago" },
    ],
    2: [ 
        { id: 201, user: "ArtLover", text: "Beautifully demonstrated. I never saw the connection in the Mona Lisa before.", time: "4h ago" },
    ],
    3: [ 
        { id: 301, user: "CodeNewbie", text: "Super useful, thanks!", time: "1 day ago" },
        { id: 302, user: "ProDev", text: "Nice summary. Remember to avoid over-complicating comprehensions!", time: "30m ago" },
    ],
    4: [], 
};


const CommentModal: React.FC<{ reel: Reel, onClose: () => void }> = ({ reel, onClose }) => {
    const [newComment, setNewComment] = useState('');
    // Use a deep copy or state initialization based on the MOCK_COMMENTS for the current reel
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS[reel.id as keyof typeof MOCK_COMMENTS] ? [...MOCK_COMMENTS[reel.id as keyof typeof MOCK_COMMENTS]] : []);

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            const newCommentObj: Comment = {
                id: Date.now(),
                user: "You (Demo User)",
                text: newComment.trim(),
                time: "Just now",
            };
            setComments(prev => [newCommentObj, ...prev]);
            setNewComment('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>
            
            {/* Modal Container (Slide-up effect) */}
            <div className="absolute inset-x-0 bottom-0 max-h-[85vh] w-full max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-300 ease-out transform translate-y-0">
                
                {/* Header */}
                <div className="p-4 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Comments ({comments.length})
                    </h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Comment List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Be the first to comment on **{reel.title}**!
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600 flex-shrink-0">
                                    {comment.user.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-sm font-semibold text-gray-900">{comment.user}</span>
                                        <span className="text-xs text-gray-400">{comment.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-0.5 break-words">{comment.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Comment Input Footer */}
                <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white">
                    <form onSubmit={handlePostComment} className="flex space-x-3">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                            maxLength={150}
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-full transition duration-150 ease-in-out hover:bg-emerald-700 disabled:opacity-50"
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;