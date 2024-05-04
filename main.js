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
        reset
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
            createPlayer('player1', 'x'),
            createPlayer('player2', 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameboard.render();
    };
    const handleClick = (event) => {
        let index = event.target.id.split('-')[1];
       
       
        if(gameboard.getGameboard()[index] !== ''){
          
            return
        }
        gameboard.update(index, players[currentPlayerIndex].mark)
        currentPlayerIndex = currentPlayerIndex  === 0?1:0
    };
    const reset = () => {
        for(let i = 0; i<9; i++){
            gameboard.update(i,"")
            console.log('reseted')
        }
    }
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