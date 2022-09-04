import RedditConnector from "./connectors/RedditConnector";
import PollSchedule from "./lib/PollSchedule";
import ScheduleRunner from "./lib/ScheduleRunner";

const connector = new RedditConnector("StormGate");
const schedule = new PollSchedule({connector});
const runner = new ScheduleRunner([schedule]);

runner.run();
