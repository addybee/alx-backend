import { createClient, print } from 'redis';

const client = createClient();

// on successful connection to the redis
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

// when Error occurs
client.on("error", function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

function publishMessage(message, time) {
  // print after time millis
  setTimeout(() => {
    console.log(`About to send ${message}`);
  // publish to the channel holberton school
    client.publish('holberton school channel', message);
  }, time);
  // publish to the channel holberton school
  client.on('subscribe', function(channel, message) {
    client.publish('holberton school channel', message);
  });
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
