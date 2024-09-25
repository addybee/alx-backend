import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job';

const queue = kue.createQueue();

describe('createPushNotificationsJobs', function() {
  beforeEach(function() {
    queue.testMode.enter();  // Enter test mode for Kue
  });

  afterEach(function() {
    queue.testMode.clear();  // Clear the queue after each test
  });

  it('display an error message if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs(null, queue);
    }).to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', function() {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518790', message: 'This is the code 1234 to verify your account' }
    ];
    
    // Call the function that adds jobs to the queue
    createPushNotificationsJobs(jobs, queue);

    // Verify that 2 jobs were added to the queue
    expect(queue.testMode.jobs.length).to.equal(2);

    // Verify the first job details
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);  // Use deep.equal for object comparison

    // Verify the second job details
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
  });
});
