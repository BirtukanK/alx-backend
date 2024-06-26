function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)){
        throw new Error('Jobs is not an array');
    } else{
        const jobs_length = jobs.length;
        for(let i = 0; i < jobs_length; i++) {
            const push_notification_code_3 = queue.create('push_notification_code_3', jobs[i]).save(function(err) {
                if (err) {
                    console.log('Notification job failed:', err);
                } else {
                    console.log('Notification job created:', push_notification_code_3.id);
                    }
                    });
                push_notification_code_3.on('complete', function(result) {
                console.log('Notification job ${push_notification_code_3.id} completed', result);
                }).on('failed', function(errorMessage) {
                console.log('Notification job ${push_notification_code_3.id} failed:' + errorMessage);
                }).on('progress', function(progress, data){
                console.log('\r  Notification job' + job.id + ' ' + progress + '% complete', data );
                });
                }
                }
}
module.exports = createPushNotificationsJobs;
