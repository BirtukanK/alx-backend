const kue = require('kue');
const queue = kue.createQueue();

const push_notification_code = queue.create('push_notification_code', {
  phoneNumber: "+25189",
  message: "I'm dululu",
}).save(function(err) {
  if (err) {
    console.log('Notification job failed:', err);
  } else {
    console.log('Notification job created:', push_notification_code.id);
  }
});

push_notification_code.on('complete', function(result) {
  console.log('Notification job completed', result);
}).on('failed', function(errorMessage) {
  console.log('Notification job failed:', errorMessage);
});
