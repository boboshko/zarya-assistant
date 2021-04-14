const config = require('./config');

exports.mode = function mode(webhook, app) {
  if (webhook === true) {
    // If true, launch the bot with Webhook
    app.telegram.setWebhook(config.cvWebhook);
    app.startWebhook(config.cvWebhookPath, null, 5002);
  } else {
    // If false, launch the bot with Long polling
    app.launch();
  }
};
