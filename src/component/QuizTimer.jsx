import React from 'react';
import { useEffect, useRef, useState } from 'react';

const QuizTimer = ({ selectOption,
    options,
    setCurrent,
    totalQuestions,
    setShowResult }) => {

    const [timeLeft, setTimeLeft] = useState(60);
    const timerRef = useRef();

    // timer countdown
    useEffect(() => {
        if (timeLeft === 0) {
            setShowResult(true);
        }
        timerRef.current = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);
        return () => clearTimeout(timerRef.current);
    }, [timeLeft, selectOption, options]);

    return (
        <div ref={timerRef} className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`}>
            {timeLeft}s
        </div>
    )
}

export default QuizTimer
