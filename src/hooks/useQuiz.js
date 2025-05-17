import { useCallback, useEffect, useState } from 'react';
import { questions } from '../data/questions';

const useQuiz = () => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const handleAnswer = useCallback((option) => {
        setSelectedOption(option); // Set the selected option
        setDisabled(true); // Disable the options after selection
        setTimeout(() => {
            if (option === questions[current].answer) setScore(prev => prev + 1);
            if (current + 1 < questions.length) setCurrent(prev => prev + 1);
            else setShowResult(true);

        }, 500);
    }, [current, questions]);

    useEffect(() => {
        if (!showResult) {
            setSelectedOption(null);
            setDisabled(false);
        }
    }, [current, showResult]);

    const resetQuiz = () => {
        setCurrent(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setDisabled(false);
    };


    return {
        currentQuestion: current,
        question: questions[current]?.question,
        options: questions[current]?.options,
        score,
        totalQuestions: questions.length,
        showResult,
        currectAnswer: questions[current]?.answer,
        selectedOption, 
        selectOption: handleAnswer,
        disabled, 
        setCurrent,
        setShowResult,
        resetQuiz
    };
}

export default useQuiz;