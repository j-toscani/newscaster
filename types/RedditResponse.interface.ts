import RedditPost from "./RedditPost.interface.ts";

export default interface RedditResponse {
  kind: "Listing";
  data: {
    after: string;
    dist: number;
    modhash: string;
    geo_filter: string;
    children: {kind: string, data: RedditPost}[];
    before: null | string;
  };
}
