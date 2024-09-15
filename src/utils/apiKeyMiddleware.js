const {API_KEY} = require('../config/server.config')

const apiKeyMiddleware = (req, res, next) => {
  const clientApiKey = req.headers['x-api-key'];
  if (clientApiKey !== API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }
  next();
};

module.exports = apiKeyMiddleware;
