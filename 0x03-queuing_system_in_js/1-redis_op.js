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

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    console.log(reply);
  })
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
