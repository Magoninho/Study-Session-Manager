let sessions  = 0;
let minutes   = 0;
let seconds   = 0;
let timer;

function start() {
	sessions  		= document.getElementById("sessions").value;
	minutes   		= document.getElementById("session_minutes").value;
	breakTime 		= document.getElementById("break_minutes").value;
	let alarm 		= document.getElementById("alarm");
	let finishAlarm = document.getElementById("finish");
	let breakFinishAlarm = document.getElementById("breakFinish");

	// expected args: number of sessions, session minutes and break minutes
	timer = new StudyTimer(sessions, minutes, breakTime);
	timer.start();
	// document.getElementById("alarm").play();
	timer.onSessionFinish = () => {
		alarm.play();
	};
	timer.onAllFinish = () => {
		alarm.load();
		finishAlarm.play();
	};

	timer.onBreakFinish = () => {
		breakFinishAlarm.volume = 0.5;
		breakFinishAlarm.play();
	}
}
