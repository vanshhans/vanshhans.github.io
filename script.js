"use strict";

const p1 = document.querySelector(".player--0");
const p2 = document.querySelector(".player--1");
const p1Score = document.querySelector("#score--0");
const p2Score = document.querySelector("#score--1");
const p1CurrentScore = document.querySelector("#current--0");
const p2CurrentScore = document.querySelector("#current--1");
const dice = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const newDice = document.querySelector(".btn--new");
const holdDice = document.querySelector(".btn--hold");

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    p1.classList.toggle("player--active");
    p2.classList.toggle("player--active");
};
let currentScore, activePlayer, playing, scores;

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    dice.classList.add("hidden");
    p1.classList.remove("player--winner");
    p2.classList.remove("player--winner");
    p1.classList.add("player--active");
    p2.classList.remove("player--active");

    p1Score.textContent = 0;
    p2Score.textContent = 0;
    p1CurrentScore.textContent = 0;
    p2CurrentScore.textContent = 0;
}
init();

rollDice.addEventListener("click", () => {
    if (playing) {
        const diceNo = Math.floor(Math.random() * 6) + 1;
        dice.classList.remove("hidden");
        dice.src = `dice-${diceNo}.png`;
        if (diceNo !== 1) {
            currentScore += diceNo;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
});

holdDice.addEventListener("click", () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        console.log(scores);
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            dice.classList.add("hidden");
        }
        switchPlayer();
    }
});

newDice.addEventListener("click", init);