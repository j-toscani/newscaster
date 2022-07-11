import PollSchedule from "../lib/PollSchedule.ts";

class ScheduleRunner {
    _stop: boolean;
    lastUpdate: number;
    schedules: PollSchedule[]

    constructor(schedules: PollSchedule[]) {
        this.lastUpdate = Date.now();
        this.schedules = schedules;
        this._stop = false;
    }

    get nextUpdateIn() {
        return this.lastUpdate + 1000 - Date.now();
    }

    private _schedule() {
        setTimeout(() => {
            this.lastUpdate = Date.now();
            this.schedules.forEach(schedule => {
                const shouldPoll = schedule.check(this.lastUpdate);

                if(shouldPoll) {
                    schedule.connector.poll();
                }
            })

            if(!this.stop) {
                this._schedule();
            }
        }, this.nextUpdateIn)
    }

    run() {
        this._schedule();
    }

    stop() {
        this._stop = true;
    }
}