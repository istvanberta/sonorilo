class Time {
    constructor(hours, minutes) {
        this.hours = hours;
        this.minutes = minutes;
    }

    toDate() {
        let date = new Date();
        date.setHours(this.hours, this.minutes, 0, 0);
        return date;
    }

    inMinutes() {
        return this.hours * 60 + this.minutes;
    }

    [Symbol.toPrimitive](hint) {
        if (hint == 'string') {
            return this.zeroPad(this.hours) + ':' + this.zeroPad(this.minutes);
        } else {
            return this.inMinutes();
        }
    }

    zeroPad(number) {
        return ('0' + number).slice(-2);
    }
}
