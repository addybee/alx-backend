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

client.hset('HolbertonSchools', 'Portland', '50', print);
client.hset('HolbertonSchools', 'Seattle', '80', print);
client.hset('HolbertonSchools', 'New York', '20', print);
client.hset('HolbertonSchools', 'Bogota', '20', print);
client.hset('HolbertonSchools', 'Cali', '40', print);
client.hset('HolbertonSchools', 'Paris', '2', print);
client.hgetall('HolbertonSchools', (err, replies) => {
  console.log(replies);
});
