const Redis =  require('ioredis');
require('dotenv').config()

const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT;
const PASSWORD = process.env.REDIS_PASSWORD;
const USERNAME = process.env.REDIS_USERNAME;

const redis = new Redis(`redis://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`);

redis.ping()
  .then((result) => {
    console.log('Connected to Redis:', result);
  })
  .catch((error) => {
    console.error('Error connecting to Redis:', error);
  });

redis.on('error', (error) => {
    console.error('Redis Error:', error);
});
  
module.exports = redis;