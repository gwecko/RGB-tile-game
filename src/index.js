var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var newGameBtn = document.getElementById("newGame");
var difficultyBtns = document.querySelectorAll(".difficulty"); //array!!
var colorTextHeader = document.getElementById("colorTextHeader"); //tells which color to guess
var tiles = document.querySelectorAll(".tile");
//integer value storing numbber of tiles to display
var numTiles = 6;
//array of colors to be used in tiles
var colors = [];
//single integer value
var correctColor;


gameSetup();


function gameSetup(){
    //adds click listeners and user interaction response 
    for(var i = 0; i < tiles.length; i++){
        tiles[i].addEventListener("click", function(){
            var clickColor = this.style.backgroundColor;
            //compares the selected color to the correct color
            if(clickColor === correctColor){
                messageDisplay.textContent = "CORRECT";
                newGameBtn.textContent = "Play again?";
                changeColors(correctColor);
                h1.style.backgroundColor = correctColor;
            } else {
                messageDisplay.textContent = "Try harder";
                this.style.backgroundColor = "#303030";
            }
        });
    }
    
    
    //regulates the difficulty mode, directing the program to change the number of tiles.
    for(var i = 0; i < difficultyBtns.length; i++){
        difficultyBtns[i].addEventListener("click", function(){
            //hard coded. need to add if ever creating new difficulty
            difficultyBtns[0].classList.remove("selectedBtn");
            difficultyBtns[1].classList.remove("selectedBtn");
            this.classList.add("selectedBtn");
            //This one line——called a ternary operator——does the same thing as
            //the below if/else statement:
                // if(this.textContent === "Easy"){
                //     numTiles = 3;
                // } else {
                //     numTiles = 6;
                // }
            this.textContent === "Easy" ? numTiles = 3: numTiles = 6;
            updateGame();   
        });
    }
    
    
    newGameBtn.addEventListener("click", function(){
        updateGame();
    });
}

//generates new colors, calls "correct color" function, updates header text.
function updateGame(){
    colors = generateRandomColors(numTiles);
    correctColor = selectCorrectColor();
    colorTextHeader.textContent = correctColor;
    h1.style.backgroundColor = "lightslategray";
    messageDisplay.textContent = "";
    newGameBtn.textContent = "New tiles";
    for (var i = 0; i < tiles.length; i++){
        if(colors[i]){  //very important 'if', checks for existing array element.
            tiles[i].style.display = "block"; //shows the tiles again, if hidden.
            tiles[i].style.backgroundColor = colors[i];
        } else {
            tiles[i].style.display = "none";
        }
    }
}

//changes color of all tiles to passed-in color.
function changeColors(color){
    for(var i = 0; i < tiles.length; i++){
        tiles[i].style.backgroundColor = color;
    }
}

//picks a color to be the "correct" color, returns random array index.
function selectCorrectColor(){
    //most efficient way; avoids doing an implicit conversion between floats and ints
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//returns an array of length 'num' of colors.
function generateRandomColors(num){
    var arr = [];
    //gets random color and pushes into array
    for(var i = 0; i < num; i++){
        arr[i] = randomColor();
    }
    return arr;
}

//returns a single color formatted as rgb(x, y, z).
function randomColor(){
    //Multiplying by 256 (255 + 1) because we're choosing the floor of the value.
    //pick red from  0 - 255
    var r = Math.floor(Math.random() * 256.0);
    //pick green
    var g = Math.floor(Math.random() * 256.0);
    //pick blue
    var b = Math.floor(Math.random() * 256.0);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}