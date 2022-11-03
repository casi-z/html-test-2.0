import { useEffect, useState } from "react";
import questionList from "./Questions-list";

let n = 0

const log = n => console.log(n)
const test = n => window.addEventListener('keydown',(e)=>{if(e.key==='Alt')alert(n);if(e.key==='Control')console.log(n)})
function EndPage({points}) {
    
    const [endPoints, setEndPoints] = useState(0)
    const [active, setActive] = useState(false)
    const [stars, setStars] = useState([])
    const starsCopy = {...stars}
    const procents = points / questionList.length * 100
    function pointsCount(){
        if(active){
            setTimeout(() => {
                setInterval(() => {
                    if(n < points){
                        n++
                        setEndPoints(n)
                    }
                }, 400);
            }, 2000);
        
            setTimeout(() => {
                setTimeout(() => {
                    if(procents > 0) {
                        starsCopy[0] = true
                        setStars({...starsCopy})
                    }
                }, 1 * 300);
                setTimeout(() => {
                    if(procents > 20) {
                        starsCopy[1] = true
                        setStars({...starsCopy})
                    }
                }, 2 * 300);
                setTimeout(() => {
                    if(procents > 40) {
                        starsCopy[2] = true
                        setStars({...starsCopy})
                    }
                }, 3 * 300);
                setTimeout(() => {
                    if(procents > 60) {
                        starsCopy[3] = true
                        setStars({...starsCopy})
                    }
                }, 4 * 300);
                setTimeout(() => {
                    if(procents > 80) {
                        starsCopy[4] = true
                        setStars({...starsCopy})
                    }
                }, 5 * 300);
                setTimeout(() => {
                    if(procents === 100) {
                        starsCopy[5] = true
                        setStars({...starsCopy})
                    }
                }, 6 * 300);
            }, points * 400 + 2000);
        }
        
    }pointsCount()
    useEffect(() => {
        setActive(true)
        setStars([false, false, false, false, false, false,])
        
    },[])
    
    return(
        <div className={"end-page "+ active}>
            <h2>Тест завершен</h2>
            <span className="end-page__points">{endPoints}</span>
            <div className="end-page__star-container">
                <i className={"bi-star " + stars[0]}></i>
                <i className={"bi-star " + stars[1]}></i>
                <i className={"bi-star " + stars[2]}></i>
                <i className={"bi-star " + stars[3]}></i>
                <i className={"bi-star " + stars[4]}></i>
                <i className={"bi-star-fill six " + stars[5]}></i>
                    
            </div>
            <button className="end-page__button"></button>
        </div>
    )
}
export default EndPage;