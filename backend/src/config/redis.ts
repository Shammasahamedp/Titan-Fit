import Redis from "ioredis"

let redisClient:Redis 

export const connectRedis = async()=>{
    if(!redisClient){
        redisClient = new Redis({
            host:'127.0.0.1',
            port:6379
        })
    }

    redisClient.on('connect',()=>{
        console.log('redis has connected')
    })

    redisClient.on('error',(err)=>{
        console.error('redis error',err)
    })
    redisClient.set('test','wer')
    .then(()=>redisClient.get("test"))
    .then((value)=>console.log(value))
}

export {redisClient}