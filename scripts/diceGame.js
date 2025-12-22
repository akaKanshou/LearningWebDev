var leftVal = (Math.floor(Math.random() * 6) + 1);
var rightVal = (Math.floor(Math.random() * 6) + 1);

if (leftVal > rightVal) {
    document.querySelector("h1").textContent = "Player 1 Wins!";
} else if (leftVal < rightVal) {
    document.querySelector("h1").textContent = "Player 2 Wins!";
} else {
    document.querySelector("h1").textContent = "Draw!";
}

document.querySelector("#diceCardLeft img").setAttribute("src", "./images/dice-six-faces-" + leftVal + ".png");
document.querySelector("#diceCardRight img").setAttribute("src", "./images/dice-six-faces-" + rightVal + ".png");