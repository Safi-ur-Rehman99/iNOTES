const app = require('../index');

// Export a function handler for Vercel to invoke the Express app directly.
module.exports = (req, res) => app(req, res);
