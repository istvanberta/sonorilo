let ringTimes = [
    new Time(7, 40),
    new Time(7, 50),
    new Time(8, 35),
    new Time(8, 40),
    new Time(9, 25),
    new Time(9, 35),
    new Time(10, 20),
    new Time(10, 35),
    new Time(11, 20),
    new Time(11, 25),
    new Time(12, 10),
    new Time(12, 15),
    new Time(13, 00)
];

let queue = [];
let id = undefined;
let ringtone = new Audio('https://cdn.istvanberta.eu/sonorilo/kygo-firestone.mp3');

const startButton = document.querySelector('#start-button');
const timerDisplay = document.querySelector('#timer-display');

function turnOn() {
    buildQueue();
    let timeLeft = Math.floor((queue[0] - Date.now()) / 1000);
    timerDisplay.textContent = secondsToText(timeLeft);
    id = setInterval(() => {
        timeLeft = Math.floor((queue[0] - Date.now()) / 1000);
        timerDisplay.textContent = secondsToText(timeLeft);
        if (timeLeft <= 0) {
            ringtone.play();
            shiftQueue();
            timeLeft = Math.floor((queue[0] - Date.now()) / 1000);
        }
    }, 1000);
}

function turnOff() {
    clearInterval(id);
    clearQueue();
}

function buildQueue() {
    for (ringTime of ringTimes) {
        ringDate = ringTime.toDate();
        if (ringDate <= Date.now()) {
            ringDate.setDate(ringDate.getDate() + 1);
        }
        queue.push(ringDate);
    }
    queue.sort((a, b) => a - b);
}

function shiftQueue() {
    date = queue.shift();
    date.setDate(date.getDate() + 1);
    queue.push(date);
}

function clearQueue() {
    queue = [];
}

function secondsToText(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    if (!h) {
        return zeroPad(m) + ':' + zeroPad(s);
    } else {
        return zeroPad(h) + ':' + zeroPad(m) + ':' + zeroPad(s);
    }
}

function zeroPad(number) {
    return ('0' + number).slice(-2);
}

let turnedOn = false;

function onOff() {
    if (!turnedOn) {
        turnOn();
        turnedOn = true;
        startButton.textContent = 'Turn OFF';
    } else {
        turnOff();
        turnedOn = false;
        startButton.textContent = 'Turn ON';
    }
}

startButton.addEventListener('click', onOff);
