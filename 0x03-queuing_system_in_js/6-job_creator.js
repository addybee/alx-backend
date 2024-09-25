const kue = require('kue');

const queue = kue.createQueue();

const jobData = {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account',
};

const job = queue.create('push_notification_code', jobData).save(function(err) {
  if (!err) console.log(`Notification job created: ${job.id}`);
});

// When the job is completed
job.on('complete', function() {
  console.log('Notification job completed');
});

// When the job is failing
job.on('failed', function(params) {
  console.log('Notification job failed');
});
