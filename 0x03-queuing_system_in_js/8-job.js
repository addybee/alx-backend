
function createPushNotificationsJobs(jobs, queue) {
  // throw an Error with message: Jobs is not an array
  // if jobs id not an array
  if (!(jobs instanceof Array)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach(function(val) {
    const job = queue.createJob('push_notification_code_3', val)
      .save(function(err) {
        if (!err) console.log(`Notification job created: ${job.id}`);
      });
  
    job.on('complete', () => {
        console.log(`Notification job #${job.id} completed`);
    });
  
    job.on('failed', (error) => {
        console.log(`Notification job #${job.id} failed: ${error}`);
    });
  
    job.on('progress', (progress, _) => {
        console.log(`Notification job #${job.id} ${progress}% complete`);
    });
  });  
}

export default createPushNotificationsJobs;
