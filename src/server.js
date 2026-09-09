const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

// Connect to MongoDB
connectDB();

// Only start listening when running locally (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(env.port, () => {
    console.log(`🚀 Pavna School Backend listening on port ${env.port} in ${env.nodeEnv} mode !!!!!!!!!`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
  });

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });
}

// Export app for Vercel serverless
module.exports = app;