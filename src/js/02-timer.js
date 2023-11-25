import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datetimePicker = document.getElementById("datetime-picker");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates);
  },
};

flatpickr(datetimePicker, options);

function handleDateSelection(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate < new Date()) {
    Notiflix.Notify.failure("Please choose a date in the future");
    return;
  }
  document.querySelector("[data-start]").disabled = false;
  document.querySelector("[data-start]").addEventListener("click", () => {
    clearInterval(intervalId);
    startTimer(selectedDate);
  });
}

let intervalId;

function startTimer(endTime) {
  intervalId = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
      clearInterval(intervalId);
      document.querySelector(".timer").innerText = "Countdown Finished!";
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(distance);

    const formattedTime = `${formatTime(days)}:${formatTime(
      hours
    )}:${formatTime(minutes)}:${formatTime(seconds)}`;

    updateTimerUI(formattedTime);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

function updateTimerUI(timeString) {
  const [daysElem, hoursElem, minutesElem, secondsElem] = [
    document.querySelector("[data-days]"),
    document.querySelector("[data-hours]"),
    document.querySelector("[data-minutes]"),
    document.querySelector("[data-seconds]"),
  ];

  const [days, hours, minutes, seconds] = timeString.split(":");

  daysElem.innerText = days;
  hoursElem.innerText = hours;
  minutesElem.innerText = minutes;
  secondsElem.innerText = seconds;
}

document.querySelector("[data-start]").disabled = true;
