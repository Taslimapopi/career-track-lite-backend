# CareerTrack Lite

A full-stack job application tracker that helps job seekers log, organize, and track the status of every job they apply to — from "Saved" all the way to "Offer".

Built as a graded assignment demonstrating full-stack development, authentication, authorization, and deployment skills.

---

## Live Links

| Resource | URL |
|---|---|
| Live Frontend | https://frontend-rust-omega-55.vercel.app |
| Live Backend / API | https://career-track-lite-backend.onrender.com |
| API Health Check | https://career-track-lite-backend.onrender.com/api/health |
| Backend Repository | https://github.com/Taslimapopi/career-track-lite-backend |
| Frontend Repository | https://github.com/Taslimapopi/career-track-lite-frontend |
| Demonstration Video | |

> ⚠️ Note: the backend is hosted on Render's free tier. If the API has been inactive, the first request may take 15–30 seconds to respond while the service wakes up.

---

## Test Credentials

Use the following account to log in and review the application without registering:

```
Email:    taslimaapopi@gmail.com
Password: 123456
```

---

## Features

- **Authentication & Authorization** — secure registration and login with hashed passwords (bcrypt) and JWT-based sessions. Every route that touches application data is protected, and users can only ever see or modify their own applications.
- **Job Application CRUD** — create, view, update, and delete applications with fields for company, job title, job post URL, source, status, application date, and notes.
- **Dashboard** — at-a-glance stats (total applications, and counts per status: Saved, Applied, Assessment, Interview, Rejected, Offer) plus a list of recently added applications.
- **Search, Filter & Sort** — search by company or job title, filter by status, and sort by newest or oldest application date.
- **Responsive, polished UI** — light/dark theme with automatic system detection and a manual toggle, hover states, loading/empty/error states, and a styled delete-confirmation dialog.

---

## Technology Stack

**Frontend**
- React (Vite)
- React Router v6
- Tailwind CSS v4
- React Hook Form + Zod (validation)
- Axios

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing

**Deployment**
- Frontend: Vercel
- Backend/API: Render
- Database: MongoDB Atlas

**Language:** JavaScript

---

## Database Note: MongoDB instead of PostgreSQL

The assignment recommends attempting PostgreSQL first, with MongoDB as a fallback. Given the project timeline, I chose MongoDB with Mongoose directly, since it's the stack I have the most hands-on experience with from prior projects — this let me focus available time on building a complete, correctly-authorized, and fully deployed feature set rather than learning a new ORM and database under time pressure. This tradeoff and reasoning is also explained in the demonstration video.

---

## Local Installation

### Backend

```bash
git clone https://github.com/Taslimapopi/career-track-lite-backend.git
cd career-track-lite-backend
npm install
cp .env.example .env   # then fill in your own values
npm run dev
```

Backend runs on `http://localhost:5000` by default.

### Frontend

```bash
git clone (https://github.com/Taslimapopi/career-track-lite-frontend)
cd career-track-lite-frontend
npm install
cp .env.example .env   # then fill in your own values
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

---

## Environment Variables

### Backend `.env.example`

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend `.env.example`

```
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoint Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Create a new account | No |
| POST | `/api/auth/login` | Log in | No |
| GET | `/api/auth/me` | Get current logged-in user | Yes |
| POST | `/api/applications` | Create a new application | Yes |
| GET | `/api/applications` | List own applications (supports `search`, `status`, `source`, `sort` query params) | Yes |
| GET | `/api/applications/:id` | Get a single application | Yes |
| PATCH | `/api/applications/:id` | Update an application | Yes |
| DELETE | `/api/applications/:id` | Delete an application | Yes |
| GET | `/api/dashboard/stats` | Get dashboard statistics | Yes |
| GET | `/api/health` | API health check | No |

All protected routes require an `Authorization: Bearer <token>` header. Ownership is enforced at the database query level — a user can never read, update, or delete another user's applications.

---

## Screenshots



---

## AI Tools Used

Claude (Anthropic) was used throughout development as a learning and pair-programming aid — for planning the architecture, explaining concepts (e.g. Mongoose middleware behavior, JWT flow, CORS, Tailwind v4 theming), debugging real errors encountered during development (case-sensitivity issues on Linux deployment, async/await pitfalls in Mongoose hooks, CORS misconfiguration), and reviewing UI/UX decisions. All code was reviewed, tested, and understood before being committed; no code was copied without comprehension.

No AI feature (e.g. job description summarization) was added to the application itself — this was treated as an optional bonus and deprioritized in favor of completing all core requirements within the deadline.

---

## Challenges & Known Limitations

- **Time constraint:** the project was built and deployed within a tightly compressed timeline, which shaped some of the tradeoffs below.
- **MongoDB over PostgreSQL:** as noted above, MongoDB/Mongoose was used directly rather than attempting PostgreSQL first, prioritizing a complete and correctly-authorized feature set.
- **JavaScript over TypeScript:** the project was built in JavaScript rather than TypeScript to keep velocity high under the deadline; TypeScript is a planned next step (see below).
- **Render free-tier cold starts:** the backend may take 15–30 seconds to respond to the first request after a period of inactivity.
- **No AI bonus feature:** deprioritized in favor of a complete core feature set.

## Future Improvements

- Migrate the backend to TypeScript for stronger type safety
- Add the optional AI feature (job description → summary, keywords, and interview questions)
- Add charts to the dashboard (visual breakdown of application statuses over time)
- Add pagination for large application lists
- Add toast notifications in place of native browser alerts
- Add inline status updates directly from the applications list

---

## Author

**Taslima Popi**
Student ID: **WEB12-2453**
