let totalTime = 0;
let sessions  = 0;
let minutes   = 0;
let seconds   = 0;
let timer;

function start() {
	sessions  = document.getElementById("sessions").value;
	minutes   = document.getElementById("session_minutes").value;
	breakTime = document.getElementById("break_minutes").value;

	totalTime = (minutes * 60) + seconds;
	// expected args: number of sessions, session minutes and break minutes
	timer = new StudyTimer(sessions, minutes, 3, 1);
	timer.start();
}







// function tick() {
// 	minutes = Math.floor(totalTime / 60);
// 	seconds = totalTime - (minutes * 60);
// 	totalTime--;
// 	if (seconds < 10) {
// 		seconds = `0${seconds}`;
// 	}
// }
