import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/common.css'

const options = {
  minDate: '1970-01-01',
  maxDate: new Date().fp_incr(90),
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    countdown.selectedDates = selectedDates[0].getTime();
    correctSelectionData ();
  },
};

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataface: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled','disabled');

const countdown = {
  selectedDates: null,
  intervalID: null,
  isActive: false,
  onlineTime: 0,
  ms: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.onlineTime = Date.now();
    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      this.ms =
        Math.floor((this.selectedDates - this.onlineTime) / 1000) -
        Math.floor((currentTime - this.onlineTime) / 1000);
      console.log(this.ms);
      this.countdownValue();
      this.changeDaysHoursMinutesSeconds();
      this.finishCountdown();
    }, 1000);
  },

  countdownValue() {
    this.seconds = convertMs(this.ms).seconds;
    this.minutes = convertMs(this.ms).minutes;
    this.hours = convertMs(this.ms).hours;
    this.days = convertMs(this.ms).days;
  },

  changeDaysHoursMinutesSeconds() {
    refs.seconds.textContent = this.seconds.toString().padStart(2, 0);
    refs.minutes.textContent = this.minutes.toString().padStart(2, 0);
    refs.hours.textContent = this.hours.toString().padStart(2, 0);
    refs.days.textContent = this.days.toString().padStart(2, 0);
  },

  finishCountdown() {
    if (this.ms === 0) {
      clearInterval(this.intervalID);
      this.isActive = false;
    }
  },
};

const onStartCountdown = () => {
    countdown.start();
    offActiveBtnStart();
};

const correctSelectionData = () => {
  const onlineTime = Date.now();
  if (onlineTime > countdown.selectedDates) {
    window.alert('Please choose a date in the future');
    return;
  };
  refs.startBtn.removeAttribute('disabled','disabled');
};

const offActiveBtnStart = () => {
  if (countdown.isActive) {
    refs.startBtn.setAttribute('disabled','disabled');
    };
};

offActiveBtnStart();

refs.startBtn.addEventListener('click', onStartCountdown);

flatpickr('#datetime-picker', options);

const convertMs = ms => {
  const second = 1;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
