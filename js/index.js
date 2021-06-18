const refs = {
  selector: document.querySelector("#timer-1"),
  days: document.querySelector("[data-value=days]"),
  hours: document.querySelector("[data-value=hours]"),
  mins: document.querySelector("[data-value=mins]"),
  seconds: document.querySelector("[data-value=secs]"),
};

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.intervalId = null;
    this.targetDate = targetDate.getTime();
    this.isActive = false;
    this.onTick = onTick;
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const deltaTime = this.targetDate - now;

      if (deltaTime <= 0) {
        this.stop();
        return;
      }
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  // Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

// создаем новый класс
const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("December 31, 2021 23:59:59"),
  onTick: updateClockface,
});

timer.start();

function updateClockface({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.seconds.textContent = `${secs}`;
}
