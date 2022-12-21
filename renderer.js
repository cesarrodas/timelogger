/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const GLOBAL_TIMERS = [];

class Timer {
  constructor(){
    this.interval;
    this.seconds = 0;
    this.display();
    this.started = false;
  }
  
  timerFormatter(){
    let time = this.seconds;
    let hours = Math.floor(time/3600);
    let minutes = Math.floor(time/60 % 60);
    let seconds = time % 60;
    let result = ""
    hours >= 10 ? result += hours + ":" : result += "0" + hours + ":";
    minutes >= 10 ? result += minutes + ":" : result += "0" + minutes + ":";
    seconds >= 10 ? result += seconds : result += "0" + seconds;
    return result;
  }
  
  display(){
    let container = document.querySelector(".main-container");
    this.container = document.createElement("div");
    this.container.classList.add("timer-container");
    this.task = document.createElement("input");
    this.task.classList.add("form-control");
    this.timer = document.createElement("p");
    this.timer.innerText = "00:00:00";
    this.container.append(this.task);
    this.container.append(this.timer);
    container.append(this.container);

    this.startButton = document.createElement("button");
    this.startButton.classList.add("timer-button");
    this.startButton.innerText = "Start";
    this.startButton.addEventListener("click",() => {
      if(!this.interval){        
        this.startButton.innerText = "Log";
        this.interval = setInterval(() => {
          this.seconds++;
          this.timer.innerText = this.timerFormatter();
        }, 1000);
      } else {
        clearInterval(this.interval);
      } 
    });
    this.container.append(this.startButton);

    this.include = document.createElement("INPUT");
    this.include.setAttribute("type", "checkbox");
    this.container.append(this.include);
  }
}

let time1 = new Timer();
GLOBAL_TIMERS.push(time1);

let newtimer = document.querySelector("#newTimer");
newtimer.addEventListener("click", () => {
  let newtim = new Timer();
  GLOBAL_TIMERS.push(newtim);
})