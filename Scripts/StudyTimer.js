class StudyTimer {
	constructor(sessions, minutes, /*seconds,*/ breakMinutes) {
		this.sessions = sessions;
		this.currentMinutes = minutes;
		this.currentSeconds = 0;
		this.paused = false;
		this.breakMinutes = breakMinutes;
		this.breaks = this.sessions - 1;
		this.sessionIndex = 0;
		this.sessionsArray = [];
		for (let i = 0; i < this.sessions; i++) {
			this.sessionsArray.push(new Session(this.currentMinutes, this.currentSeconds));
		}

		// custom methods
		this.onSessionFinish = function () { };
		this.onBreakFinish = function () { };
		this.onAllFinish = function () { };
	}


	start() {
		try {
			if (this.currentMinutes <= 0) {
				throw "Session minutes should be greater than 0";
			} else if (this.breakMinutes <= 0) {
				throw "Break minutes should be greater than 0";
			} else if (this.sessions <= 0) {
				throw "You should specify more than 0 sessions";
			}
			this.currentSession = this.sessionsArray[this.sessionIndex];
			document.getElementById('setup').style.display = 'none';
			document.getElementById('clock').style.display = 'initial';
			let interval = setInterval(() => {
				document.getElementById('controller').style.display = 'initial';
				if (!this.paused) {

					if (this.currentSession.isFinished()) {
						clearInterval(interval);
						this.onSessionFinish();
						if (this.breaks != 0) {
							this.breakTime();
							return;
						}
						if (this.sessionsArray[this.sessionIndex + 1] == undefined) {
							this.onAllFinish();
							this.renderFinish();
							return;
						}
					}

					this.currentSession.tick();
					this.currentMinutes = this.currentSession.minutes;
					this.currentSeconds = this.currentSession.seconds;
				}
				this.render("Session");
				// console.log(`${this.currentSession.minutes}:${this.currentSession.seconds}`);

			}, 1000);
		} catch (err) {
			alert(err);
		}
	}

	pause() {
		this.paused = !this.paused;
		document.getElementById('play-btn').src = this.paused ? 'Images/Play.svg' : 'Images/Pause.svg';
	}

	breakTime() {
		let breakTime = this.breakMinutes * 60;
		// let breakTime = 2;

		let breakInterval = setInterval(() => {
			if (!this.paused) {
				this.currentMinutes = Math.floor(breakTime / 60);
				this.currentSeconds = breakTime - (this.currentMinutes * 60);

				if (this.currentSeconds < 10)
					this.currentSeconds = `0${this.currentSeconds}`;

				this.render("Break Time");
				// console.log(`break time! ${this.currentMinutes}:${this.currentSeconds}`);
				if (breakTime <= 0) {
					clearInterval(breakInterval);
					// console.log("Break time finished!");
					this.onBreakFinish();
					this.nextSession();
					this.start();
				}
				breakTime--;
			}
		}, 1000);
		this.breaks--;
	}

	render(text) {
		document.getElementById('timer-title').innerHTML = `${text} ${this.sessionIndex + 1}`;
		document.getElementById('timer').innerHTML = `${this.currentMinutes}:${this.currentSeconds}`;
	}

	renderFinish() {
		document.getElementById('clock').style.display = 'none';
		document.getElementById('controller').style.display = 'none';
		document.getElementById('finished').style.display = 'initial';
	}

	nextSession() {
		this.sessionIndex++;
	}
}