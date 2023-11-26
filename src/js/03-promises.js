import Notiflix from "notiflix";

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // zatrzymanie domyślnego zachowania przeglądarki (odświeżenia strony po wysłaniu formularza)

  const delay = +this.elements.delay.value;
  const step = +this.elements.step.value;
  const amount = +this.elements.amount.value;

  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + step * (i - 1);
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // przekazanie promise i czas po ktorym ma sie wywolac
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
