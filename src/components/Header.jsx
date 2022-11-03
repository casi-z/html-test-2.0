import { useEffect, useState } from "react";

function Header({activatePopUp, testTime, endTest}) {
    const [time, setTime] = useState({...testTime})
    useEffect(() =>{
        setTime({...testTime})
    }, [])
    function timer(){
        let timeCopy = {...time}
        setInterval(() => {
            if(timeCopy.seconds === 0){ 
                timeCopy.minutes--
                timeCopy.seconds = 60

            }
            Number(timeCopy.seconds--)
            // if(timeCopy.seconds < 10){
            //     timeCopy.seconds = `0${timeCopy.seconds}`
            // }
            if(timeCopy.minutes === 0 && timeCopy.seconds === 0) endTest()
            setTime({...timeCopy})
        }, 1000)
    }timer()
    return(
        <div className="test__header header">
            <button onClick={() => activatePopUp(true)} className="header__end-button">Завершить тест</button>
            <div className="header__timer">
                {time.minutes}:{time.seconds}
            </div>
            
            <div className="header__theme-button">
                <i className="bi bi-lightbulb"></i>
            </div>
            
        </div>
    )
}
export default Header;