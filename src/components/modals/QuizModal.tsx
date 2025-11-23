// src/components/modals/QuizModal.tsx

import React, { useState } from 'react';
import { X, CheckCircle, Clock, Award } from 'lucide-react';
import { Reel, Quiz, MOCK_QUIZZES } from '../../data/mockData'; 

interface QuizModalProps {
    reel: Reel;
    onClose: () => void;
    onQuizComplete: (isCorrect: boolean, quizPassed: boolean) => void; // Added quizPassed parameter
}

const QuizModal: React.FC<QuizModalProps> = ({ reel, onClose, onQuizComplete }) => {
    const quiz: Quiz | undefined = MOCK_QUIZZES[reel.id];
    
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [result, setResult] = useState<'initial' | 'correct' | 'incorrect'>('initial');

    if (!quiz) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75" onClick={onClose}>
                <div className="bg-white p-6 rounded-xl shadow-2xl">
                    <p>No quiz available for this reel.</p>
                    <button onClick={onClose} className="mt-4 w-full py-2 bg-emerald-600 text-white rounded-lg">Close</button>
                </div>
            </div>
        );
    }

    const handleAnswer = (index: number) => {
        if (result !== 'initial') return; 
        
        setSelectedAnswer(index);
        const isCorrect = index === quiz.correctAnswerIndex;
        
        setTimeout(() => {
            setResult(isCorrect ? 'correct' : 'incorrect');
            // Since we only have 1 question, passing the quiz is equivalent to answering correctly.
            onQuizComplete(isCorrect, isCorrect); 
        }, 500);
    };

    const getButtonClass = (index: number) => {
        if (result === 'initial') {
            return "bg-gray-100 hover:bg-gray-200 text-gray-800"; 
        }
        
        if (index === quiz.correctAnswerIndex) {
            return "bg-green-100 border-green-500 text-green-800 font-bold shadow-md";
        }
        
        if (index === selectedAnswer) {
            return "bg-red-100 border-red-500 text-red-800 font-bold shadow-md";
        }
        
        return "bg-gray-100 opacity-60 cursor-not-allowed text-gray-500"; 
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-end justify-center" aria-modal="true">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>
            
            {/* Modal Container */}
            <div className="absolute inset-x-0 bottom-0 max-h-[85vh] w-full max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-300 ease-out transform translate-y-0">
                
                {/* Header */}
                <div className="p-4 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-emerald-600"/> Quick Quiz: {reel.subject}
                    </h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    <p className="text-lg font-bold text-gray-800">{quiz.question}</p>
                    
                    <div className="space-y-3">
                        {quiz.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={result !== 'initial'}
                                className={`
                                    w-full p-3 text-left rounded-xl border-2 transition-all duration-300
                                    ${getButtonClass(index)}
                                    text-gray-800 
                                    ${index === selectedAnswer && result === 'initial' ? 'border-emerald-400 ring-4 ring-emerald-200' : 'border-gray-200'} 
                                `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {result !== 'initial' && (
                        <div className={`p-4 rounded-xl text-center font-bold ${result === 'correct' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {result === 'correct' ? (
                                <span className="flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 mr-2"/> Course Quiz Passed!
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <X className="w-5 h-5 mr-2"/> Incorrect. Try again.
                                </span>
                            )}
                            <button onClick={onClose} className="mt-4 text-sm font-semibold underline">
                                Close and continue scrolling
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizModal;