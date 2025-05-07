const serverless = require('serverless-http');
const app = require('../index'); // This should be your existing Express app

module.exports = serverless(app);