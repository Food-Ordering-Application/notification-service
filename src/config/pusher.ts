const PushNotifications = require('@pusher/push-notifications-server');
export const beamsClient = new PushNotifications({
  instanceId: process.env.PUSHER_INSTANCE_ID,
  secretKey: process.env.PUSHER_INSTANCE_SECRET_KEY,
});
