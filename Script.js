const targetDateInput = document.getElementById("targetDate");
const startBtn = document.getElementById("startBtn");
const countdownDisplay = document.getElementById("countdownDisplay");
const message = document.getElementById("message");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let countdownInterval = null;

function updateCountdown() {
 const targetDate = new Date(targetDateInput.value).getTime();
 const now = new Date().getTime();
 const distance = targetDate - now;

 //It the distance is less than 0, it means the countdown has ended, so we clear the nterval, hide the countdown display, and show a message indicating that the countdown has ended.
 if (distance < 0) {
 clearInterval(countdownInterval);
 countdownDisplay.style.display = "none";
 message.textContent = "⏰ Time's up! The countdown has ended.";
 message.className = "message complete";
 return;
 }

 // This is to calculate the days, hours, minutes, and secondes left until the target date. It uses the distance in milliseconds and converts it into days, hours, minutes, and seconds.
 const days = Math.floor(distance / (1000 * 60 * 60 * 24));
 const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
 const seconds = Math.floor((distance % (1000 *60)) / 1000);

 // This is to update the countdown display with the calculated days, hours, minutes, and seconds, it uses the padStart method to ensure that the numbers are always displayed with two digits, adding a leading zero if necessary.
 daysEl.textContent = String(days).padStart(2, "0");
 hoursEl.textContent = String(hours).padStart(2, "0");
 minutesEl.textContent = String(minutes).padStart(2, "0");
 secondsEl.textContent = String(seconds).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
 if (!targetDateInput.value) {
 message.textContent = "Please select a date and time.";
 message.className = "message error";
 return;
 }

 // This is to clear any existing intervals. 
 if (countdownInterval) {
 clearInterval(countdownInterval);
 }

 //This is to reset message.
 message.textContent = "";
 message.className = "message";

 //Show countdown display.
 countdownDisplay.style.display = "flex";

 updateCountdown();

 countdownInterval = setInterval(updateCountdown, 1000);
});

// This is to set minutes date to today.
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
targetDateInput.min = now.toISOString().slice(0, 16);