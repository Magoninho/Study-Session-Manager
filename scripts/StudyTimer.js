class StudyTimer {
	constructor(sessions, minutes, seconds, breakMinutes) {
		this.sessions  = sessions;
		this.minutes   = minutes;
		this.seconds   = seconds;
		this.breakMinutes = breakMinutes;
		this.totalTime = this.sessions * ((minutes * 60) + seconds);
		this.breaks = this.sessions - 1;
		this.currentSession = 0;
		this.sessions_array = [];

		for (let i = 0; i < this.sessions; i++) {
			this.sessions_array.push(new Session(this.minutes, this.seconds));
		}
	}


	start() {
		console.log(`session ${this.currentSession}`);
		console.log(this.sessions_array);

		let currentSession = this.sessions_array[this.currentSession];
		let interval = setInterval(() => {
			if (currentSession.isFinished()) {
				clearInterval(interval);
				if (this.breaks != 0)
					this.breakTime();
			}
			currentSession.tick();
			this.render(currentSession.minutes, currentSession.seconds, "Session");
			console.log(`${currentSession.minutes}:${currentSession.seconds}`);

		}, 1000);
	}

	breakTime() {
		// let breakTime = (this.breakMinutes * 60);
		// let breakTime = this.breakMinutes * 60;
		let breakTime = 2;

		let breakInterval = setInterval(() => {
			let breakMinutes = Math.floor(breakTime / 60);
			let breakSeconds = breakTime - (breakMinutes * 60);

			if (breakSeconds < 10)
				breakSeconds = `0${breakSeconds}`;

			this.render(breakMinutes, breakSeconds, "Break Time")
			console.log(`break time! ${breakMinutes}:${breakSeconds}`);
			if (breakTime <= 0) { 
				clearInterval(breakInterval);
				console.log("Break time finished!")	
				this.nextSession();
				if (this.sessions_array[this.currentSession] === undefined) {
					console.log("out of sessions");
					return;
				}
				this.start();
			}
			breakTime--;
			
		}, 1000);
		this.breaks--;
	}

	tick() {
		this.minutes = Math.floor(this.totalTime / 60);
		this.seconds = this.totalTime - (this.minutes * 60);
		this.totalTime--;

		if (this.seconds < 10) {
			this.seconds = `0${this.seconds}`;
		}

		

	}

	render(minutes, seconds, TimerName) {
		// TODO: ADD TYPE TO ARGS
		document.body.innerHTML = '';
		let string = `
		<!DOCTYPE html>
		<html lang="en">

		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>Study Timer</title>
			<link rel="stylesheet" href="styles/style.css">
		</head>

		<body>
		<div class="clock">
			<h1>${TimerName} ${this.currentSession + 1}</h1>
			<h1>${minutes}:${seconds}</h1>
		</div>
		</body>

		</html>
		
		`;
		document.write(string);

		// if type == break bla bla bla
	}

	nextSession() {
		this.currentSession++;
	}
	
	isFinished() {
		return this.totalTime === 0;
	}
}