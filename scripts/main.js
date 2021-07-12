let sessions  = 0;
let minutes   = 0;
let seconds   = 0;
let timer;

function start() {
	sessions  = document.getElementById("sessions").value;
	minutes   = document.getElementById("session_minutes").value;
	breakTime = document.getElementById("break_minutes").value;

	// expected args: number of sessions, session minutes and break minutes
	timer = new StudyTimer(sessions, minutes, 3, 0);
	timer.start();
	// timer.onSessionFinish = () => {
	// 	alert("cool");
	// };
}
