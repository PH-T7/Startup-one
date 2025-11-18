# Nexo Art (Startup One Project)

*"Where colors tell the stories words cannot reach."*

Nexo Art is a functional prototype of a social network platform focused on digital artists, illustrators, and manga creators.

---

## About the Project

This project is being developed as an evaluation for the **Applied Project: Startup One** course in the Systems Analysis and Development program at Facens.

The goal is to create a platform that values artists, combining the interactivity and sense of community of a social feed (like X/Twitter) with the curated visual experience of a professional portfolio (such as Pinterest, Tumblr, or Pixiv).

The platform aims to solve a core issue artists face on generic social networks: the difficulty of displaying their work in an organized way and finding commission opportunities.

---

## Implemented Features

- **Real-time Feed:** The main feed loads posts directly from the Supabase database.
- **Post Creation:** Users can publish text posts and **upload images** via Supabase Storage.
- **Full Navigation (Vue Router):** Single Page Application (SPA) with routes for Home, Login, User Profile, and Post Details.
- **Dynamic Artist Profiles:** Profile pages (e.g., `/perfil/MangaArtist`) load artist data and display **Portfolio** (grid) and **Feed** (list) tabs.
- **Artist-Centered Design:** Unique features such as “Commission Status” shown in profiles and in the feed, plus a “Featured Artist” section.
- **Connected Backend:** Fully functional and integrated with Supabase following backend-as-a-service (BaaS) guidelines from the course.

---

## Tech Stack

- **Frontend:** Vue.js 3 (with Vite)
- **Routing:** Vue Router
- **Backend (BaaS):** Supabase
- **Database:** Supabase
- **Authentication:** Supabase Auth (Email/Password, Google OAuth)
- **File Storage:** Supabase Storage

---

## How to Run the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/PH-77/Startup-one.git
```
### 2. Enter the project folder
```bash
cd Startup-one
```
### 3. Install dependencies
```bash
npm install
```

### 4. Configure Backend Keys
```bash
VITE_SUPABASE_URL="YOUR_PROJECT_URL"
VITE_SUPABASE_KEY="YOUR_ANON_PUBLIC_KEY"
```

---

# Database Setup (Supabase)
##  Create the Database Structure

#### In the Supabase dashboard:

#### Go to Table Editor and create a table named posts.

Add the following columns:

user — text

text — text

avatarUrl — text

imageUrl — text

missionStatus — text

created_at — timestamptz (default: now())

#### Go to Storage → create a public bucket named uploads.

#### Go to Authentication → Policies

Disable Row Level Security (RLS)
or Create SELECT and INSERT policies with the condition: true

### Run the Development Server
```bash
npm run dev
```
### Open the project in your browser 
```bash
http://localhost:5173
```
---

### License 
This project is for academic and educational purposes as part of the Startup One discipline at Facens.

