# Skirk Portal

> A full-stack Genshin Impact team builder and analyzer powered by AI.

![Homepage](docs/screenshots/homepage.png)

## 🔗 Links

- **Client**: https://www.skirk.my.id
- **Server**: https://skirk-portal-v2-api.up.railway.app/characters/skirk

---

## 📖 About

Skirk Portal is a full-stack web application themed around Genshin Impact. It allows players to explore characters, create and manage team builds, and analyze team synergy using the power of Gemini AI.

---

## ✨ Features

- 🔍 **Character Explorer** — Browse all Genshin Impact characters with filter by element, weapon, nation, and rarity
- 📊 **Character Detail** — View character stats, ascension materials, skill talents with scaling sliders, passives, constellations, and lore
- 📋 **Team Builds** — Create, edit, and delete your own team compositions with up to 4 characters
- 🤖 **AI Analyzer** — Analyze your team synergy using Gemini AI — get team name, rating, elemental reactions, strengths, weaknesses, and playstyle
- 🔐 **Authentication** — Register, login, and Google OAuth support
- 📱 **Responsive** — Works on both desktop and mobile

---

## 🛠️ Tech Stack

### Server

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL + Sequelize ORM
- **Auth**: JWT + bcryptjs + Google OAuth
- **AI**: Gemini (`gemini-3-flash-preview`) via `@google/genai`
- **Character Data**: [`genshin-db`](https://www.npmjs.com/package/genshin-db) (local npm package, no external API)
- **Image CDN**: [Enka Network](https://enka.network) (character images served from `enka.network/ui`)
- **Testing**: Jest + Supertest (coverage 95%+)

### Client

- **Library**: React.js (Vite)
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 + DaisyUI v5
- **HTTP**: Axios
- **Auth**: `@react-oauth/google`

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/homepage.png" width="400"/><br/><sub>Homepage</sub></td>
    <td align="center"><img src="docs/screenshots/characters.png" width="400"/><br/><sub>Characters</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/character-detail.png" width="400"/><br/><sub>Character Detail</sub></td>
    <td align="center"><img src="docs/screenshots/login.png" width="400"/><br/><sub>Login</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/register.png" width="400"/><br/><sub>Register</sub></td>
    <td align="center"><img src="docs/screenshots/my-builds.png" width="400"/><br/><sub>My Builds</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/create-build.png" width="400"/><br/><sub>Create Build</sub></td>
    <td align="center"><img src="docs/screenshots/edit-build.png" width="400"/><br/><sub>Edit Build</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/ai-analyzer.png" width="400"/><br/><sub>AI Analyzer</sub></td>
    <td align="center"><img src="docs/screenshots/ai-analyzing.png" width="400"/><br/><sub>AI Analyzing</sub></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><img src="docs/screenshots/ai-result.png" width="400"/><br/><sub>AI Result</sub></td>
  </tr>
</table>

### Mobile View

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/mobile-homepage.png" width="250"/><br/><sub>Homepage</sub></td>
    <td align="center"><img src="docs/screenshots/mobile-characters.png" width="250"/><br/><sub>Characters</sub></td>
    <td align="center"><img src="docs/screenshots/mobile-login.png" width="250"/><br/><sub>Login</sub></td>
  </tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Server Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
JWT_SECRET_KEY=yoursecretkey
GOOGLE_CLIENT_ID=yourgoogleclientid
GEMINI_API_KEY=yourgeminikey
```

> **Note:** Database is configured via `config/config.json`. Development uses `skirk_portal_v2_dev` with user `postgres`. Production uses the `DATABASE_URL` environment variable.

Run migration and start:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npm run dev
```

### Client Setup

```bash
cd client
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=yourgoogleclientid
```

Start:

```bash
npm run dev
```

---

## 🧪 Testing

```bash
cd server

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

Coverage: **95%+** across statements, functions, and lines.

---

## 📁 Project Structure

```
skirk-portal-v2/
├── server/
│   ├── __tests__/
│   │   ├── auth.test.js
│   │   ├── build.test.js
│   │   ├── character.test.js
│   │   └── ai.test.js
│   ├── controllers/
│   ├── helpers/
│   ├── middlewares/
│   ├── migrations/
│   ├── models/
│   ├── routers/
│   ├── seeders/
│   ├── app.js
│   └── bin/www
└── client/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── constants/
    │   ├── features/
    │   ├── layouts/
    │   └── views/
    └── index.html
```

---

## 👤 Author

**Ahmad Luthfi Hanif** — Hacktiv8 Fullstack JavaScript Bootcamp, Phase 2 Individual Project
