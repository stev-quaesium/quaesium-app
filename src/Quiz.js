import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import loading from './loading.png';
import back from './back.png';

export default function Quiz() {

    const { id } = useParams();

    const [title, setTitle] = useState('')
    const [questions, setQuestions] = useState([])
    

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

    const [status, setStatus] = useState('unanswered');

    useEffect(() => {
        fetch('https://www.quaesium.serv00.net/')
        .then((res) => {return res.text()})
        .then((str) => {
            const rowObj = JSON.parse(str);
            const setObj = JSON.parse(rowObj.set);

            let randomisedQuestions = [];

            for (let i = 0; i < setObj.questions.length; i++) {
                const randomisedAnswers = setObj.questions[i].answers
                randomisedAnswers.sort((a, b) => {return 0.4 - Math.random()})
                
                const randomisedQuestion = {
                    title: setObj.questions[i].title,
                    answers: randomisedAnswers,
                    correct_answer: setObj.questions[i].correct_answer
                }

                randomisedQuestions.push(randomisedQuestion)
            }

            randomisedQuestions.sort((a, b) => {return 0.8 - Math.random()})

            setTitle(setObj.title)
            setQuestions(randomisedQuestions)
            setCurrentQuestionIndex(0)
        });
    }, [])

    function handleAnswer(answer) {
        if ((answer === questions[currentQuestionIndex].correct_answer) && (answer !== undefined) && (status === 'unanswered')) {
            setStatus('correct')
            setTimeout(() => {
                if (currentQuestionIndex !== questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                    setStatus('unanswered')
                } else {
                    setStatus('finished')
                }
            }, 1000)
        } else {
            setStatus('incorrect')
            setTimeout(() => {
                if (currentQuestionIndex !== questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                    setStatus('unanswered')
                } else {
                    setStatus('finished')
                }
            }, 1000)
        }
    }

    if (currentQuestionIndex === -1) {
        return (
            <div className="quiz">
                <div className="loading">
                    <p>Loading...</p>
                    <img src={loading}/>
                </div>
            </div>
        );
    } else if (status === 'correct') {
        return (
            <div className="quiz">
                <div className="correct">
                    <p>Correct ✅</p>
                </div>
            </div>
        );
    } else if (status === 'incorrect') {
        return (
            <div className="quiz">
                <div className="incorrect">
                    <p>Incorrect ❌</p>
                </div>
            </div>
        );
    } else if (status === 'finished') {
        return (
            <div className="quiz">
                <div className="finished">
                    <p>finished</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="quiz">
                <nav>
                    <Link to={'/dashboard'}><img src={back}/></Link>
                    <p>{title}</p>
                </nav>
                <div className="questions">
                    <div className="title">
                        <h1>{questions[currentQuestionIndex].title}</h1>
                    </div>
                    <div className="answers">
                        <button onClick={() => {handleAnswer(questions[currentQuestionIndex].answers[0])}}>{questions[currentQuestionIndex].answers[0]}</button>
                        <button onClick={() => {handleAnswer(questions[currentQuestionIndex].answers[1])}}>{questions[currentQuestionIndex].answers[1]}</button>
                        <button onClick={() => {handleAnswer(questions[currentQuestionIndex].answers[2])}}>{questions[currentQuestionIndex].answers[2]}</button>
                        <button onClick={() => {handleAnswer(questions[currentQuestionIndex].answers[3])}}>{questions[currentQuestionIndex].answers[3]}</button>
                    </div>
                </div>
            </div>
        );
    }
}