# Cariant Field Survey App

A full-stack recreation of the field-survey app shown in the reference recordings:
a dashboard of survey tasks (DEO / DEO Bus Adda / Cariant Forecourt / Cariant Oil
Filter), dynamic Yes-No + photo-capture questionnaires with conditional
consumer-registration fields, an in-browser camera, per-site visit history, and a
sync action.

- **Frontend:** React 18 + Vite + React Router + Tailwind CSS
- **Backend:** Node.js + Express, with a lightweight JSON-file database (no native
  modules, so `npm install` never needs a C++ build toolchain)

## Project layout

```
oil-survey-app/
├─ client/     React app (Vite dev server on :5173, proxies /api to :4000)
└─ server/     Express API (listens on :4000, stores data in server/data.json)
```

It's an npm workspaces monorepo, so a single install at the root sets up both
sides.

## Getting started

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

That's it — this starts the Express API on `http://localhost:4000` and the
Vite dev server on `http://localhost:5173` together (via `concurrently`).
Open the app at:

```
http://localhost:5173
```

### Demo login

The login screen is pre-filled with demo credentials:

- **Username:** `testuser`
- **Password:** `password123`

### Camera / photo questions

Photo questions open a real camera view (via `getUserMedia`) with flash
toggle, front/back camera switch, and a capture button, matching the
reference app. If the browser denies camera access (or you're on desktop
without a webcam), it automatically falls back to a file picker so photo
questions can still be completed.

Note: most browsers only allow camera access on `localhost` or over HTTPS,
so `http://localhost:5173` will work fine for local development.

## How the data is organised

- **Categories** (e.g. "DEO") group **survey types** (e.g. "Cariant Forecourt").
- Each survey type has a list of **sites** (outlets/locations) to visit.
- Completing a form for a site creates a **visit**, which is what powers the
  "Questions Attempted", history list, and the daily completed-count badges
  on the dashboard.
- All of this is seeded automatically into `server/data.json` the first time
  the server runs. Delete that file (and `server/uploads/*`) at any time to
  reset the app back to its initial demo state.

## Available scripts (root)

| Command           | What it does                                   |
| ------------------ | ----------------------------------------------- |
| `npm run dev`       | Runs the API and the client together (dev mode) |
| `npm run server`    | Runs only the Express API                        |
| `npm run client`    | Runs only the Vite dev server                    |
| `npm run build`     | Builds the client for production (`client/dist`) |
| `npm start`         | Runs the Express API in production mode          |

## Customising the survey questions

Question schemas live in `server/db.js` (`standardQuestions`). Each question
is:

```js
{ id, type: "toggle" | "photo" | "text" | "number", label, required, children? }
```

`children` only apply to `toggle` questions, and are revealed once that
toggle is answered "Yes" — this is how the "Consumer Info" section reveals
Consumer Name, Contact numbers, CNIC, Address, Invoice Picture, Activation
Code, Code Picture and No. of Giveaways in the reference app. Add, remove, or
reorder questions/sites/categories there and restart the server (or just let
`node --watch` reload it) to see the changes.
