const heightCache = new Map<string, number>();
export default heightCache;

interface ScrollState {
  offset: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  measurementsCache: any[];
}

export const scrollStateCache = new Map<string, ScrollState>();
