import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datetimePicker = document.getElementById("datetime-picker");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(), // domyślna data
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

    function addLeadingZero(value) {
      return String(value).padStart(2, "0");
    }

    const { days, hours, minutes, seconds } = convertMs(distance);

    const formattedDays = addLeadingZero(days);
    const formattedHours = addLeadingZero(hours);
    const formattedMinutes = addLeadingZero(minutes);
    const formattedSeconds = addLeadingZero(seconds);

    const formattedTime = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    updateTimerUI(formattedTime);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.querySelector("[data-start]").disabled = true;

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
