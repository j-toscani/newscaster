import ChannelConnector from "../types/ChannelConnector.interface.ts";
import RedditPost from "../types/RedditPost.interface.ts";
import RedditResponse from "../types/RedditResponse.interface.ts";
import logUpdate from "../lib/logUpdate.ts";

export default class RedditConnector
  implements ChannelConnector<RedditResponse, RedditPost>
{
  _data: RedditPost | null;
  subReddit: string;
  handleUpdate: (value: RedditPost) => void;

  constructor(subReddit: string, onUpdate?: (value: RedditPost) => void) {
    this._data = null;
    this.subReddit = subReddit;
    this.handleUpdate = onUpdate ?? logUpdate;
  }

  async fetchData() {
    const response = await fetch(
      `https://www.reddit.com/r${this.subReddit}/new.json?limit=1`
    );
    return await response.json();
  }

  findMostRecentEntry(response: RedditResponse) {
    return response.data.children[0].data;
  }

  getId(data: RedditPost | null) {
    return data?.name ?? '';
  }

  get lastId() {
    return this.data ? this.getId(this.data) : null;
  }

  get data(): RedditPost {
    return this.data;
  }

  set data(value: RedditPost) {
    if(!this.isNewEntry(value)) {
      return;
    }

    this._data = value;
    this.handleUpdate(value);
  }

  isNewEntry(value: RedditPost) {
    return this.getId(this._data) !== this.getId(value)
  }

  async poll() {
    const response = await this.fetchData();
    const mostRecentEntry = this.findMostRecentEntry(response);
    
    this.data = mostRecentEntry;
  }
}
