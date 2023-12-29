class Player {

    name: string;
    symbol: string;


    chooseName() {
        let playerName;
        while (typeof (playerName) !== 'string') playerName = prompt("Enter your name /nit should be only text");

        this.name = playerName;

    }

    chooseSymbol() {
        let playerSymbol;
        while (typeof (playerSymbol) !== 'string' && playerSymbol.length != 1) playerSymbol = prompt(`${this.name} Enter your symbol /nit should be only one charachter`);

        this.symbol = playerSymbol.toUpperCase();
    }
}

// const player = new Player();

// player.chooseName();
// player.chooseSymbol();




class Menu {

    validateChoice(num) {
        let done = false;
        // while (!done) num = Number(prompt("Enter a number (1 or 2):"));
        if (num === 1) {
            done = true;
            // console.log("The number entered is 1");
        } else if (num === 2) {
            done = true;
            // console.log("The number entered is 2");
        } else {
            done = false;
        }
        return done;

    }

    displayMainMenu() {


        let playerSymbol;

        while (!this.validateChoice(playerSymbol)) playerSymbol = Number(prompt("Enter a number (1 or 2):"));
        // if (playerSymbol === 1) {
        //     console.log("The number entered is 1");
        // } else if (playerSymbol === 2) {
        //     console.log("The number entered is 2");
        // } else {
        //     console.log("The number entered is neither 1 nor 2");
        //     playerSymbol = Number(prompt("Enter a number (1 or 2):"));

        // }
        return playerSymbol;
    }

    displayEndGame() {

        let choice;
        console.log("Game Over");
        console.log(`1. Restart Game`);
        console.log(`2. Quit Game`);
        while (!this.validateChoice(choice)) choice = Number(prompt("Enter a number (1 or 2):"));

    }
}



class Board {
    board: any[] = [];

    constructor() {
        const cell1 = document.getElementById("1");
        const cell2 = document.getElementById('2');
        const cell3 = document.getElementById('3');
        const cell4 = document.getElementById('4');
        const cell5 = document.getElementById('5');
        const cell6 = document.getElementById('6');
        const cell7 = document.getElementById('7');
        const cell8 = document.getElementById('8');
        const cell9 = document.getElementById('9');

        this.board = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9];

    };


    isValidMove(moveIndex) {
        if (moveIndex < 1 || moveIndex > 9) {
            alert("Invalid Move! Please enter a number between 1 and 9.");
            return false;
        } else if (this.board[moveIndex - 1].className === 'active') {
            alert("Invalid Move! This spot is already occupied. Try again!");
            return false;
        }
        return true;

    }

    updateBoard(id, symbol) {
        if (this.isValidMove(id)) {
            this.board[id - 1].innerText = symbol;
            this.board[id - 1].toggleClass = 'active';
        }
    }

    resetBoard() {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i].innerText = i + 1;
            // this.board[i].style.color='black';
            // this.board[i].className="unselected";
        }
    }
}

class Game {
    players: any[] = [new Player(), new Player()];
    currentPlayerIndex: number = 0;
    gameOver: boolean;
    turnCount: number;
    board: any = new Board;
    menu: any = new Menu();

    setupPlayer() {
        for (const player of this.players) {
            player.chooseName();
            player.chooseSymbol();
        }
    }

    playGame() {
        //   Setup the game
        while (true) {
            this.playTurn();
            if (this.checkWin() || this.checkDraw()) {
                let choice = this.menu.displayEndGame();
                if (choice === "1") {
                    this.restartGame();
                } else {
                    this.quit();
                    break;

                }

            } else {

            }
        }
    }

    quit() {
        console.log("Thank you");
    }

    playTurn() {
        let player = this.players[this.currentPlayerIndex];
        // this.board.updateBoard()
        let playerText = document.getElementById('player');
        if (playerText) playerText.innerText = `${player.name}'s turn ${player.symbol}`;

        while (true) {
            let cellChoiceStr: string | null = prompt(`Choose a number between 1-9`);

            if (cellChoiceStr !== null) {
                let cellChoice: number = parseInt(cellChoiceStr);

                if (!isNaN(cellChoice) && cellChoice >= 1 && cellChoice <= 9) {
                    // Perform actions based on the valid number input (between 1 and 9)
                    alert(`You chose: ${cellChoice}`);
                    break;
                } else {
                    alert("Please enter a valid number between 1 and 9");
                }
            } else {
                alert("Prompt canceled or empty input");
                break;
            }
        }

        this.switchPlayer();
    }

    switchPlayer() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;

    }

    restartGame() {

    }

    checkWin() {
        return true;
    }

    checkDraw() {
        return true;

    }

    startGame() {
        console.log("Starting the game");
        const choice = this.menu.displayMainMenu();
        switch (choice) {
            case "1":
                this.setupPlayer();
                this.playGame();
                break;
            case "2":
                this.quit();
                break;
            default:
                console.log('Error in selection');
        }

        this.turnCount = 0;
        this.gameOver = false;
        this.currentPlayerIndex = Math.floor(Math.random());
        while (!this.players[this.currentPlayerIndex].makeTurn()) {
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
        };
        // this.drawBoard();
    }

    // drawBoard(){
    //     setInterval(()=>{
    //         document.getElementById('tic-tac-toe').innerHTML = `
    //         ${this.board.rows.map(row => row.join('\u2009')).join('\n')}
    //         Turn: ${this.players[this.currentPlayerIndex].marker}\u2003${this.play
    //             .players[1 - this.currentPlayerIndex].marker}`;
    //             },50);
    //             }


    // makeMove(position) {
    //     if (this.isValidMove(position)) {
    //         this.markPosition(position, this.players[this.currentPlayerIndex]);
    //         this.checkForWinner();
    //         if(!this.gameOver) {
    //             this.nextTurn();
    //             } else {
    //                 alert(`The winner is player ${this.getCurrentPlayer().getName()}!`);
    //                 alert(`Congratulations! The winner is player ${this.getCurrentPlayer().getName()}!`);
    //                 alert(`The winner is ${this.players[this.winner].name}. Would you like to play again?`);
    //                 alert(`The Game is Draw!`);
    //                 }
    //                 return true;
    //                 }
    //                 return false;
    //                 }

    //                                             nextTurn() {
    //                                                 this.turnCount++;
    //                                                 this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    //                                                 let validMoves = [];
    //                                                 for (let i = 0; i < this.board.length; i++) {
    //                                                     if (this.isValidMove(i)) {
    //                                                         validMoves.push(i);
    //                                                         }
    //                                                         }
    //                                                         if (validMoves.length === 0) {
    //                                                             this.gameOver = true;
    //                                                             return;
    //                                                             }
    //                                                             let randomIndex = Math.floor(Math.random() * validMoves.length);
    //                                                             const randomNumber = Math.floor(Math.random() * validMoves.length);






    // }

}



// *************************************************

// class Game {
//     board: any[];
//     currentPlayer :string;
//     gameOver: boolean;

//     constructor() {
//         this.board = ['','','','','','','',''];
//         this.currentPlayer = 'X';
//         this.gameOver = false;
//     }

//     printBoard() {
//         console.log('---------');
//         console.log('| ' + this.board[0] + ' | ' + this.board[1] + ' | ' + this.board[2] + ' |');
//         console.log('---------');
//         console.log('| ' + this.board[3] + ' | ' + this.board[4] + ' | ' + this.board[5] + ' |');
//         console.log('---------');
//         console.log('| ' + this.board[6] + ' | ' + this.board[7] + ' | ' + this.board[8] + ' |');
//         console.log('---------');
//     }

//     makeMove(position) {
//         if (this.gameOver) {
//             console.log('Game is over!');
//             return;
//         }

//         if (this.board[position] === '') {
//             this.board[position] = this.currentPlayer;
//             this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
//         } else {
//             console.log('Invalid move. Try another position.');
//         }

//         this.checkWin();
//         this.printBoard();
//     }

//     checkWin() {
//         const lines = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6]
//         ];

//         for (let line of lines) {
//             const [a, b, c] = line;
//             if (
//                 this.board[a] &&
//                 this.board[a] === this.board[b] &&
//                 this.board[a] === this.board[c]
//             ) {
//                 this.gameOver = true;
//                 console.log('Player ' + this.board[a] + ' wins!');
//                 return;
//             }
//         }

//         if (this.board.every(square => square !== '')) {
//             this.gameOver = true;
//             console.log('It\'s a tie!');
//         }
//     }
// }

// let game = new Game();
// game.printBoard();

// // Making some moves
// game.makeMove(0);
// game.makeMove(1);
// game.makeMove(2);
// game.makeMove(4);
// game.makeMove(5);
// game.makeMove(7);
// game.makeMove(8);
// game.makeMove(3);
// game.makeMove(6);

// game.checkWin();

