import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../context/QuizContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const navigate = useNavigate();
    const { resetQuiz } = useQuizContext();

    // Create refs for animation targets
    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonRef = useRef(null);
    const infoRef = useRef(null);
    const cardsRef = useRef(null);
    const featuresRef = useRef(null);
    const testimonialsRef = useRef(null);

    useGSAP(() => {
        // Initial animations
        const tl = gsap.timeline();

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(descriptionRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.5")
            .fromTo(buttonRef.current,
                {
                    scale: 0.8,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.3")
            .from(infoRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.3");

        // Scroll-triggered animations
        gsap.from(cardsRef.current.children, {
            scrollTrigger: {
                trigger: cardsRef.current,
                start: "top center+=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out"
        });

        gsap.from(featuresRef.current.children, {
            scrollTrigger: {
                trigger: featuresRef.current,
                start: "top center+=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out"
        });

        gsap.from(testimonialsRef.current.children, {
            scrollTrigger: {
                trigger: testimonialsRef.current,
                start: "top center+=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out"
        });
    }, []);

    const handleStartQuiz = () => {
        resetQuiz();
        navigate('/quiz', { replace: true });
    }

    const info = [
        {
            id: 1,
            title: 'Answer 5 questions',
            description: 'Answer 5 questions to get started',
        },
        {
            id: 2,
            title: 'Get matched with the best solutions',
            description: 'Get matched with the best solutions',
        },
        {
            id: 3,
            title: 'Get instant feedback and see your score',
            description: 'Get instant feedback and see your score',
        },
    ];

    const cards = [
        {
            id: 1,
            title: 'Personalized Quizzes',
            description: 'Quizzes adapt to your skill level and interests for a unique experience every time.',
        },
        {
            id: 2,
            title: 'Timed Challenges',
            description: 'Race against the clock and improve your speed and accuracy with timed quizzes.',
        },
        {
            id: 3,
            title: 'Progress Tracking',
            description: 'Monitor your improvement over time with detailed analytics and reports.',
        },
    ];


    const features = [
        {
            id: 1,
            icon: '🎯',
            title: 'Personalized Quizzes',
            description: 'Quizzes adapt to your skill level and interests for a unique experience every time.',
        },
        {
            id: 2,
            icon: '⏱️',
            title: 'Timed Challenges',
            description: 'Race against the clock and improve your speed and accuracy with timed quizzes.',
        },
        {
            id: 3,
            icon: '📊',
            title: 'Progress Tracking',
            description: 'Monitor your improvement over time with detailed analytics and reports.',
        },
    ];


    const testimonials = [
        {
            id: 1,
            name: 'Priya S.',
            text: 'Quiz Master made learning fun and engaging. I love the instant feedback!',
        },
        {
            id: 2,
            name: 'Rahul K.',
            text: 'The personalized quizzes really helped me focus on my weak areas.',
        },
        {
            id: 3,
            name: 'Anjali M.',
            text: 'Great platform for quick revision before exams. Highly recommended!',
        },
    ];



    return (
        <div className='gradient_bg w-full min-h-screen bg-gray-800' ref={mainRef}>
            <div className='w-full min-h-screen flex items-center justify-center p-5'>
                <div className='w-full flex items-center justify-center flex-col mt-20'>
                    <h1 ref={titleRef} className='text-4xl text-center max-sm:text-3xl font-bold text-white mb-3'>Welcome to Quiz Master</h1>
                    <p ref={descriptionRef} className='min-md:w-3xl max-md:w-[90%] max-sm:w-full text-sm font-medium text-center my-3 text-gray-300'>
                        Test your knowledge and challenge yourself! These questions are designed to push your thinking, reinforce what you've learned, and help you grow with every answer.
                    </p>
                    <button ref={buttonRef} className='button my-14 font-bold w-72 mb-22' onClick={handleStartQuiz}>Start Quiz</button>

                    <div ref={infoRef} className="w-full flex flex-col md:flex-row items-center justify-center gap-6 px-4">
                        {info.map((item) => (
                            <div
                                key={item.id}
                                className="w-full md:w-[340px] h-34 rounded-md p-4 flex items-center justify-center flex-col bg-gray-900/30 border-b border-gray-400"
                            >
                                <h1 className="text-2xl font1 w-12 h-12 flex items-center justify-center font-bold text-white bg-gray-900/30 rounded-full mt-3">
                                    {item.id}
                                </h1>
                                <p className="text-center text-md text-gray-100 font-semibold my-4">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* cards */}
            <div ref={cardsRef} className='w-full bg-gray-900/20 py-16 md:py-32'>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 max-w-7xl mx-auto'>
                    {cards.map((cards) => (
                        <div
                            key={cards.id}
                            className="bg-gray-900/30 hover:bg-gray-900/50 rounded-md p-6 h-auto flex items-center justify-center flex-col border-b-2 border-gray-400 transition-all duration-300 hover:scale-105"
                        >
                            <h1 className="text-xl md:text-2xl text-center font-bold text-white tracking-wide">
                                {cards.title}
                            </h1>
                            <p className="text-center text-sm font2 text-gray-300 font-semibold my-4">
                                {cards.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* features */}
            <div ref={featuresRef} className='w-full pt-22'>
                <h2 className='text-3xl font-bold text-white text-center mb-20'>Features</h2>
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 px-4">
                    <div className='grid min-lg:grid-cols-3 max-xl:grid-cols-2 justify-center xl:gap-8 gap-5 max-md:grid-cols-1'>
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="bg-gray-900/60 rounded-md p-6 xl:w-96 flex flex-col items-center"
                            >
                                <span className='text-4xl mb-3'>{feature.icon}</span>
                                <h3 className='text-xl font-semibold text-white mb-2'>{feature.title}</h3>
                                <p className='text-gray-300 text-center'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section  */}
            <div ref={testimonialsRef} className='w-full py-16'>
                <h2 className='text-3xl font-bold text-white text-center mb-20'>What Our Users Say</h2>
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 px-4">
                    <div className='grid min-lg:grid-cols-3 max-xl:grid-cols-2 justify-center xl:gap-8 gap-5 max-md:grid-cols-1'>
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-gray-900/60 rounded-md p-6 xl:w-96 flex flex-col border-b border-gray-300">
                                <p className='text-gray-200 italic mb-3'>{testimonial.text}</p>
                                <span className='text-gray-400 font-semibold'>— {testimonial.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home