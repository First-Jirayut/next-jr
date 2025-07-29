// lib/redis.ts
import Redis from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1', // หากใช้ Docker แบบ -p 6379:6379 → ใช้ localhost ได้เลย
  port: 6379,
  // password: 'หากมี', 
});

export default redis;