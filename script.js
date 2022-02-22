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

    const makePlay = (event) => {
        let tile = event.target;
        console.log("Tile pressed: " + tile.dataset.number);
        GameBoard.setTile(tile.dataset.number, activePlayer.getSymbol());
        tile.removeEventListener('click', makePlay);
        console.log(checkVictory(GameBoard.getBoard()));
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

    const togglePlayer = () => {
        activePlayer === players[0] ? 
            activePlayer = players[1]:
            activePlayer = players[0];
    };

    // Game Setup
    const gameSetup = () => {
        GameBoard.getTiles().forEach(tile => {
            tile.addEventListener('click', makePlay);
        });
    };

    // Array of all the posible winnign combination of tiles
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

    const players = [Player("Player 1", 'x'), Player("Player 2", 'o')];

    let activePlayer = players[0];

    gameSetup();

    return {activePlayer, togglePlayer, players};
    
})();

