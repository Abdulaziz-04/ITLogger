# OpsDesk (refreshed 2025)

Modernized MERN stack OpsDesk incident logger with a React 18 + MUI interface and updated Node/Express API.

## Quick start

```bash
# install deps
npm install
npm run client:install

# start dev server + client
npm run dev
```

Set `MONGO_URL` (or `config.mongoUrl`) to your Mongo connection string before running.

## Highlights
- Fresh MUI dashboard with filters, dark mode, and quick stats.
- Status-aware logs (open/in_progress/resolved) with inline “mark resolved”.
- Technician roster management with add/remove dialogs.
- API upgraded for modern Node (Express 4.19, Mongoose 8, Joi 17).
