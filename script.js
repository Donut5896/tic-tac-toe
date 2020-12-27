const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS =[
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertical
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell');
const board = document.getElementById('board');
const winningText = document.getElementById('winningText');
const restartBtn = document.getElementById('restartButton');
const winningTextElement = document.querySelector('[data-winning-text]')
let circleTurn;

//not fire the same event twice
cellElements.forEach(cell => {
    cell.addEventListener('click', hanndleClick, {once: true})
});


//start game 
startGame();

//restart game
restartBtn.addEventListener('click', startGame);

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {

        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', hanndleClick)
        
        cell.addEventListener('click', hanndleClick, {once : true})
    })
    setBoardHoverClass()
    winningText.classList.remove('show');
}




// handle click event
function hanndleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS :  X_CLASS 
    placeMark(cell, currentClass);

    //check win or draw
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{    
        swapTurns()
        setBoardHoverClass()
    }

   
};

//check draw
function endGame(draw){
 if(draw){
    winningTextElement.innerText = 'Draw!'
 }else{
    winningTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
 }
    winningText.classList.add('show')
}
//check if every cell are filled
function isDraw(){
    return[...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

//place mark
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
};
 //switch turn
function  swapTurns(){
    circleTurn = !circleTurn
};

 //hover effect
function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
};

//check winnner (if currentclass is in all three of the cellelement than it's a win)
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
};