import { startTransition, useEffect, useState } from "react"
import axios from "axios";


function QuizPage({ setQuizing }) {
    const [error, setError] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [end, setEnd] = useState(false);
    const [loading, setLoading] = useState(false)

    // fetching the API 
    useEffect(() => {
        const fetchData = async () => {
            setQuizing(true);
            try {
                const response = await axios.get(`https://apis.dnjs.lk/objects/quiz.php`);
                setQuiz(response.data);
                setLoading(true)
            } catch (error) {
                setLoading(false)
                setError(`failed to fetch data`);
                console.error(error);
            } finally {
                setLoading(false)

            }
        }
        fetchData();
    }, [])

    const answerButton = (selectedAnswer) => {
        const current = quiz[currentQuestion];
        const correctAns = current.correct;

        if (selectedAnswer === correctAns) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < quiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setEnd(true)
            setScore(score);
        }
    }

    return (
        <div>
            {
                end ? (
                    <FinalScore
                        score={score} />
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
                                    onClick={() => answerButton(index)}
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}


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

function FinalScore({ score }) {

    const [gameMessage, setGameMessage] = useState('');

    useEffect(() => {
        setGameMessage('FINISHED!')
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
                    fontFamily: "Poppinss"

                }}
            >
                YOUR SCORE IS: {score} / 10
            </div>
        </div >
    )
}


export default function Assignment_19() {
    const [quizing, setQuizing] = useState(false);

    return quizing ? <QuizPage setQuizing={setQuizing} /> : <FrontPage setQuizing={setQuizing} />
}