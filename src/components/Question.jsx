import Buttons from "./Buttons";
import EndPage from "./EndPage";
import questionList from './Questions-list'
import { engAlphabet } from "./Questions-list";
import { useEffect, useRef, useState } from "react";
const log = n => console.log(n)
const test = n => window.addEventListener('keydown',(e)=>{if(e.key==='Alt')alert(n);if(e.key==='Control')console.log(n)})


let currentQuestion = {
    number: NaN,
    price: NaN,
    answered: false,
}

function Question({answerCheck, setAnswer, endTest}) {
    
    const [questions, setQuestions] = useState([])
    let questionCopy = [...questions]

    const [buttonStatus, setButtonStatus] = useState({})
    let buttonStatusCopy = {...buttonStatus} 
    
    const [questionContainerScroll, setQuestionContainerScroll] = useState('')
    const questionElement = useRef()
    
    
    test(currentQuestion.price)
    //Клик на ответ
    const answerSelect = (type, price, questionIndex, answerIndex) => { 
        if (!currentQuestion.answered){

            //Присваиваем переменной номер текущего вопроса
            currentQuestion.number = questionIndex
            currentQuestion.price = price

            //Добавлем класс фокуса на ответ, убираем его у остальных через состояние

            questionCopy[questionIndex].answers.map(answer => answer.params = '')
            questionCopy[questionIndex].answers[answerIndex].params = '_focus'
            setQuestions(questionCopy)

            //Проверяем ответ на правильность
            answerCheck(type, price)

            //Включаем кнопку Ответить
            buttonStatusCopy.answer = true
            setButtonStatus(buttonStatusCopy)
            
        }
    }
    //Клик на кнопку Ответить
    function showAnswerType(){
        if (!currentQuestion.answered){
            //Добавляем ответам класс их правильности (правильные - зелёный фон, неправильные - красный)
            questionCopy[currentQuestion.number].answers.map(answer => 
                answer.params += ` _${answer.right}`
            )
            setQuestions([...questionCopy])
            //Запрещаем повторный ответ на вопрос
            currentQuestion.answered = true
        }
    }

    useEffect(() => {
        //Создаем массив вопросов
        setQuestions([...questionList])
        //Создаем массив с параметрами кнопок
        setButtonStatus({
            skip: true,
            answer: false,
            next: false,
            //Обнуляем параметры кнопок
            default: { 
                skip: true, 
                answer: false, 
                next: false
            }
            
        })
        //Задаём высоту вопроса в vh для прокрутки контейнера
        setQuestionContainerScroll(80 * 0)
        
    },[])
    
    //Задаем функции кнопок
    const button = {
        skip: () => {
            setQuestionContainerScroll(80 * (currentQuestion.number + 1))
        },
        answer: () => {
            if(!currentQuestion.answered && buttonStatus.answer){
                setAnswer()
                showAnswerType()
                buttonStatusCopy.next = true
                setButtonStatus({...buttonStatusCopy})

            }
        },
        next: () => {
            if ((currentQuestion.number + 1) === (questionList.length)) endTest()
            else{
                setQuestionContainerScroll(80 * (currentQuestion.number + 1))
                currentQuestion.answered = false
                buttonStatusCopy = buttonStatusCopy.default
                setButtonStatus({...buttonStatusCopy})
            }

        },
    }
    let questionContainerStyles = {
        transform: `translateX(-${questionContainerScroll}vw)`
    }
    
    return(
        questions &&
        <>
        
        <div 
            style={questionContainerStyles} 
            className="test__question-container"
        >
            {questions.map((question, questionIndex) => 

                <div className="question" ref={questionElement} key={questionIndex}>
                    {/* Текст вопроса */}

                    <div className="question__text">
                        {question.text}
                        <div className="question__description">
                            Выберите <span>один</span> правильный ответ, что бы получить <span>{question.price}</span> баллов!
                        </div>
                    </div>

                    {/* Превью CSS свойств  */}

                    <div className="question__cube-container">
                        
                    </div>

                    <div className="question__answer-container">

                        {question.answers.map((answer, answerIndex) =>

                            //Кнопка с ответом 

                            <div onClick={e => answerSelect(answer.right, question.price, questionIndex, answerIndex)} 
                                key={answerIndex} 
                                className={`question__answer answer ${answer.params}`}
                            >

                                {/* Вариант ответа (буква) */}
                                
                                <div className="answer__letter">{engAlphabet[answerIndex]}</div>
                                {answer.text}
                            </div>
                        )}

                    </div>
                    {/* Кнопки ответить и далее*/}
                    <Buttons action={button} status={buttonStatus}/>
                </div>
            )}
            
        </div>
        
    </>)
}
export default Question;