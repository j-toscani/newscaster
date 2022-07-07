import RedditConnector from "./connector/RedditConnector.ts";

const connector = new RedditConnector();

connector.poll();

setInterval(() => connector.poll(), 10000);
