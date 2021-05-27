const Pusher = require('pusher');
// import Sentiment from 'sentiment';

// const sentiment = new Sentiment();
// const sentimentScore = (data) => sentiment.analyze(data).score;
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.CLUSTER,
  encrypted: true,
});

export { pusher };
