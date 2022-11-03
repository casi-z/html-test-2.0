
function Buttons({status, action}) {
    return(
        <div className="question__bottom">
            <div className={status.next + " question__next-button-container"}>
                <button onClick={e => action.skip(e)} className={status.skip + " question__button question__button_skip"} >
                    {/* <svg class="arrow-bottom-3" viewBox="0 0 5 9">
                        <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z"></path>
                    </svg>  */}
                    Пропустить
                </button>
                <button onClick={e => action.answer(e)} className={status.answer + " question__button question__button_answer"}>
                    Ответить
                </button>
                <button onClick={e => action.next(e)} className={status.next + " question__button question__button_next"}>
                    Далее
                </button>
            </div>
        </div>
    )
}
export default Buttons;