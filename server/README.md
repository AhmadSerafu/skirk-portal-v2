# Skirk Portal API

## Base URL

`https://api.skirk.my.id`

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
{
  "message": "Email is required"
}
```

OR

```json
{
  "message": "Email cannot be empty"
}
```

OR

```json
{
  "message": "Please provide a valid email address"
}
```

OR

```json
{
  "message": "Password is required"
}
```

OR

```json
{
  "message": "Password cannot be empty"
}
```

OR

```json
{
  "message": "email must be unique"
}
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
{
  "message": "Email is required"
}
```

OR

```json
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email/Password"
}
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
{
  "message": "Invalid Token"
}
```

OR

```json
{
  "message": "Email is not verified"
}
```

---

## Characters

### 1. GET /characters

Description:

- Get all Genshin Impact characters
- Support filter by vision, weapon, nation, and rarity

Request:

- query params (optional):

| Param  | Type    | Description              | Example       |
| ------ | ------- | ------------------------ | ------------- |
| vision | string  | Filter by element        | ?vision=pyro  |
| weapon | string  | Filter by weapon type    | ?weapon=sword |
| nation | string  | Filter by nation         | ?nation=liyue |
| rarity | integer | Filter by rarity (4 / 5) | ?rarity=5     |

_Response (200 - OK)_

```json
[
  {
    "id": "hu-tao",
    "name": "Hu Tao",
    "vision": "Pyro",
    "weapon": "Polearm",
    "nation": "Liyue",
    "rarity": 5,
    "constellation": "Papilio Charontis",
    "birthday": "07/15",
    "description": "..."
  },
  "..."
]
```

---

### 2. GET /characters/:id

Description:

- Get character detail by id

Request:

- params:

```json
{
  "id": "string (required) e.g. hu-tao"
}
```

_Response (200 - OK)_

```json
{
  "id": "hu-tao",
  "name": "Hu Tao",
  "vision": "Pyro",
  "weapon": "Polearm",
  "nation": "Liyue",
  "rarity": 5,
  "constellation": "Papilio Charontis",
  "birthday": "07/15",
  "description": "...",
  "skillTalents": ["..."],
  "passiveTalents": ["..."],
  "constellations": ["..."]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Character not found"
}
```

---

## Builds

### 1. GET /builds

Description:

- Get all builds belonging to the logged in traveler

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
    "name": "Hu Tao Vaporize",
    "description": "Strong vaporize comp",
    "travelerId": 1,
    "createdAt": "2026-04-20T00:00:00.000Z",
    "updatedAt": "2026-04-20T00:00:00.000Z",
    "BuildCharacters": [
      {
        "id": 1,
        "buildId": 1,
        "characterId": "hu-tao",
        "slot": 1
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
  "characters": ["string (character id)", "..."]
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "name": "Hu Tao Vaporize",
  "description": "Strong vaporize comp",
  "travelerId": 1,
  "createdAt": "2026-04-20T00:00:00.000Z",
  "updatedAt": "2026-04-20T00:00:00.000Z",
  "BuildCharacters": [
    {
      "id": 1,
      "buildId": 1,
      "characterId": "hu-tao",
      "slot": 1
    },
    "..."
  ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Build name is required"
}
```

OR

```json
{
  "message": "At least 1 character is required"
}
```

OR

```json
{
  "message": "Maximum 4 characters per build"
}
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
  "name": "Hu Tao Vaporize",
  "description": "Strong vaporize comp",
  "travelerId": 1,
  "createdAt": "2026-04-20T00:00:00.000Z",
  "updatedAt": "2026-04-20T00:00:00.000Z",
  "BuildCharacters": [
    {
      "id": 1,
      "buildId": 1,
      "characterId": "hu-tao",
      "slot": 1
    },
    "..."
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Build not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to access this build"
}
```

---

### 4. PUT /builds/:id

Description:

- Update build by id
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

- body:

```json
{
  "name": "string",
  "description": "string",
  "characters": ["string (character id)", "..."]
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Hu Tao Vaporize Updated",
  "description": "Updated comp",
  "travelerId": 1,
  "createdAt": "2026-04-20T00:00:00.000Z",
  "updatedAt": "2026-04-20T00:00:00.000Z",
  "BuildCharacters": [
    {
      "id": 1,
      "buildId": 1,
      "characterId": "hu-tao",
      "slot": 1
    },
    "..."
  ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "At least 1 character is required"
}
```

OR

```json
{
  "message": "Maximum 4 characters per build"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to access this build"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Build not found"
}
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
{
  "message": "Build deleted successfully"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to access this build"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Build not found"
}
```

---

## AI

### 1. POST /ai/analyze

Description:

- Analyze a team composition using Gemini AI
- Returns team name, rating, synopsis, elemental reactions, strengths, weaknesses, and playstyle

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
  "characters": ["string (character id)", "..."]
}
```

_Response (200 - OK)_

```json
{
  "teamName": "Vaporize Overlord",
  "overallRating": "S",
  "synopsis": "A powerful vaporize team centered around Hu Tao...",
  "elementalReactions": ["Vaporize", "Frozen"],
  "strengths": [
    "High single target damage",
    "Strong sustain",
    "Flexible rotations"
  ],
  "weaknesses": [
    "Requires precise HP management",
    "Struggles against Hydro abyss"
  ],
  "playstyle": "Rotate supports to apply Hydro, then switch to Hu Tao for massive vaporize damage..."
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Characters is required"
}
```

OR

```json
{
  "message": "Maximum 4 characters per team"
}
```

---

## Global Error Responses

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to access this build"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
