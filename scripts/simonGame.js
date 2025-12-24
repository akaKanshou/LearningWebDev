// initial state
$("h1").text("Press A Key to Start");
var gameStarted = false, list = [], indexOfList = 0;
var colors = ["blue", "green", "red", "yellow"];

// setting up environment

const audioRack = {
    blue: new Audio("./sounds/blue.mp3"), 
    green: new Audio("./sounds/green.mp3"), 
    red: new Audio("./sounds/red.mp3"), 
    yellow : new Audio("./sounds/yellow.mp3")
}

const pressAnimationTimeoutHandler = (element) => {
    element.classList.remove("pressed");
}

const pressAnimationTimeoutHandlerJQ = (element) => {
    element.removeClass("pressed");

    // console.log("Done");
}

// setting up game loop

function startLevel() {
    $("h1").text("Level " + (list.length + 1));

    let next = Math.floor(Math.random() * 4);
    list.push(next);
    
    // console.log(list);

    $(".".concat(colors[next])).addClass("pressed");
    setTimeout(() => pressAnimationTimeoutHandlerJQ($(".".concat(colors[next]))), 175);

    indexOfList = 0;
}

function levelFailed() {
    list = [];
    $("h1").text("Game Over, Press Any Key to Restart");
    gameStarted = false;
}

$(document).keypress(function (event) {
    if (gameStarted) return;
    
    gameStarted = true;
    startLevel();
});


$(".btn").click(function (event) {
    if (!gameStarted) return;

    this.classList.add("pressed");
    setTimeout(() => pressAnimationTimeoutHandler(this), 100);

    audioRack[this.classList[1]].play();

    // console.log(this.classList[1], colors[list[indexOfList]], indexOfList);

    if (this.classList[1] === colors[list[indexOfList]]){
        indexOfList++;
        if (indexOfList === list.length) setTimeout(startLevel, 500);
    }
    else {
        levelFailed();
        return;
    }
});