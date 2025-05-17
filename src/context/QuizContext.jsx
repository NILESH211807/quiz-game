import React, { createContext, useContext } from 'react';
import useQuiz from '../hooks/useQuiz';

// create context
export const QuizContext = createContext();

// create provider
export const QuizProvider = ({ children }) => {
    const quiz = useQuiz();

    return (
        <QuizContext.Provider value={quiz}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    return useContext(QuizContext);
};
