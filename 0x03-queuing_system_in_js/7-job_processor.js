const kue = require('kue');

const blackListNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  // Track job progress from 0 out of 100
  job.progress(0, 100);

  if (blackListNumbers.includes(phoneNumber)) {
    job.failed();
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  // Track job progress to 50%
  job.progress(50, 100);
  // Log to the console Sending notification to PHONE_NUMBER, with message: MESSAGE
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  // Finish the job successfully
  job.progress(100, 100);
  done();
}

const queue = kue.createQueue();

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
