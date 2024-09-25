import { createClient, print } from 'redis';
import { promisify } from 'util';  // Import util.promisify

// Create Redis client
const client = createClient();

// Handle successful connection
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

// Handle connection errors
client.on('error', function(err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Promisify the 'get' method
const getAsync = promisify(client.get).bind(client);

// Set a key-value pair in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);  // Use Redis 'print' for result
}

// Get and display a key-value pair asynchronously
async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);  // Await the asynchronous get method
    console.log(reply);
  } catch (error) {
    console.log('Error:', error);
  }
}

// Test the functions
displaySchoolValue('Holberton');  // Should print null if key doesn't exist
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');  // Should print 100
