const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay = false
let secCounter = 0;
let min;
let sec;
let centiSec;
let centiCounter = 0;
let minCounter = 0;
let lapItem = 0;
isReset = false;

const toggleButton = () =>{
    lapButton.classList.remove("hidden")
    resetButton.classList.remove("hidden")
}

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = 'Pause';
        bg.classList.add("animation-bg");

        // Start the minute interval
        min = setInterval(() => {
            if (secCounter === 59) {
                // Reset the second counter when it reaches 59
                secCounter = 0;
                // Increment the minute counter
                minute.innerHTML = `${++minCounter} :`;
            }
        }, 60 * 1000);

        // Start the second interval
        sec = setInterval(() => {
            if (secCounter === 59) {
                // Reset the second counter when it reaches 59
                secCounter = 0;
                // Increment the minute counter
                minute.innerHTML = `${++minCounter} :`;
            } else if (secCounter >= 60) {
                // Reset seconds to 0 when it reaches 60 or more
                secCounter = 0;
                // Increment the minute counter
                minute.innerHTML = `${++minCounter} :`;
            }
            // Increment the second counter
            second.innerHTML = `&nbsp;${++secCounter} :`;
        }, 1000);

        // Start the centisecond interval
        centiSec = setInterval(() => {
            if (centiCounter === 99) {
                // Reset the centisecond counter when it reaches 99
                centiCounter = 0;
            }
            // Increment the centisecond counter
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);

        // Update play state and reset state
        isPlay = true;
        isReset = true;
    } else {
        // Pause button functionality
        playButton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec); // Clear the sec interval
        clearInterval(centiSec);
        isPlay = false;
        isReset = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
}
const reset = () =>{
    // Clear any existing interval
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSec);

    // Reset all counters to zero
    secCounter = 0;
    minCounter = 0;
    centiCounter = 0;

    // Update the displayed timer
    minute.innerHTML = '0 :';
    second.innerHTML = '&nbsp;0 :';
    centiSecond.innerHTML = '&nbsp;0';

    // Start the timer
    play();

    // Hide lap and reset buttons
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
}


const lap = () => {
const li = document.createElement("li");
const number = document.createElement("span");
const timeStamp = document.createElement("span");

li.setAttribute("class", "lap-item");
number.setAttribute("class","number");
timeStamp.setAttribute("class", "time-stamp");

number.innerText = `#${++lapItem}`;
timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

li.append(number, timeStamp);
laps.append(li);

clearButton.classList.remove("hidden");
}

const clearAll = () =>{
    laps.innerHTML = '';
    laps.append(clearButton);
    clearButton.classList.add("hidden");
    lapItem = 0;
}

playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener('click', clearAll);