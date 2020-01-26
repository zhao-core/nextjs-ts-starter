import LRUCache from 'lru-cache';

const ssrCache = new LRUCache({
  max: 10000,
  maxAge: 1000 * 60 * 60 // 1hour
});

export default ssrCache;