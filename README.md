# Pavna School Backend API

Complete Node.js / Express REST API backend for Pavna School Management System.

## Architecture & Structure

```
pavna-school-backend/
├── src/
│   ├── config/          # Database, Environment, Cloudinary Config
│   ├── controllers/     # Controller handlers for each domain resource
│   ├── models/          # Mongoose Schemas & Data Models
│   ├── routes/          # Express Routers
│   ├── middleware/      # Auth, Admin, Upload, Error, and Validation Middlewares
│   ├── validators/      # Express Validator Rules
│   ├── services/        # Business Logic & Third-party integrations
│   ├── utils/           # Helper classes (ApiError, ApiResponse, asyncHandler, token)
│   ├── app.js           # Express App setup & middleware registration
│   └── server.js        # Server listener and DB initialization
├── uploads/             # Local file storage directory
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secrets:
   ```bash
   cp .env.example .env
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Key API Endpoints

- **Health Check**: `GET /health`
- **Auth**: `POST /api/v1/auth/login`, `POST /api/v1/auth/register`, `GET /api/v1/auth/profile`
- **Admin**: `GET /api/v1/admin`, `PATCH /api/v1/admin/:id`, `DELETE /api/v1/admin/:id`
- **Admissions**: `POST /api/v1/admissions`, `GET /api/v1/admissions`, `PATCH /api/v1/admissions/:id/status`
- **Contacts**: `POST /api/v1/contacts`, `GET /api/v1/contacts`, `PATCH /api/v1/contacts/:id/status`
- **Inquiries**: `POST /api/v1/inquiries`, `GET /api/v1/inquiries`
- **Notices**: `GET /api/v1/notices/active`, `POST /api/v1/notices`, `PUT /api/v1/notices/:id`
- **Events**: `GET /api/v1/events/active`, `POST /api/v1/events`, `PUT /api/v1/events/:id`
- **Gallery**: `GET /api/v1/gallery`, `POST /api/v1/gallery`, `DELETE /api/v1/gallery/:id`
- **Faculty**: `GET /api/v1/faculty`, `POST /api/v1/faculty`, `PUT /api/v1/faculty/:id`
- **Testimonials**: `GET /api/v1/testimonials`, `POST /api/v1/testimonials`
- **Achievements**: `GET /api/v1/achievements`, `POST /api/v1/achievements`
- **Facilities**: `GET /api/v1/facilities`, `POST /api/v1/facilities`
- **Pages (CMS)**: `GET /api/v1/pages/:slug`, `POST /api/v1/pages/:slug`
