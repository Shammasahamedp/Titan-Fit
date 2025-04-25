import Redis from "ioredis";
import { redisClient } from "../../config/redis";
import { IRedisRepository } from "./IRedis-repository";


export class RedisRepository implements IRedisRepository {
  private redis: Redis ;

  constructor() {
    if(!redisClient){
        throw new Error('Redis client is not initialized')
    }
    this.redis = redisClient;
  }
 async saveOtp(email: string, otp: string, expiry: number): Promise<void> {

    await this.redis?.setex(`otp:${email}`,expiry,otp)
  }
 async getOtp(email: string): Promise<string | null> {
      return await this.redis?.get(`otp:${email}`)
  }
  async deleteOtp(email: string): Promise<void> {
      await this.redis.del(`otp:${email}`)
  }
  async deleteToken(token: string): Promise<void> {
      await this.redis.del(token)
  }
  async getToken(token: string): Promise<string | null> {
      return await this.redis?.get(token)
  }
  async saveToken(email: string, token: string, expiry: number): Promise<void> {
      await this.redis?.setex(token,expiry,email)
  } 
  
}
