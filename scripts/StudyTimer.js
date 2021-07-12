class StudyTimer {
	constructor(sessions, minutes, seconds, breakMinutes) {
		this.sessions  = sessions;
		this.minutes   = minutes;
		this.seconds   = seconds;
		this.breakMinutes = breakMinutes;
		// this.totalTime = this.sessions * ((minutes * 60) + seconds);
		this.breaks = this.sessions - 1;
		this.sessionIndex = 0;
		this.sessions_array = [];
		for (let i = 0; i < this.sessions; i++) {
			this.sessions_array.push(new Session(this.minutes, this.seconds));
		}
		// custom methods
		this.onSessionFinish = undefined;
		this.onAllFinish = undefined;
	}


	start() {
		this.currentSession = this.sessions_array[this.sessionIndex];
		let interval = setInterval(() => {
			if (this.currentSession.isFinished()) {
				clearInterval(interval);
				if (this.onSessionFinish != undefined) {
					this.onSessionFinish();
				}
				if (this.breaks != 0) {
					this.breakTime();
					return;
				}
				if (this.sessions_array[this.sessionIndex + 1] == undefined) {
					if (this.onAllFinish != undefined) {
						this.onAllFinish();
					}
					this.renderFinish();
					return;
				}
			}
			this.currentSession.tick();
			this.render(this.currentSession.minutes, this.currentSession.seconds, "Session");
			
			// console.log(`${this.currentSession.minutes}:${this.currentSession.seconds}`);

		}, 1000);
	}

	breakTime() {
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
				console.log("Break time finished!");
				this.nextSession();
				this.start();
			}
			breakTime--;
			
		}, 1000);
		this.breaks--;
	}

	render(minutes, seconds, text) {
		// TODO: ADD TYPE TO ARGS
		document.body.innerHTML = `
			<div class="clock">
				<h1>${text} ${this.sessionIndex + 1}</h1>
				<h1>${minutes}:${seconds}</h1>
			</div>
		`;
	}

	renderFinish() {
		document.body.innerHTML = `
			<div class="clock">
				<h1>Finished!</h1>
			</div>
		`;
	}

	nextSession() {
		this.sessionIndex++;
	}
}