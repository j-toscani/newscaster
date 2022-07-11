import RedditConnector from "./connectors/RedditConnector.ts";
import PollSchedule from "./lib/PollSchedule.ts";
import ScheduleRunner from "./lib/ScheduleRunner.ts";

const connector = new RedditConnector();
const schedule = new PollSchedule({connector});
const runner = new ScheduleRunner([schedule]);

runner.run();