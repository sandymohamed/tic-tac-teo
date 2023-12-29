const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
let emptyCells = document.querySelectorAll('.empty-cell');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
let isPlayer_O_Turn = false;


startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    isPlayer_O_Turn = false;
    cellElements.forEach(cell => {
        cell.classList.add('empty-cell');
        cell.classList.remove(PLAYER_X_CLASS);
        cell.classList.remove(PLAYER_O_CLASS);
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once: true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');


}


function handleCellClick(e) {
    const cell = e.target
    const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        autoClick();
        swapTurns();
        setBoardHoverClass();
    }
}

function autoClick() {
    playerOPlaceMark();
    swapTurns()
    setBoardHoverClass()
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!";
    } else {
        const winnerClass = isPlayer_O_Turn ? PLAYER_X_CLASS : PLAYER_O_CLASS;
        winningMessageTextElement.innerHTML = `Player ${isPlayer_O_Turn ? "O's" : "X's"} Win!`;
    }
    winningMessageElement.classList.add("show");

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
    })
}


function placeMark(cell, currentClass) {

    if (currentClass === PLAYER_O_CLASS) {
        playerOPlaceMark();

    } else {
        cell.classList.remove('empty-cell');
        cell.classList.add(currentClass)
    }
}

function swapTurns() {
    isPlayer_O_Turn = !isPlayer_O_Turn;
}


function playerOPlaceMark() {
    // let emptyCells = document.querySelectorAll('.empty-cell');
    let emptyCells = document.getElementsByClassName('empty-cell');

    console.log(emptyCells);
    let randomEmptyCellIndex = Math.floor(Math.random() * emptyCells.length);
    let randomEmptyCell = emptyCells[randomEmptyCellIndex];
    randomEmptyCell.classList.remove('empty-cell');

    randomEmptyCell.classList.add(PLAYER_O_CLASS)
}




function setBoardHoverClass() {
    boardElement.classList.remove(PLAYER_X_CLASS)
    boardElement.classList.remove(PLAYER_O_CLASS)
    if (isPlayer_O_Turn) {
        boardElement.classList.add(PLAYER_O_CLASS)
    } else {
        boardElement.classList.add(PLAYER_X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}