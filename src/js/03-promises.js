const createPromise = (position, delay) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve ({ position, delay });
      } else {
        reject ({ position, delay });
      }
    },delay);
  }).then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  })
};

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name$="delay"]'),
  step: document.querySelector('input[name$="step"]'),
  amount: document.querySelector('input[name$="amount"]'),
};

const onSubmitForm = (e) => {
e.preventDefault();
const amount = Number(refs.amount.value);
const step = Number(refs.step.value);
let delay = Number(refs.firstDelay.value);
for (let i = 1; i <= amount; i++) {
  createPromise(i, delay)
  delay += step;
}
};

refs.form.addEventListener('submit', onSubmitForm);
