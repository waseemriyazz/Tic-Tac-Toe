

// Selecting elements from the DOM
const canvas = document.querySelector(".canvas"); // The game board
const markerPlaced = new Array(9).fill(false); // Array to track marker placement
const message = document.querySelector(".message"); // Message to display game outcome
const reset = document.querySelector(".reset"); // Reset button

// Player Factory function to create player objects with name and marker
const PlayerFactory = (name, marker) => {
  return { name, marker };
}

// Initialize game variables
let marksGenerated = 0; // Counter for the total marks placed
let winner = false; // Flag to track the game winner
let draw = false; // Flag to track if the game is drawn
const player = PlayerFactory(prompt("Enter your name"), "X"); // User player
const computer = PlayerFactory("Computer", "O"); // Computer player
const cells = document.querySelectorAll(".cell"); // Individual cells on the game board


// Add click event listener to the game board (canvas)
canvas.addEventListener("click", (e) => {
  // Only allow player moves if there is no winner yet
  if (winner==false) {
    placemarker(e, player.marker); // Place the player's marker
  }
});

// Add click event listener to the reset button
reset.addEventListener("click", () => {
  // Reset the game board, marker placement, and message
  for (let i = 0; i < markerPlaced.length; i++) {
    markerPlaced[i] = false;
  }
  cells.forEach(cell => {
    cell.textContent = "";
  });
  message.textContent = "";
  marksGenerated = 0; // Reset the marks counter
  winner = false; // Reset the winner flag
});

// Function to place a marker on the board
function placemarker(e, marker) {
  if (markerPlaced[e.target.id] == false) {
    // Update the cell with the player's marker
    e.target.textContent = `${marker}`;
    markerPlaced[e.target.id] = true;
    checkWinner(); // Check for a winner after each move
    checkDraw();
    if (winner==false) {
      computerTurn(); // If there's no winner yet, it's the computer's turn
    }
  }
}

// Function to handle the computer's turn
function computerTurn() {
  
  while(marksGenerated < 4)
  {
  const randomNum = Math.floor(Math.random() * 9) ;
  if(markerPlaced[randomNum]==false)
  {
      const cell = document.getElementById(`${randomNum}`);
      // Place the computer's marker on an empty cell
      cell.textContent="O"; 
      markerPlaced[randomNum]=true;
      marksGenerated++;
      checkWinner();
      break;
    
  }
}
}

// Function to check for a winner
function checkWinner() {
  // Check for winning conditions in rows
  for (let t = 0; t <= 6; t = t + 3) {
    if (
      cells[t].textContent === cells[t + 1].textContent &&
      cells[t + 1].textContent === cells[t + 2].textContent &&
      cells[t + 2].textContent != ""
    ) {
      winner = true;
      getWinner(cells[t].textContent);
    }
  }
   // Check for winning conditions in columns
  for (let t = 0; t < 3; t++) {
    if (
      cells[t].textContent === cells[t + 3].textContent &&
      cells[t + 3].textContent === cells[t + 6].textContent &&
      cells[t + 6].textContent != ""
    ) {
      winner = true;
      getWinner(cells[t].textContent);
    }
  }
   // Check for winning conditions in diagonals
  if (
    cells[0].textContent === cells[4].textContent &&
    cells[4].textContent === cells[8].textContent &&
    cells[8].textContent != ""
  ) {
    winner = true;
    getWinner(cells[4].textContent);
  }
  if (
    cells[2].textContent === cells[4].textContent &&
    cells[4].textContent === cells[6].textContent &&
    cells[6].textContent != ""
  ) {
    winner = true;
    getWinner(cells[4].textContent);
  }
  

}

// Function to display the winner's name in the message element
function getWinner(marker) {
  if (marker == player.marker) {
    message.textContent = `${player.name} wins!`;
  } else {
    message.textContent = "Computer wins!";
  }
}
function checkDraw(){
    let temp = true;
    for (let index = 0; index < markerPlaced.length; index++) {

    temp = temp & markerPlaced[index];      
    
}
if(temp==true)
{
    message.textContent="Game Drawn!"
}
}
