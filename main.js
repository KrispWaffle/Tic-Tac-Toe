const gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        });
        document.querySelector("#gameboard").innerHTML = boardHTML; // Update the innerHTML here
        
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        });

        
       
    };
    const getGameboard = ()=>gameboard
    const update = (index, value)=>{
        gameboard[index] = value;
        render()
    }
 
    return {
        render,
        getGameboard,
        update,
   
    };
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;
    
    const start = () => {
        players = [
            createPlayer('X', 'x'),
            createPlayer('O', 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameboard.render();
    };
    
    const handleClick = (event) => {
        let index = event.target.id.split('-')[1];
        if(gameOver) return;
        
        if(gameboard.getGameboard()[index] !== '') {
            return;
        }
        
        gameboard.update(index, players[currentPlayerIndex].mark);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        
        if(checkForWin(gameboard.getGameboard(), players[currentPlayerIndex].mark)){
            gameOver = true;
            alert(`${players[currentPlayerIndex-1].name} won!`);
        } else if (checkForTie(gameboard.getGameboard())) {
            gameOver = true;
            alert('It\'s a tie');
        }
    };

    const reset = () => {
        for(let i = 0; i < 9; i++){
            gameboard.update(i,"");
        }
        gameOver = false;
    };

    return {
        start,
        handleClick,
        reset
    };
})();


document.addEventListener('DOMContentLoaded', function() {
    Game.start()
});

const resetBtn = document.querySelector("#reset")
resetBtn.addEventListener('click',()=>{
    Game.reset()
})


function checkForWin(board, mark) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}


function checkForTie(board){
    return  board.every(cell =>cell!== '')
}

