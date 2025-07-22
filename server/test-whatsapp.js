// test-whatsapp.js
const twilio = require('twilio');
const client = twilio('AC48ad8813685bd82dd45c90eaa6300d95', '7e242c37c1039a679da65f74b8dbb3bf');

client.messages
  .create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+917624828106',
    body: 'Your test OTP is: 123456'
  })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));
