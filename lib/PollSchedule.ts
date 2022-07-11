import ChannelConnector from "../types/ChannelConnector.interface.ts";

export default class PollScheduler<R = unknown, T = unknown> {
  interval: number;
  nextUpdate: number;
  connector: ChannelConnector<R, T>;

  constructor(config: { interval: number; connector: ChannelConnector<R, T> }) {
    const { interval, connector } = config;
    this.interval = interval;
    this.connector = connector;
    this.nextUpdate = Date.now();
  }

  check(currentTick: number) {
    return this.nextUpdate > currentTick;
  }
}
