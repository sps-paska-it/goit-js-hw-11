import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let selectedDates = 0;
const options = {
  minDate: '1970-01-01',
  maxDate: new Date().fp_incr(90),
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
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

const timer = {
  intervaID: null,
  isActive: false,
  selectedDates: 0,
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
    this.selectedDates = new Date(refs.dataface.value).getTime(),
    this.onlineTime = Date.now();
    this.intervaID = setInterval(() => {
      const currentTime = Date.now();
      this.ms = this.selectedDates - this.onlineTime - (currentTime - this.onlineTime);
      this.seconds = convertMs(this.ms).seconds;
      this.minutes = convertMs(this.ms).minutes;
      this.hours = convertMs(this.ms).hours;
      this.days = convertMs(this.ms).days;

      refs.seconds.textContent = this.seconds.toString().padStart(2, 0);
      refs.minutes.textContent = this.minutes.toString().padStart(2, 0);
      refs.hours.textContent = this.hours.toString().padStart(2, 0);
      refs.days.textContent = this.days.toString().padStart(2, 0);
      //   changeDaysHoursMinutesSeconds();
    }, 1000);
  },

  //   changeDaysHoursMinutesSeconds() {
  //   },

  stop() {
    clearInterval(this.intervaID);
    this.isActive = false;
  },
};
const onStartReadout = () => {
    const selectedTime = new Date(refs.dataface.value).getTime();
    const onlineTime = Date.now();
    if (onlineTime < selectedTime) {
        timer.start();
    }   
};

refs.startBtn.addEventListener('click', onStartReadout);

flatpickr('#datetime-picker', options);

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
