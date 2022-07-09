import RedditConnector from "./connector/RedditConnector.ts";
const connector = new RedditConnector();

setInterval(() => {
    connector.poll();
}, 20000);
