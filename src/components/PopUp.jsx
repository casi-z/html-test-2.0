import { useEffect, useState } from "react";
import { useRef } from "react";

const test = n => window.addEventListener('keydown',(e)=>{if(e.key==='Alt')alert(n);if(e.key==='Control')console.log(n)})
const {log} = console
function PopUp({activatePopUp, active, endTest}) {
   
    const [cursorPosition, setCursorPosition] = useState({})
    function newCursor(e) {
        if(active){
            let cursorPositionCopy = {...cursorPosition}
            cursorPositionCopy.left = e.pageX
            cursorPositionCopy.top = e.pageY
            setCursorPosition({...cursorPositionCopy})
        }
    }
    useEffect(() => {
        setCursorPosition({
            left: '1px',
            top: '1px'
        })
    }, [])
    return(
        <div onMouseMove={e => newCursor(e)} className={"pop-up " + active}>
            
            <i onClick={e => activatePopUp(false)} style={cursorPosition} className="pop-up__close-icon bi bi-x-circle"></i>
            <div className="pop-up__body">
                <h2>Вы уверены что хотите завершить тест?</h2>
                <div onClick={() => endTest()} className='pop-up__end-button'>
                    <i className="bi bi-x"></i>
                    Завершить
                    
                </div>
            </div>
            
        </div>
    )
}
export default PopUp;