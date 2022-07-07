export default interface ChannelConnector<R, T> {
    lastId: string | number | null;
    data: T | null;

    fetchData: () => Promise<R>;
    findMostRecent: (data: R) => T;
    getId: (data: T) => number | string;
    poll: () => void;
}