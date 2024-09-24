import { createClient } from 'redis';

const client = createClient();

// on successful connection to the redis
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

// when Error occurs
client.on("error", function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});
