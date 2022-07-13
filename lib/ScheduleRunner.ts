import PollSchedule from "../lib/PollSchedule.ts";

export default class ScheduleRunner {
  lastUpdate: number;
  schedules: PollSchedule[];

  constructor(schedules: PollSchedule[]) {
    this.lastUpdate = Date.now();
    this.schedules = schedules;
  }

  get nextUpdateIn() {
    return this.lastUpdate + 1000 - Date.now();
  }

  private _runSchedule(schedule: PollSchedule) {
    schedule.connector.poll();
    schedule.setNextUpdate(this.lastUpdate);
  }

  private _runSchedules() {
    setTimeout(() => {
      this.lastUpdate = Date.now();
      this.schedules.forEach((schedule) => {
        
        if (!schedule.shouldUpdate(this.lastUpdate)) {
          return;
        }

        this._runSchedule(schedule);
      });

      this._runSchedules();
    }, this.nextUpdateIn);
  }

  run() {
    this._runSchedules();
  }
}
