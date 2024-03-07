var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var isGameStarted = false;
var level = 0;

document.addEventListener('keydown', function() {

    if (!isGameStarted) {
        nextSequence();
        document.querySelector('h1').innerHTML = `level ${level}`;
        isGameStarted = true;
    }

})

//Check which button is clicked
var numOfButtons = document.querySelectorAll('.btn').length;
for (let i = 0; i < numOfButtons; i++){
    document.querySelectorAll('.btn')[i].addEventListener('click', function () {
        var userChosenColor = this.classList[0];
        userClickedPattern.push(userChosenColor);

        //Adding Sound to Button Clicks
        playSound(userChosenColor);

        //Adding Animations To User Clicks
        showAnimation(userChosenColor, 'clicked');

        // Checking Answer
        var index = userClickedPattern.length -1;
        checkAnswer(index);

    })
}

// Checking Answer
function checkAnswer(currentLevel) {        
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var wrongSound = new Audio('./sounds.wrong.mp3');
        wrongSound.play();

        document.querySelector('body').classList.add('game-over');
        setTimeout(function () {
            document.querySelector('body').classList.remove('game-over');
        }, 200);

        document.querySelector('h1').innerText = 'Game Over, Press Any Key to Restart';
        startOver();
    }
}

//Creating a Random Number
function nextSequence() {

    userClickedPattern = [];
    level++;
    document.querySelector('h1').innerHTML = `level ${level}`;
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    showAnimation(randomChosenColor, 'flash');
    playSound(randomChosenColor);
}

//Playing Sound 
function playSound(color) {
    switch (color) {
        case 'red':
            var redSound = new Audio(`./sounds/${color}.mp3`);
            redSound.play();
            break;
        case 'blue':
            var blueSound = new Audio(`./sounds/${color}.mp3`);
            blueSound.play();
        case 'green':
            var greenSound = new Audio(`./sounds/${color}.mp3`);
            greenSound.play();
        case 'yellow':
            var yellowSound = new Audio(`./sounds/${color}.mp3`);
            yellowSound.play();
        default:
            break;
    }
}

//Showing Button Animations
function showAnimation(buttonColorName, animationName) {
    document.querySelector(`.${buttonColorName}`).classList.add(`${animationName}`);
    setTimeout(function () {
        document.querySelector(`.${buttonColorName}`).classList.remove(`${animationName}`);
    },150)
}

//Start Over
function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}