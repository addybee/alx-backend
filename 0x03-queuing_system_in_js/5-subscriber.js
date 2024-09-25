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

client.on('message', function(channel, message) {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});

client.subscribe('holberton school channel');
