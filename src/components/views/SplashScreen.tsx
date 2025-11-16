import React, { useEffect } from 'react';
import { Video } from 'lucide-react';
import { useSplashTransition } from '../../hooks/useSplashTransition';

const SplashScreen: React.FC<{ onTransitionEnd: (page: string) => void }> = ({ onTransitionEnd }) => {
    const { showSplash, animationComplete } = useSplashTransition(3500);

    useEffect(() => {
        if (!showSplash) {
            onTransitionEnd('login');
        }
    }, [showSplash, onTransitionEnd]);

    if (!showSplash) return null;

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50 transition-opacity duration-1000 ease-in-out">
            <div className={`
                flex flex-col items-center space-y-4
                ${animationComplete ? 'opacity-0 scale-110 duration-500' : 'opacity-100 scale-100 duration-1000'}
                transition-all ease-in-out
            `}>
                <Video className="w-16 h-16 text-emerald-400 animate-pulse" />
                <h1 className="text-6xl font-extrabold text-white tracking-tighter">
                    <span className="text-emerald-400">Edu</span>Scroll
                </h1>
                <p className="text-gray-400 text-lg font-light">Learning, byte-sized.</p>
            </div>
            
            {/* Dynamic CSS for the text reveal animation */}
            <style global jsx>{`
                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: white }
                }
                .text-reveal {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    animation: 
                        typing 1.5s steps(8, end), 
                        blink-caret .75s step-end infinite;
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;