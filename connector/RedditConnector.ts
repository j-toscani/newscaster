import ChannelConnector from "../types/ChannelConnector.interface.ts";
import RedditPost from "../types/RedditPost.interface.ts";
import RedditResponse from "../types/RedditResponse.interface.ts";

export default class RedditConnector
  implements ChannelConnector<RedditResponse, RedditPost>
{
  lastId: number | string | null;
  data: RedditPost | null;
  constructor() {
    this.lastId = null;
    this.data = null;
  }

  async fetchData() {
    const response = await fetch(
      "https://www.reddit.com/r/Stormgate/new.json?limit=1"
    );
    return await response.json();
  }

  findMostRecent(response: RedditResponse) {
    return response.data.children[0].data;
  }

  getId(data: RedditPost) {
    return data.name;
  }

  async poll() {
    const data = await this.fetchData();
    const mostRecent = this.findMostRecent(data);
    const mostRecentId = this.getId(mostRecent);

    if (mostRecentId !== this.lastId) {
      console.log(mostRecentId, mostRecent);
      this.lastId = mostRecentId;
    } else {
      console.log("no news");
    }
  }
}
