let startTime;
let elapsedTime = 0;
let timerInterval;

function startPause() {
    if (!startTime) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        document.getElementById("startPause").textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        startTime = null;
        document.getElementById("startPause").textContent = "Start";
    }
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    document.getElementById("display").textContent = 
        `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

function padTime(value) {
    return value < 10 ? `0${value}` : value;
}

function lap() {
    const lapTime = elapsedTime;
    const lapList = document.getElementById("lapList");
    const lapItem = document.createElement("li");
    lapItem.textContent = formatTime(lapTime);
    lapList.appendChild(lapItem);
}

function reset() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    displayTime(elapsedTime);
    document.getElementById("startPause").textContent = "Start";
    document.getElementById("lapList").innerHTML = "";
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

document.getElementById("startPause").addEventListener("click", startPause);
document.getElementById("lap").addEventListener("click", lap);
document.getElementById("reset").addEventListener("click", reset);
