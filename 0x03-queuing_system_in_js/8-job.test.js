import createPushNotificationsJobs from './8-job.js';
const { expect } = require('chai');
const kue = require('kue');
const queue = kue.createQueue();

describe('createPushNotificationsJobs', () => {
    before(() => {
        kue.Job.rangeByType('push_notification_code_3', 'inactive', 0, -1, 'asc', (err, selectedJobs) => {
            selectedJobs.forEach((job) => {
                job.remove();
            });
        });
        queue.testMode.enter();
    });

    afterEach(() => {
        queue.testMode.clear();
    });

    after(() => {
        queue.testMode.exit();
    });

    it('should throw an error if jobs is not an array', () => {
        expect(() => createPushNotificationsJobs('not an array', queue)).to.throw('Jobs is not an array');
    });

    it('should create jobs for each item in the jobs array', () => {
        const jobs = [
            { phoneNumber: '1234567890', message: 'This is a test message' },
            { phoneNumber: '0987654321', message: 'This is another test message' }
        ];

        createPushNotificationsJobs(jobs, queue);

        expect(queue.testMode.jobs.length).to.equal(2);
        expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
        expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
    });
});
