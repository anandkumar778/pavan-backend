const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

// Validate required environment variables
const requiredEnv = ['MONGO_URI', 'JWT_SECRET', 'SMTP_HOST'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error('❌ Missing required environment variables:', missingEnv.join(', '));
  process.exit(1);
}

// Warmup endpoint (helps Vercel keep a function warm)
app.get('/warm', (req, res) => {
  res.status(200).json({ success: true, message: 'Warmup ping' });
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const server = app.listen(env.port, () => {
      console.log(`🚀 Pavna School Backend listening on port ${env.port} in ${env.nodeEnv} mode !!!!!!!!!`);
    });

    // Graceful shutdown on SIGTERM (e.g. Vercel / Docker stop)
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    });

    // Unhandled Rejections / Exceptions Handlers
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Promise Rejection:', err);
      server.close(() => process.exit(1));
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('Server failed to start:', error);
    process.exit(1);
  }
};


startServer();