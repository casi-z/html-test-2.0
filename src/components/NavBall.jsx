const test = n => window.addEventListener('keydown',(e)=>{if(e.key==='Alt')alert(n);if(e.key==='Control')console.log(n)})
const {log} = console
function NavBall({ball, keyt, action, params, children}) {
    return(
        <div key={keyt} onClick={() => action(ball, keyt)} className={"nav__ball " + params}>
            {children}
        </div>
    )
}
export default NavBall;