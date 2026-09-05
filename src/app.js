const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const env = require('./config/env');
const ApiError = require('./utils/ApiError');
const ApiResponse = require('./utils/ApiResponse');
const errorHandler = require('./middleware/error.middleware');

// Routes imports
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const admissionRoutes = require('./routes/admission.routes');
const contactRoutes = require('./routes/contact.routes');
const inquiryRoutes = require('./routes/inquiry.routes');
const noticeRoutes = require('./routes/notice.routes');
const eventRoutes = require('./routes/event.routes');
const galleryRoutes = require('./routes/gallery.routes');
const facultyRoutes = require('./routes/faculty.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const achievementRoutes = require('./routes/achievement.routes');
const facilityRoutes = require('./routes/facility.routes');
const pageRoutes = require('./routes/page.routes');

const app = express();

// Security and HTTP headers middleware
app.use(helmet({ crossOriginResourcePolicy: false }));

// CORS setup
app.use(
  cors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(','),
    credentials: true,
  })
);

// Body Parsers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Logging
if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Static Files Upload Directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json(new ApiResponse(200, { status: 'UP', timestamp: new Date() }, 'Server is healthy'));
});

// API Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/admissions', admissionRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/v1/notices', noticeRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/faculty', facultyRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/achievements', achievementRoutes);
app.use('/api/v1/facilities', facilityRoutes);
app.use('/api/v1/pages', pageRoutes);

// Handle 404 Route Not Found
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
