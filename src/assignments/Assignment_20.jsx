import { startTransition, useEffect, useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";



// Quizing page
function QuizPage({ setQuizing }) {
    const [error, setError] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [end, setEnd] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [review, setReview] = useState(false);
    
    // fetching the API 
    useEffect(() => {
        const fetchData = async () => {
            setQuizing(true);
            try {
                const response = await axios.get(`https://apis.dnjs.lk/objects/quiz.php`);
                setQuiz(response.data);
            } catch (error) {
                setError(`failed to fetch data`);
                console.error(error);
            }

        }
        fetchData();
    }, [])

    const answerButton = (selectedAnswer) => {
        const current = quiz[currentQuestion];
        const correctAns = current.correct;

        if (selectedAnswer === correctAns) {
            setScore(prev => prev + 1);
            console.log(score)
        }

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < quiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setEnd(true)
        }


        setQuizData(prev => [...prev, {
            question: current, selectedIndex: selectedAnswer,
            correctIndex: correctAns
        }])
        console.log(quizData)
    }

    return (
        <div>
            {
                review ? (
                    <ReviewPage
                        review={review}
                        quizData={quizData}
                        setQuizData={quizData}
                        setCurrentQuestion={setCurrentQuestion}

                    />
                ) : end ?
                    (
                        <FinalScore
                            score={score}
                            setReview={() => setReview(true)}
                        />
                    ) : (

                        <div>
                            <div>
                                {quiz[currentQuestion]?.question}
                            </div>

                            <div>
                                {quiz[currentQuestion]?.answers.map((answer, index) => (
                                    <button
                                        key={index}
                                        style={{ margin: '10px' }}
                                        onClick={() => answerButton(index, quiz[currentQuestion].answers)}
                                    >
                                        {answer}
                                    </button>
                                ))}
                            </div>
                            <p>{error}</p>
                        </div>
                    )
            }
        </div>
    )
}

// Front page
function FrontPage({ setQuizing }) {
    return (
        <div>

            <div
                style={{
                    margin: '10px',
                    fontSize: '40px',
                    fontFamily: 'Poppins',
                }}
            >LET'S QUIZ</div>
            <button
                onClick={() => setQuizing(true)}>
                Start
            </button>
        </div>
    )
}


// Final page
function FinalScore({ score, setReview }) {
    const [gameMessage, setGameMessage] = useState('');

    useEffect(() => {
        setGameMessage('FINISHED!');
    }, [])

    return (
        <div>
            <div
                style={{
                    margin: "10px",
                    fontSize: "40px",
                    fontFamily: "Poppins"
                }}
            >
                {gameMessage}
            </div>

            <div
                style={{
                    margin: "10px",
                    fontSize: "30px",
                    fontFamily: "Poppins"

                }}
            >
                YOUR SCORE IS: {score} / 10
            </div>

            <button
                onClick={setReview}
            >
                Review Question
            </button>

        </div >
    )
}

// FIGURE OUT THE REVIEW PAGE 
function ReviewPage({ quizData }) {
    const [displayNow, setDisplayNow] = useState(0)
    console.log(`data:`, quizData)


    const currentItem = quizData[displayNow];

    const next = () => {
        setDisplayNow(prev => Math.min(prev + 1, quizData.length - 1));
    }

    const prev = () => {
        setDisplayNow(prev => Math.max(prev - 1, 0));
    }

    const buttonColor = (index, selectedIndex, correctIndex) => {
        if (index === correctIndex) return 'green';
        if (index === selectedIndex && selectedIndex !== correctIndex) return 'red'
        return 'black'
    }
    return (
        <div>
            <div>
                {currentItem.question.question}
            </div>
            <div>
                {currentItem.question.answers.map((answer, index) => {
                    return (
                        <button
                            key={index}
                            style={{
                                margin: '10px',
                                backgroundColor: buttonColor(
                                    index,
                                    currentItem.selectedIndex,
                                    currentItem.correctIndex
                                )
                            }}
                        >
                            {answer}
                        </button>
                    )
                })}
            </div>
            <button onClick={prev}
                style={{ margin: '10px' }}
            >
                prev</button>
            <button onClick={next}
                style={{
                    margin: '10px',
                }}
            >
                Next
            </button>

        </div>
    )
}




export default function Assignment_19() {
    const [quizing, setQuizing] = useState(false);

    return quizing ? <QuizPage setQuizing={setQuizing} /> : <FrontPage setQuizing={setQuizing} />
}