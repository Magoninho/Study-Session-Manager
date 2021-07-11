class Session {
	constructor(minutes, seconds) {
		this.minutes = minutes;
		this.seconds = seconds;
		this.sessionTime = ((minutes * 60) + seconds);
		this.finished = false;
	}

	tick() {
		this.minutes = Math.floor(this.sessionTime / 60);
		this.seconds = this.sessionTime - (this.minutes * 60);
		this.sessionTime--;

		if (this.seconds < 10) {
			this.seconds = `0${this.seconds}`;
		}
	}

	isFinished() {
		return this.sessionTime === 0;
	}
}