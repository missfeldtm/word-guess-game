
//word picking variables
var words = ['beyonce', 'nsync', 'coldplay', 'nickelback','radiohead', 'paramore'];

var group = [
    { name:'beyonce', image: 'beyonce.jpg'},
    { name:'nsync', image: 'nsync.jpg'},
    { name:'coldplay', image: 'coldplay.jpg'},
    { name:'nickleback', image: 'gross.png'},
    { name:'radiohead', image: 'radiohead.jpg'},
    { name:'paramore', image: 'paramore.jpg'},

];




var playingWord = '';
var wordArr = [];
var blanks = 0;



//Set GamePlay Variables
var letterGuessed = 0;
var correctGuesses = 0;
var lives = 15;

var wrongLetters = [];
var underscoreDisplay = [];


//using double word to allow one button press
var letterChecker = ['a', 'b', 'c',
    'd', 'e', 'f',
    'g', 'h', 'i',
    'j', 'k', 'l',
    'm', 'n', 'o',
    'p', 'q', 'r',
    's', 't', 'u',
    'v', 'w', 'x',
    'y', 'z',' '
];



//grab variables to maniupulate from the DOM 

var wrongGuesses = document.querySelector('.wrong-guess');
var wordToGuess = document.querySelector('.underscores');
var livesRemaining = document.querySelector('.lives');
var showImg = document.querySelector('#show-img');
var hideImg = document.querySelector('#hide-img');
var resetButton = document.querySelector('#reset');

resetButton.addEventListener("click", reset);



/**************************************************START GAME**************************************************/


init();

document.onkeyup = function (event) {
  
    var letterGuessed = event.key;
    console.log(event.key);
    //check to see if user has guessed letter already
    for (var i = 0; i < letterChecker.length; i++) {
        if (letterGuessed === letterChecker[i]) {
            var eliminate = letterChecker.splice(i, 1);

            compare(letterGuessed);
            gameEnder();

        }
    }

}


/**************************************************FUNCTIONS**************************************************/

//generates a word by using math.random

function wordPicker() {

    playingWord = group[Math.floor(Math.random() * group.length)].name;

    



    console.log(playingWord);
    

    //create an array from string with .split method

    wordArr = playingWord.split('');
    console.log(wordArr);

    //generates the blanks array to be shown in DOM 
    blanks = wordArr.length;

    console.log(blanks);


}

function grabImg(){
   
    for (var i=0; i < group.length; i++) {

        if(group[i].name === playingWord){

            var image = group[i].image;

            console.log(image);
            return image;
        }
    }

}








//eliminates repeating code or resetting the game
function dryEliminator() {

    //sets everything to initial status so page refresh is not n eeded
    letterGuessed = 0;
    correctGuesses = 0;
    lives = 15;

    wrongLetters = [];
    underscoreDisplay = [];
    letterChecker = ['a', 'b', 'c',
        'd', 'e', 'f',
        'g', 'h', 'i',
        'j', 'k', 'l',
        'm', 'n', 'o',
        'p', 'q', 'r',
        's', 't', 'u',
        'v', 'w', 'x',
        'y', 'z'
    ];



  
}



function init() {

    wordPicker();

    dryEliminator();


//generate word in the DOM MODEL
    for (var i = 0; i < blanks; i++) {

        underscoreDisplay.push('_');
        wordToGuess.innerHTML = underscoreDisplay.join(' ');
  

    }

    livesRemaining.innerHTML = lives;
    wrongGuesses.innerHTML = wrongLetters;

    while (showImg.firstChild) showImg.removeChild(showImg.firstChild)


    console.log(playingWord);
    console.log(wordArr);
    console.log(blanks);
    console.log(underscoreDisplay);


}



function compare(userGuess) {

    //check to see if playing word was in user array
    if (playingWord.indexOf(userGuess) > -1) {

        for (var i = 0; i < blanks; i++) {
            //Fills in right index with user key
            if (wordArr[i] === userGuess) {
                //add to all of the dom elements
                correctGuesses++;
                underscoreDisplay[i] = userGuess;
                wordToGuess.innerHTML = underscoreDisplay.join(' ');
            }
        }

    } else {
        //when user guesses wrong
        //push wrong gues into wrong guess array
        wrongLetters.push(userGuess);
        //loses a life
        lives--;
        //Changes HTML
        livesRemaining.innerHTML = lives;
        wrongGuesses.innerHTML = wrongLetters;
    }

}



function gameEnder() {
    // When number blanks if filled with right words then you win
    if (correctGuesses === blanks) {

        var display = grabImg();

        showImg.innerHTML = '<img class="img-fluid" src="images/' + display + '">';




        alert('Click Reset Button');

     
    }
    // When number of Guesses reaches 0 then You lose
    else if (lives === 0) {

        alert('You Lose');
        reset();
    }
}



function reset() {

    wordPicker();

    dryEliminator();

    init();

}




