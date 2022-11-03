import { useEffect, useRef, useState } from "react";
import NavBall from "./NavBall";
import questionList from "./Questions-list";

function NavBar({points}) {
    const [questionBalls, setQuestionBalls] = useState([])
    const questionBallsCopy = [...questionBalls]
    questionList.forEach(() => {
        questionBallsCopy.push({params:'',},)
        
    })
    
    //questionBallsCopy[0].params = ' _focus'
    
    function changeQuestion(ball, index) {
        questionBallsCopy[index].params = ' _focus'
        
        setQuestionBalls([...questionBallsCopy])
        
    }
    useEffect(() => {
        setQuestionBalls([...questionBallsCopy])
    }, [])
    console.log(questionBalls);
    return(
        <div className="points-container">
            <div className="nav">
                {questionBalls.map((ball, index) =>
                        <NavBall ball={ball} keyt={index} action={changeQuestion} params={ball.params}>{index + 1}</NavBall>
                    )
                }
            </div>
            <span>{points}</span>
        </div>    
    )
}
export default NavBar;