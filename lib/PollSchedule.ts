import ChannelConnector from "../types/ChannelConnector.interface.ts";

export default class PollScheduler<R = any, T = any> {
  interval: number;
  nextUpdate: number;
  connector: ChannelConnector<R, T>;

  constructor(config: { interval?: number; connector: ChannelConnector<R, T> }) {
    const { interval = 20000, connector } = config;
    this.interval = interval;
    this.connector = connector;
    this.nextUpdate = Date.now();
  }

  shouldUpdate(currentTick: number) {
    return this.nextUpdate < currentTick;
  }

  setNextUpdate(currentTick: number) {
    this.nextUpdate = currentTick + this.interval;
  }
}
