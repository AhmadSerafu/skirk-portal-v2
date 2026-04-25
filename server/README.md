# Skirk Portal API

## Base URL

`https://skirk-portal-v2-api.up.railway.app/characters/skirk`

---

## Endpoints Overview

### Authentication

| Method | Endpoint           | Description       | Auth Required |
| ------ | ------------------ | ----------------- | ------------- |
| POST   | /auth/register     | Register new user | ❌            |
| POST   | /auth/login        | Login user        | ❌            |
| POST   | /auth/google-login | Login with Google | ❌            |

### Characters

| Method | Endpoint        | Description         | Auth Required |
| ------ | --------------- | ------------------- | ------------- |
| GET    | /characters     | Get all characters  | ❌            |
| GET    | /characters/:id | Get character by id | ❌            |

### Builds

| Method | Endpoint    | Description        | Auth Required |
| ------ | ----------- | ------------------ | ------------- |
| GET    | /builds     | Get all my builds  | ✅            |
| POST   | /builds     | Create a new build | ✅            |
| GET    | /builds/:id | Get build by id    | ✅            |
| PUT    | /builds/:id | Update build by id | ✅            |
| DELETE | /builds/:id | Delete build by id | ✅            |

### AI

| Method | Endpoint    | Description          | Auth Required |
| ------ | ----------- | -------------------- | ------------- |
| POST   | /ai/analyze | Analyze team with AI | ✅            |

---

## Authentication

### 1. POST /auth/register

Description:

- Register a new traveler account

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "email": "traveler@mail.com",
  "createdAt": "2026-04-20T00:00:00.000Z",
  "updatedAt": "2026-04-20T00:00:00.000Z"
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Email is required" }
```

OR

```json
{ "message": "Email cannot be empty" }
```

OR

```json
{ "message": "Please provide a valid email address" }
```

OR

```json
{ "message": "Password is required" }
```

OR

```json
{ "message": "Password cannot be empty" }
```

OR

```json
{ "message": "email must be unique" }
```

---

### 2. POST /auth/login

Description:

- Login with email and password

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Email is required" }
```

OR

```json
{ "message": "Password is required" }
```

_Response (401 - Unauthorized)_

```json
{ "message": "Invalid Email/Password" }
```

---

### 3. POST /auth/google-login

Description:

- Login or register using Google OAuth

Request:

- headers:

```json
{
  "access_token_google": "string (Google ID Token)"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Invalid Token" }
```

OR

```json
{ "message": "Email is not verified" }
```

---

## Characters

### 1. GET /characters

Description:

- Get all Genshin Impact characters from the local `genshin-db` package
- Supports filter by vision, weapon, nation, and rarity
- Character images are served from Enka Network

Request:

- query params (optional):

| Param  | Type    | Description              | Example       |
| ------ | ------- | ------------------------ | ------------- |
| vision | string  | Filter by element        | ?vision=Cryo  |
| weapon | string  | Filter by weapon type    | ?weapon=Sword |
| nation | string  | Filter by nation         | ?nation=Liyue |
| rarity | integer | Filter by rarity (4 / 5) | ?rarity=5     |

_Response (200 - OK)_

```json
[
  {
    "id": 10000114,
    "name": "Skirk",
    "vision": "Cryo",
    "weapon": "Sword",
    "nation": null,
    "rarity": 5,
    "images": {
      "icon": "https://enka.network/ui/UI_AvatarIcon_SkirkNew.png",
      "splash": "https://enka.network/ui/UI_Gacha_AvatarImg_SkirkNew.png"
    }
  },
  "..."
]
```

---

### 2. GET /characters/:id

Description:

- Get character detail by name
- `:id` is the character's name, **case-sensitive**, exactly as returned from `GET /characters`
- Example: `/characters/Skirk`, `/characters/Hu Tao`

Request:

- params:

```json
{
  "id": "string (required) — e.g. \"Skirk\", \"Hu Tao\""
}
```

_Response (200 - OK)_

```json
{
  "id": 10000114,
  "name": "Skirk",
  "title": "Void Star",
  "description": "A visitor who once appeared in an Abyssal rift and the Primordial Sea...",
  "rarity": 5,
  "vision": "Cryo",
  "weapon": "Sword",
  "nation": null,
  "affiliation": "Cosmic Calamity",
  "birthday": "November 5",
  "constellation": "Crystallina",
  "cv": {
    "english": "Cat Protano",
    "chinese": "谢莹",
    "japanese": "能登麻美子",
    "korean": "Seo Da-hye"
  },
  "skillTalents": [
    {
      "name": "Havoc: Sunder",
      "description": "Normal Attack\nPerforms up to 5 consecutive attacks...",
      "attributes": { "labels": ["..."], "parameters": {} }
    },
    "..."
  ],
  "passiveTalents": [
    {
      "name": "Reason Beyond Reason",
      "description": "When nearby party members trigger Frozen, Superconduct..."
    },
    "..."
  ],
  "constellations": [
    {
      "name": "Far to Fall",
      "description": "Enhances the effects of the Ascension Talent Reason Beyond Reason..."
    },
    "..."
  ],
  "images": {
    "icon": "https://enka.network/ui/UI_AvatarIcon_SkirkNew.png",
    "portrait": null,
    "card": "https://enka.network/ui/UI_AvatarIcon_SkirkNew_Card.png",
    "splash": "https://enka.network/ui/UI_Gacha_AvatarImg_SkirkNew.png"
  }
}
```

_Response (404 - Not Found)_

```json
{ "message": "Character not found" }
```

---

## Builds

### 1. GET /builds

Description:

- Get all builds belonging to the logged in traveler
- Each `BuildCharacter` entry is enriched with `icon`, `vision`, and `splash` from Enka Network

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Cryo Freeze Comp",
    "description": "High damage freeze team",
    "travelerId": 1,
    "createdAt": "2026-04-20T00:00:00.000Z",
    "updatedAt": "2026-04-20T00:00:00.000Z",
    "BuildCharacters": [
      {
        "id": 1,
        "buildId": 1,
        "characterId": "Skirk",
        "slot": 1,
        "icon": "https://enka.network/ui/UI_AvatarIcon_SkirkNew.png",
        "vision": "Cryo",
        "splash": "https://enka.network/ui/UI_Gacha_AvatarImg_SkirkNew.png"
      },
      "..."
    ]
  },
  "..."
]
```

---

### 2. POST /builds

Description:

- Create a new build with minimum 1 and maximum 4 characters
- `characters` array must contain character names exactly as returned from `GET /characters`

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "characters": ["Skirk", "Furina", "Layla", "Zhongli"]
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "name": "Cryo Freeze Comp",
  "description": "High damage freeze team",
  "travelerId": 1,
  "createdAt": "2026-04-20T00:00:00.000Z",
  "updatedAt": "2026-04-20T00:00:00.000Z",
  "BuildCharacters": [
    {
      "id": 1,
      "buildId": 1,
      "characterId": "Skirk",
      "slot": 1,
      "icon": "https://enka.network/ui/UI_AvatarIcon_SkirkNew.png",
      "vision": "Cryo",
      "splash": "https://enka.network/ui/UI_Gacha_AvatarImg_SkirkNew.png"
    },
    "..."
  ]
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Build name is required" }
```

OR

```json
{ "message": "At least 1 character is required" }
```

OR

```json
{ "message": "Maximum 4 characters per build" }
```

---

### 3. GET /builds/:id

Description:

- Get build detail by id
- Only accessible by the owner of the build

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Cryo Freeze Comp",
  "description": "High damage freeze team",
  "travelerId": 1,
  "createdAt": "2026-04-20T00:00:00.000Z",
  "updatedAt": "2026-04-20T00:00:00.000Z",
  "BuildCharacters": [
    {
      "id": 1,
      "buildId": 1,
      "characterId": "Skirk",
      "slot": 1,
      "icon": "https://enka.network/ui/UI_AvatarIcon_SkirkNew.png",
      "vision": "Cryo",
      "splash": "https://enka.network/ui/UI_Gacha_AvatarImg_SkirkNew.png"
    },
    "..."
  ]
}
```

_Response (404 - Not Found)_

```json
{ "message": "Build not found" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized to access this build" }
```

---

### 4. PUT /builds/:id

Description:

- Update build by id
- Only accessible by the owner of the build
- Replaces all existing characters with the new `characters` array

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "characters": ["Skirk", "Furina", "Layla", "Zhongli"]
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Cryo Freeze Comp Updated",
  "description": "Updated comp",
  "travelerId": 1,
  "createdAt": "2026-04-20T00:00:00.000Z",
  "updatedAt": "2026-04-20T00:00:00.000Z",
  "BuildCharacters": [
    {
      "id": 5,
      "buildId": 1,
      "characterId": "Skirk",
      "slot": 1,
      "icon": "https://enka.network/ui/UI_AvatarIcon_SkirkNew.png",
      "vision": "Cryo",
      "splash": "https://enka.network/ui/UI_Gacha_AvatarImg_SkirkNew.png"
    },
    "..."
  ]
}
```

_Response (400 - Bad Request)_

```json
{ "message": "At least 1 character is required" }
```

OR

```json
{ "message": "Maximum 4 characters per build" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized to access this build" }
```

_Response (404 - Not Found)_

```json
{ "message": "Build not found" }
```

---

### 5. DELETE /builds/:id

Description:

- Delete build by id
- Only accessible by the owner of the build

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{ "message": "Build deleted successfully" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized to access this build" }
```

_Response (404 - Not Found)_

```json
{ "message": "Build not found" }
```

---

## AI

### 1. POST /ai/analyze

Description:

- Analyze a team composition using Gemini AI (`gemini-3-flash-preview`)
- Characters are enriched with element data from `genshin-db` before being sent to the AI
- Returns team name, rating, synopsis, elemental reactions, strengths, weaknesses, and playstyle
- `characters` array must contain character names exactly as returned from `GET /characters`

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "characters": ["Skirk", "Furina", "Layla", "Zhongli"]
}
```

_Response (200 - OK)_

```json
{
  "teamName": "Frozen Void",
  "overallRating": "S",
  "synopsis": "A powerful freeze team centered around Skirk's extreme Cryo damage output...",
  "elementalReactions": ["Frozen", "Shatter", "Crystallize"],
  "strengths": [
    "Extremely high Cryo DPS from Skirk",
    "Consistent Frozen uptime via Furina Hydro application",
    "Strong shield coverage from Zhongli"
  ],
  "weaknesses": [
    "Heavily reliant on Cryo/Hydro synergy",
    "Struggles against Cryo-immune enemies"
  ],
  "playstyle": "Rotate supports to apply Hydro and shields, then switch to Skirk for massive Cryo burst damage..."
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Characters is required" }
```

OR

```json
{ "message": "Maximum 4 characters per team" }
```

---

## Global Error Responses

_Response (401 - Unauthorized)_

```json
{ "message": "Invalid Token" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized to access this build" }
```

_Response (500 - Internal Server Error)_

```json
{ "message": "Internal Server Error" }
```
