import React, { useEffect, useRef } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import QuizQuestion from '../component/QuizQuestion';
import QuizOptions from '../component/QuizOptions';
import QuizTimer from '../component/QuizTimer';
import ScoreSummary from '../component/ScoreSummary';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Quiz = () => {
    const { currentQuestion, question, options, selectOption, selectedOption,
        showResult, totalQuestions, currectAnswer, disabled, setCurrent, setShowResult, score } = useQuizContext();
    const navigate = useNavigate();

    // Create refs for animation targets
    const containerRef = useRef(null);
    const progressBarRef = useRef(null);
    const questionRef = useRef(null);
    const optionsRef = useRef(null);
    const scoreRef = useRef(null);

    // Initial page load animation
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(containerRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        })
            .from(progressBarRef.current, {
                scaleX: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.3")
            .from(questionRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out"
            }, "-=0.4")
            .from(optionsRef.current.children, {
                y: 30,
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                stagger: 0.15,
                ease: "back.out(1.7)"
            }, "-=0.3")
            .from(scoreRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.3");
    }, []);

    // Animation for question change
    useEffect(() => {
        if (currentQuestion > 0) {
            // Fade out current question and options
            gsap.to([questionRef.current, optionsRef.current.children], {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                stagger: 0.1
            });

            // Fade in new question and options
            setTimeout(() => {
                gsap.fromTo(questionRef.current,
                    {
                        y: 40,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power3.out"
                    }
                );

                gsap.fromTo(optionsRef.current.children,
                    {
                        y: 30,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.15,
                        ease: "back.out(1.7)"
                    }
                );
            }, 300);
        }
    }, [currentQuestion]);

    // navigate to result page
    useEffect(() => {
        if (showResult) {
            navigate('/result', { replace: true });
        }
    }, [showResult, navigate]);

    return (
        <div className='w-full h-screen flex items-center justify-center gradient_bg bg-gray-900'>
            <div ref={containerRef} className='max-w-[600px] w-[95%] bg-gray-500/20 rounded-md p-6'>
                <div ref={progressBarRef} className="w-full bg-gray-700 rounded-full h-2 mb-8">
                    <div
                        className="bg-blue-800 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <div className="text-gray-100 font-semibold">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </div>
                    {/* timer */}
                    <QuizTimer selectOption={selectOption} options={options} setCurrent={setCurrent} totalQuestions={totalQuestions} setShowResult={setShowResult} />
                </div>
                <div ref={questionRef}>
                    <QuizQuestion question={question} />
                </div>
                <div ref={optionsRef}>
                    <QuizOptions
                        currectAnswer={currectAnswer}
                        options={options}
                        onSelect={selectOption}
                        selectedOption={selectedOption}
                        disabled={disabled}
                    />
                </div>
                <div ref={scoreRef}>
                    <ScoreSummary score={score} total={totalQuestions} />
                </div>
            </div>
        </div>
    );
}

export default Quiz
