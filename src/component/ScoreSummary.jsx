import React from 'react'

const ScoreSummary = ({ score, total }) => {
    return (
        <h3 className='text-lg font-bold text-white mt-5 text-center tracking-wide'>Your Score: {score} / {total}</h3>
    )
}

export default ScoreSummary
