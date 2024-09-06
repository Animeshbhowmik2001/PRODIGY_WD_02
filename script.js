let startTime, updatedTime, difference, tInterval;
let running = false;
let lapsContainer = document.getElementById('laps');

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
        lapButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00.000";
    lapsContainer.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}

function recordLap() {
    if (running) {
        let lapTime = display.innerHTML;
        let lapDiv = document.createElement('div');
        lapDiv.innerHTML = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapDiv);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let timeElapsed = new Date(difference);

    let minutes = timeElapsed.getUTCMinutes();
    let seconds = timeElapsed.getUTCSeconds();
    let milliseconds = timeElapsed.getUTCMilliseconds();

    display.innerHTML = 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds + ':' + 
        (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds;
}

// Initialize button states
pauseButton.disabled = true;
lapButton.disabled = true;
