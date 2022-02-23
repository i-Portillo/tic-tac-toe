const Game = (() => {

    const GameBoard = (() => {
        let board = ['', '', '',
                     '', '', '',
                     '', '', ''];

        const xSymbol = "./img/x.svg";
        const circleSymbol = "./img/circle.svg";
    
        const getBoard = () => board;
    
        const getTile = (index) => board[index];

        const setTile = (index, symbol) => {
            board[index] = symbol;
            console.log(board);
            renderBoard();
        };

        const getTiles = () => tiles;
    
        const tiles = [...(document.querySelectorAll('.board-tile'))];
    
        const boardCleanup = () => {
            board = ['', '', '',
                     '', '', '',
                     '', '', ''];
            renderBoard();
        };

        const renderBoard = () => {
            for(let index = 0; index < board.length; index++) {
                if (board[index] === 'x') {
                    tiles[index].innerHTML = '<img src="' + xSymbol + '">';
                } else if (board[index] === 'o') {
                    tiles[index].innerHTML = '<img src="' + circleSymbol + '">';
                } else {
                    tiles[index].innerHTML = '';
                }
            }
        };
    
        return {getBoard, getTile, setTile, getTiles, boardCleanup};
    })();
    
    const Player = (name, symbol, type) => {

        const getName = () => name;
        const getSymbol = () => symbol;
    
        return {getName, getSymbol};
    };

    const takeTurn = (event) => {
        let tile = event.target;
        console.log("Tile pressed: " + tile.dataset.number);
        GameBoard.setTile(tile.dataset.number, activePlayer.getSymbol());
        tile.removeEventListener('click', takeTurn);
        if (checkVictory(GameBoard.getBoard())) {
            GameBoard.getTiles().forEach(tile => {
                tile.removeEventListener('click', takeTurn);
            });
            addScore(activePlayer);
            updateScore();
            announceWinner(activePlayer.getName());
            return;
        } else if (turn === 8) {
            announceWinner("tie");
            return;
        }
        turn++;
        togglePlayer();
    };

    const checkVictory = (board) => {
        // Stores the index of every appearance in the board of the symbol
        // of the active player
        const playerTiles = board.reduce((result, tile, index) => {
            if (tile === activePlayer.getSymbol()) {
                result.push(index);
            }
            return result;
        }, []);

        // Returns true if all the elements of at least one of the 
        // winning combinations are included in the tiles of the active
        // player
        return winningTiles.some(combination => {
            return combination.every(tile => {
                return playerTiles.includes(tile);
            });
        });
    };

    const announceWinner = (winner) => {
        if (winner !== "tie") {
            winnerDisplayText.textContent = "The winner is " + winner;
        } else {
            winnerDisplayText.textContent = "It's a tie!";
        }
        winnerDisplay.classList.remove('hidden');
    };

    const togglePlayer = () => {
        activePlayer === players[0] ? 
            activePlayer = players[1]:
            activePlayer = players[0];
        scoreboard.children[0].classList.toggle('active-player');
        scoreboard.children[2].classList.toggle('active-player');
    };

    const addScore = (player) => {
        player === players[0] ?
            score[0]++ :
            score[1]++;
    };

    // Game Setup
    const gameSetup = () => {
        turn = 0;
        activePlayer = players[round % 2];
        scoreboard.children[0].classList.remove('active-player');
        scoreboard.children[2].classList.remove('active-player');
        round % 2 === 0 ?
            scoreboard.children[0].classList.add('active-player') :
            scoreboard.children[2].classList.add('active-player');
        updateScore();
        GameBoard.boardCleanup();
        GameBoard.getTiles().forEach(tile => {
            tile.addEventListener('click', takeTurn);
        });
    };

    const resetGame = () => {
        score = [0, 0];
        round = 0;
        gameSetup();
    }

    const updateScore = () => {
        score1.textContent = score[0];
        score2.textContent = score[1];
    };

    const winnerDisplay = document.querySelector(".winner-display");
    const playButton = document.querySelector("header button");
    playButton.addEventListener('click', () => {
        gameSetup();
        playButton.classList.add('hidden');
        scoreboard.classList.remove('hidden');
    });
    const scoreboard = document.querySelector(".scoreboard");
    const score1 = document.querySelector("#score1");
    const score2 = document.querySelector("#score2");
    const startOver = document.querySelector("#startover-btn");
    startOver.addEventListener('click', () => {
        resetGame();
        winnerDisplay.classList.add('hidden');
    });
    const nextRound = document.querySelector("#nextround-btn");
    nextRound.addEventListener('click', () => {
        round++;
        gameSetup();
        winnerDisplay.classList.add('hidden');
    });
    const winnerDisplayText = document.querySelector(".winner-display p");

    // Array of all the posible winning combination of tiles
    const winningTiles = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    let score = [0, 0];

    let turn = 0;
    let round = 0;

    const players = [Player("Player 1", 'x'), Player("Player 2", 'o')];

    let activePlayer = players[0];
    scoreboard.children[0].classList.add('active-player');

    return {activePlayer, togglePlayer, players};
    
})();

