import Redis from 'ioredis';
import { redis } from '../config'

export const redisClient = new Redis({
  port: redis.port,
  host: redis.host, //如果不是本机地址，记得替换
  password: redis.password, //注意替换成自定义的密码
  connectTimeout: 100,
  maxRetriesPerRequest: 2,
  retryStrategy: function(times) {
    // reconnect after
    return Math.min(times * 10, 3000);
  },
  reconnectOnError: function(err) {
    let targetError = 'READONLY';
    console.error('err:%j', err);
    if (err.message.slice(0, targetError.length) === targetError) {
      // Only reconnect when the error starts with "READONLY"
      return true; // or `return 1;`
    }
  },
});

// redis.on xxx是用于监听其事件的，其他的事件类型可参考https://github.com/luin/ioredis  => Events模块
redisClient.on('connect', (err) => {
  if (err) {
    console.error(`failed to connect redis ${redis.host}:${redis.port}`);
  } else {
    console.log(`redis ${redis.host}:${redis.port} connected`);
  }
});

redisClient.on('error', (err) => {
  if (err) {
    console.error('failed to start redis');
    // throw new Error('failed to start redis');
  } else {
    console.log('redis ready for service');
  }
});


export function getVal(key) {
  return new Promise(function(resolve, reject) {
    redisClient.get(key, function(err, result) {
      if (err) reject(err);
      try {
        const data = JSON.parse(result);
        resolve(result);
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  });
}

export function setVal(key: string, val: any, time: number = 60 * 60 * 24 * 1000) {
  return new Promise(function(resolve, reject) {
    redisClient.set(key, JSON.stringify(val),'EX' ,time, err => {
      if (err) {
        console.error("error:", err);
        reject(err);
        //此处一定要抛出异常，或者其他停止操作的策略, 不然最大重试次数策略不生效
        throw new Error('error occurred when set kv');
      }else {
        resolve();
      }
    });
  });
}