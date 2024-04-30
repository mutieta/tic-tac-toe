// Select the element with the class "game--status" and assign it to the variable `statusDisplay`
const statusDisplay = document.querySelector('.game--status');

// Initialize the variable `gameActive` to `true` to indicate that the game is active
let gameActive = true;

// Initialize the variable `currentPlayer` with the value "X" to represent the current player's symbol
let currentPlayer = "🍭";

// Initialize the `gameState` array to represent the current state of the game board
let gameState = ["", "", "", "", "", "", "", "", ""];

// Define a function that returns a string indicating the winning player
const winningMessage = () => `Player ${currentPlayer} has won!`;

// Define a function that returns a string indicating that the game ended in a draw
const drawMessage = () => `Game ended in a draw!`;

// Define a function that returns a string indicating whose turn it is
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Set the initial status display to indicate the current player's turn
statusDisplay.innerHTML = currentPlayerTurn();

// Add a click event listener to each element with the class "cell"
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

// Function to handle a cell click event
function handleCellClick(clickedCellEvent) {
    // Get the clicked cell and its index
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Check if the clicked cell is already filled or if the game is not active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Process the played cell and update the game state
    handleCellPlayed(clickedCell, clickedCellIndex);

    // Check if there is a winner or a draw after the cell is played
    handleResultValidation();
}

// Function to handle a played cell and update the game state
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Define the winning conditions as an array of arrays
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check the result after each cell is played
function handleResultValidation() {
    let roundWon = false;

    // Loop through the winning conditions to check for a win
    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];

        // If any of the cells in a winning condition are empty, continue to the next condition
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // If all three cells in a winning condition have the same symbol, set `roundWon` to true
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // If a player has won, update the status display, set `gameActive` to false, and return
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // If there are no empty cells remaining, it's a draw. Update the status display, set `gameActive` to false, and return
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // If the game is still active, switch to the next player's turn and update the status display
    handlePlayerChange();
}

// Function to switch to the next player's turn
function handlePlayerChange() {
    currentPlayer = currentPlayer === "🍭" ? "🧁" : "🍭";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Select the "Restart Game" button element and assign it to the variable `restartButton`
const restartButton = document.querySelector('.game--restart');

// Add a click event listener to the restart button to call the restart game function
restartButton.addEventListener('click', handleRestartGame);

// Function to restart the game
function handleRestartGame() {
    // Reset game state and variables to their initial values
    gameActive = true;
    currentPlayer = "🍭";
    gameState = ["", "", "", "", "", "", "", "", ""];

    // Update the status display and clear the cell contents
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}                                                                        