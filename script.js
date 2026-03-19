const TRACK_LENGTH = 70; //sometimes constant variables are all caps

const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");
const trackEl = document.getElementById("track");

let tortoisePosition = 1;
let harePosition = 1;
let raceIntervalId = null;
let stepCount = 0;

startBtn.addEventListener("click", startRace);

//start the race with a button click
//trigger the move every second (setInterval())
function startRace() {
  messageEl.textContent = "BANG! AND THEY'RE OFF!!!!";

  startBtn.disabled = true;

  //avoid double tracks
  if (raceIntervalId !== null) {
    clearInterval(raceIntervalId);
  }

  raceIntervalId = setInterval(raceStep, 1000);
}

function raceStep() {
  stepCount++;
  //move the tortoise randomly (Math.random())
  moveTortoise();
  //move the hare randomly (Math.random())
  moveHare();
  //fix position if they go off the range (0 - 70)
  clampPositions();
  //when one of the animals reach 70+, show result message
  if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
    clearInterval(raceIntervalId);
    raceIntervalId = null;
    showResult();
    startBtn.disabled = false;
  }
  //render the track with the new positions
  renderTrack();
}

function moveTortoise() {
  let roll = Math.floor(Math.random() * 10) + 1;

  if (roll >= 1 && roll <= 5) {
    //1 - 5 fast plod
    tortoisePosition += 4;
  } else if (roll >= 6 && roll <= 7) {
    //6 - 7 slip
    tortoisePosition -= 5;
  } else {
    //8 - 10 slow plod
    tortoisePosition += 1;
  }
}

function moveHare() {
  let roll = Math.floor(Math.random() * 10) + 1;

  if (roll >= 1 && roll <= 2) {
    //1 - 2 sleep
    harePosition -= 2;
  } else if (roll >= 3 && roll <= 4) {
    //3 - 4 big hop
    harePosition += 9;
  } else if (roll === 5) {
    //5 big slip
    harePosition += 0;
  } else {
    //6 - 10 small hop
    harePosition += 2;
  }
}

function clampPositions() {
  tortoisePosition = Math.min(TRACK_LENGTH, Math.max(1, tortoisePosition));
  harePosition = Math.min(TRACK_LENGTH, Math.max(1, harePosition));
}

function renderTrack() {
  trackEl.innerHTML = "";

  for (let i = 1; i <= TRACK_LENGTH; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");

    let isTortoiseHere = tortoisePosition === i;
    let isHareHere = harePosition === i;

    if (isTortoiseHere && isHareHere) {
      cell.classList.add("both");
      cell.textContent = "🔥";
    } else if (isTortoiseHere) {
      cell.classList.add("tortoise");
      cell.textContent = "🐢";
    } else if (isHareHere) {
      cell.classList.add("hare");
      cell.textContent = "🐇";
    }

    trackEl.appendChild(cell);
  }
}

function showResult() {
  if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH) {
    messageEl.textContent = "It's a tie!";
  } else if (tortoisePosition >= TRACK_LENGTH) {
    messageEl.textContent = "TORTOISE WINS! YAY!!!";
  } else if (harePosition >= TRACK_LENGTH) {
    messageEl.textContent = "HARE WINS, Yuck!";
  } else {
    messageEl.textContent = "";
  }
}

//Initial render of the empty track
renderTrack();
