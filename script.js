let startPauseButton = document.getElementById('startPause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let millisecondsDisplay = document.getElementById('milliseconds');
let lapsList = document.getElementById('lapsList');
let backgroundVideo = document.getElementById('backgroundVideo');

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let previousTime = 0;

function updateDisplay() {
    let now = Date.now();
    elapsedTime = previousTime + (now - startTime);

    let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}
function toggleStartPause() {
    if (!isRunning) {
        startPauseButton.checked = true; // Set the switch to "on" position
        backgroundVideo.play();
        startPause();
    }
}

document.getElementById('at-item').animate([
    {
        letterSpacing: "1em",
        filter: "blur(12px)",
        opacity: 0,
        offset: 0
    },
    {
        filter: "blur(0)",
        opacity: 1,
        offset: 1
    }
], {				 
    duration: 1000,
    easing: 'linear',
    delay: 0,
    iterations: 1,
    direction: 'normal',
    fill: 'none'
});

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        previousTime += Date.now() - startTime;
        startPauseButton.checked = false; // Reset the switch to "off" position
        backgroundVideo.pause();
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startPauseButton.checked = true; // Set the switch to "on" position
        backgroundVideo.play();
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    previousTime = 0;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    startPauseButton.checked = false; // Reset the switch to "off" position
    lapsList.innerHTML = '';
    backgroundVideo.pause();
    backgroundVideo.currentTime = 0;
}

function recordLap() {
    if (isRunning) {
        let lapTime = document.createElement('li');
        lapTime.textContent = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        lapsList.appendChild(lapTime);
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
