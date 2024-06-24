const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();

client.on('connect', function() { console.log('Redis client connected to the server')});
client.on('error', function(err) { console.log('Redis client not connected to the server: ' + err)});

const getAsync = promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
    try {
        const value = await getAsync(schoolName);
        console.log(value);
    } catch (err) {
        console.error('Error retrieving the value:', err);
    }
}

(async () => {
    await displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
})();
