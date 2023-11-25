const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
let timerId = null;

startButton.addEventListener("click", function () {
  startButton.disabled = true;
  timerId = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener("click", function () {
  clearInterval(timerId);
  startButton.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
