import React, { useRef } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Result = () => {
    const { score, totalQuestions, resetQuiz } = useQuizContext();
    const navigate = useNavigate();

    // Create refs for animation targets
    const containerRef = useRef(null);
    const messageRef = useRef(null);
    const statsRef = useRef(null);
    const buttonsRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(containerRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        })
            .from(messageRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out"
            }, "-=0.3")
            .from(statsRef.current.children, {
                y: 20,
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }, "-=0.3")
            .to(buttonsRef.current.children, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.15,
                ease: "back.out(1.7)"
            });
    }, []);

    const handleRetry = () => {
        resetQuiz();
        navigate('/quiz', { replace: true });
    };

    const percentage = (score / totalQuestions) * 100;
    let message = '';
    let emoji = '';

    if (percentage >= 80) {
        message = 'Outstanding! You\'re a Quiz Master! 🏆';
    } else if (percentage >= 60) {
        message = 'Great job! Keep practicing! 🏆';
    } else if (percentage >= 40) {
        message = 'Good effort! You can do better! 💪';
    } else {
        message = 'Keep learning! Every attempt makes you better! 📖';
    }

    return (
        <div className='w-full h-screen flex items-center justify-center gradient_bg bg-gray-900'>
            <div ref={containerRef} className='max-w-[600px] w-[95%] bg-gray-500/20 rounded-md p-6'>
                {/* Result Message */}
                <div ref={messageRef} className="mb-8 w-full">
                    <h2 className="text-2xl mt-8 font-bold text-center text-green-500 mb-4">{message}</h2>
                    <p className="text-md text-gray-300 text-center font-semibold">
                        You got {score} out of {totalQuestions} questions correct
                    </p>
                </div>

                {/* Additional Stats */}
                <div ref={statsRef} className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Accuracy</p>
                        <p className="text-2xl font-bold text-white">{percentage}%</p>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Questions</p>
                        <p className="text-2xl font-bold text-white">{score}/{totalQuestions}</p>
                    </div> 
                </div>
                {/* Action Buttons */}
                <div ref={buttonsRef} className="w-full mt-8 flex items-center justify-center space-x-5">
                    <button
                        onClick={handleRetry}
                        className="w-full md:w-auto px-8 py-3 cursor-pointer btn-grad active:scale-95 text-white font-bold rounded-lg transition-all duration-300 text-md max-[450px]:text-sm opacity-0">
                        Restart
                    </button>
                    <button
                        onClick={() => navigate('/', { replace: true })}
                        className="w-full md:w-auto px-8 py-3 cursor-pointer active:scale-95 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-300 text-md max-[450px]:text-sm opacity-0">
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;
