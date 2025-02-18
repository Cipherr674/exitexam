const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

module.exports = (app) => {
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"]
    }
  }));
  
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));
}; 