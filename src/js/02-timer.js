import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datetimePicker = document.getElementById("datetime-picker");

const options = {
  enableTime: true, // Enables time picker
  time_24hr: true, // Displays time picker in 24 hour mode without AM/PM selection when enabled.
  defaultDate: new Date(), // Sets current date
  minuteIncrement: 1, // Adjusts the step for the minute input (incl. scrolling)
  onClose(selectedDates) {
    // Function(s) to trigger on every time the calendar is closed
    handleDateSelection(selectedDates);
  },
};

flatpickr(datetimePicker, options);

function handleDateSelection(selectedDates) {
  const selectedDate = selectedDates[0]; // Parametr selectedDates to tablica wybranych dat, dlatego bierzemy z niej pierwszy element.
  if (selectedDate < new Date()) {
    Notiflix.Notify.failure("Please choose a date in the future"); // komunikat wywoływany przy użyciu biblioteki notiflix
    return;
  }
  document.querySelector("[data-start]").disabled = false; // uaktywnij przycisk start
  document.querySelector("[data-start]").addEventListener("click", () => {
    clearInterval(timerId); // zatrzymanie wykonywania funkcji z parametrem "timerId"
    startTimer(selectedDate); // wywołanie funkcji z parametrem "selectedDate"
  });
}

let timerId;

function startTimer(endTime) {
  timerId = setInterval(() => {
    // wywołanie funkcji setInterval z potwarzaniem kodu co sekundes
    const now = new Date().getTime(); // Metoda getTime() zwraca liczbową reprezentację daty (timestamp) - liczbę milisekund, które minęły od północy 1 stycznia 1970 roku.
    const distance = endTime - now; //  zmienna, która przechowuje różnicę pomiędzy dwiema datami

    if (distance < 0) {
      clearInterval(timerId);
      document.querySelector("[data-days]").innerText = "00"; // kiedy funkcja osiagnie 0 zastap liczniki wartoscią "00"
      document.querySelector("[data-hours]").innerText = "00";
      document.querySelector("[data-minutes]").innerText = "00";
      document.querySelector("[data-seconds]").innerText = "00";
      return;
    }

    function addLeadingZero(value) {
      return String(value).padStart(2, "0"); // funkcja robiąca stringa z liczby, dodaje zero tworząc max ciąg 2 znaków
    }

    const { days, hours, minutes, seconds } = convertMs(distance);

    const formattedDays = addLeadingZero(days);
    const formattedHours = addLeadingZero(hours);
    const formattedMinutes = addLeadingZero(minutes);
    const formattedSeconds = addLeadingZero(seconds);

    const formattedTime = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`; // przykład wyniku funkcji to "05:12:04:37"

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
  const days = Math.floor(ms / day); // zaokręglenie w dół do najbliższej całkowitej liczby, zwraca liczbę pełnych dni
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
  const daysElem = document.querySelector("[data-days]");
  const hoursElem = document.querySelector("[data-hours]");
  const minutesElem = document.querySelector("[data-minutes]");
  const secondsElem = document.querySelector("[data-seconds]");

  const [days, hours, minutes, seconds] = timeString.split(":"); // Rozdzielenie ciągu "05:12:04:37" i przypisanie wartości do odpowiednich zmiennych

  daysElem.innerText = days; // zastępienie 00 w div days wartości z lini kodu wyżej
  hoursElem.innerText = hours;
  minutesElem.innerText = minutes;
  secondsElem.innerText = seconds;
}
