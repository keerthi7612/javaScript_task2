import logger from "./logger.js";
class CacheManager {
  constructor() {
    this.cache = new Map();
  }
  set(key, value, expirySeconds = 3600) {
    const expiryTime = Date.now() + expirySeconds * 1000;
    this.cache.set(key, {
      value,
      expiryTime,
    });
    logger.info(`Cache SET: ${key} (expires in ${expirySeconds}s)`);
  }
  get(key) {
    const item = this.cache.get(key);

    if (!item) {
      logger.info(`Cache MISS: ${key}`);
      return null;
    }
    if (Date.now() > item.expiryTime) {
      this.cache.delete(key);
      logger.info(`Cache EXPIRED: ${key}`);
      return null;
    }
    logger.info(`Cache HIT: ${key}`);
    return item.value;
  }
  delete(key) {
    this.cache.delete(key);
    logger.info(`Cache DELETE: ${key}`);
  }
  clear() {
    this.cache.clear();
    logger.info(`Cache CLEARED all`);
  }
  getStats() {
    return {
      totalCachedItems: this.cache.size,
      cachedKeys: Array.from(this.cache.keys()),
    };
  }
}

export const redisCache = new CacheManager();
