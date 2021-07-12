class Session {
	constructor(minutes/*, seconds*/) {
		this.minutes = minutes;
		this.seconds = /*seconds*/0;
		this.sessionTime = ((minutes * 60) + seconds);
	}

	tick() {
		this.minutes = Math.floor(this.sessionTime / 60);
		this.seconds = this.sessionTime - (this.minutes * 60);
		
		if (this.seconds < 10) {
			this.seconds = `0${this.seconds}`;
		}
		this.sessionTime--;
		console.log(this.sessionTime);
	}

	isFinished() {
		return this.sessionTime <= 0;
	}
}