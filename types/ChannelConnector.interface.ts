export default interface ChannelConnector<R, T> {
  _data: T | null;
  onUpdate?: (value: T) => void;

  get data(): T;
  set data(value: T);

  isNewEntry(value: T): boolean;
  fetchData: () => Promise<R>;
  findMostRecentEntry: (data: R) => T;
  getId: (data: T) => number | string | undefined;
  poll: () => void;
}
