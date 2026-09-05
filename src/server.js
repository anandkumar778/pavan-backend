const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const server = app.listen(env.port, () => {
      console.log(`🚀 Pavna School Backend listening on port ${env.port} in ${env.nodeEnv} mode !!!!!!!!!`);
    });

    // Unhandled Rejections / Exceptions Handlers
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Promise Rejection:', err);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('Server failed to start:', error);
    process.exit(1);
  }
};

startServer();
