import { useState } from "react";
import EndPage from "./components/EndPage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Question from "./components/Question";
import PopUp from "./components/PopUp";
const test = n => window.addEventListener('keydown',(e)=>{if(e.key==='Alt')alert(n);if(e.key==='Control')console.log(n)})
const {log} = console

function App() {
    
    let selectedAnswer = {
        right: false,
        price: NaN,
    }
    const [points, setPoints] = useState(0)
    
    function answerCheck(type, price) {
        selectedAnswer.right = type
        selectedAnswer.price = price
    }
    function setAnswer(){
        selectedAnswer.right ? setPoints(points + selectedAnswer.price)
        : log(false)
    }
    function endTest() {
        setDoEndPageActive(true)
        setDoPopUpActive(false)
        log('ended')
    }
    const time = {
        hours: 0,
        minutes: 10,
        seconds: 10,

    }
    function activatePopUp(n){
        setDoPopUpActive(n)
        log(1)
    }
    const [doEndPageActive, setDoEndPageActive] = useState(false)
    const [doPopUpActive, setDoPopUpActive] = useState(false)
    return (
        <>
            
            <PopUp activatePopUp={activatePopUp} active={doPopUpActive} endTest={endTest}/>
            <NavBar points={points}/>

            <div className="test">
                <Header activatePopUp={activatePopUp} testTime={time} endTest={endTest}/>
                {
                    !doEndPageActive 
                        ?
                    <Question 
                        endTest={endTest} 
                        answerCheck={answerCheck} 
                        setAnswer={setAnswer}
                    />
                        :
                    <EndPage points={points}/>
                }
            </div>
        </>
    );
}

export default App;
