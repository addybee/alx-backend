import { createClient } from "redis";
import util from 'util';
import express from 'express';
import kue from 'kue';
import { rejects } from "assert";
import { resolve } from "path";

const client = createClient();
const app = express();
const queue = kue.createQueue();
const getAsync = util.promisify(client.get).bind(client);
let reservationEnabled = false;

function reserveSeat(number) {
  client.set('available_seats', number);
}

async function getCurrentAvailableSeats() {
  return await getAsync('available_seats');
}

app.get('/available_seats', async (req, res) => {
  return res.json({
    numberOfAvailableSeats: await getCurrentAvailableSeats()
  });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.status(404).json({
      status: "Reservation are blocked"
    });
  }
  const job = queue.createJob('reserve_seat', {}).save((err) => {
    if (!err) {
      return res.json({ "status": "Reservation in process" });
    }
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`);
    return res.status(400).json({ "status": "Reservation failed" });
  });
});

app.get('/process', (req, res) => {
  console.log(`left: {number}-1`);
  queue.process('reserve_seat', async (job, done) => {
    decreaseSeat()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  return res.json({ "status": "Queue processing" });
});

app.listen(12456, () => {
  reserveSeat(50);
  client.set('reservationEnabled', true);
});

// Helper function to decrease available seats
function decreaseSeat() {
  return new Promise(async (resolve, reject) => {
    try {
      let number = parseInt(await getCurrentAvailableSeats()); // Start by fetching the number of seats

      // console.log(`Seats left initially: ${number}`);
      
      // Check if reservation is enabled
      if (await getAsync('reservationEnabled')) {
        number -= 1;  // Decrease the seat count
        // console.log(`Seats left after reservation: ${number}`);
        
        // Disable reservations if seats run out
        if (number === 0) {
          client.set('reservationEnabled', false);
        }
      }

      // If valid seats remain, proceed with the reservation
      if (number >= 0) {
        // console.log(`Final seat count: ${number}`);
        reserveSeat(number);  // Update the seat count
        resolve();  // Resolve the promise successfully
      } else {
        reject(new Error('Not enough seats available'));  // Reject if no seats remain
      }
    } catch (err) {
      reject(err);  // Catch any async errors and reject the promise
    }
  });
}
