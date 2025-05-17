import React from 'react'

const QuizOptions = ({ options, onSelect, selectedOption, currectAnswer, disabled }) => {

    return (
        <ul className="grid gap-5 min-[600px]:grid-cols-2 grid-cols-1">
            {options?.map((opt, idx) => (
                <li key={idx}
                    onClick={() => disabled ? "" : onSelect(opt)}
                    className={`p-4 min-[600px]:rounded-full border-2 border-transparent rounded-md relative font-bold text-center text-white tracking-wide transition-all duration-300 ${selectedOption === opt
                        ? opt === currectAnswer
                            ? 'bg-green-500/70 border-green-500'
                            : 'bg-red-500/70 border-red-500'
                        : `bg-gray-900/50 ${disabled ? 'cursor-not-allowed' : 'hover:bg-gray-900/80 cursor-pointer'}`
                        }`}>
                    <span className='absolute w-10 h-10 top-0 left-2 transform translate-y-2 rounded-full  items-center justify-center bg-gray-700/30 text-xl font-semibold invisible  min-[600px]:flex min-[600px]:visible'>
                        {idx + 1}
                    </span>
                    {opt}
                </li>
            ))}
        </ul>
    )
}

export default QuizOptions;
