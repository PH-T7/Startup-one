# Nexo Art (Startup One Project)

*"Where colors tell the stories words cannot reach."*

Nexo Art is a full-stack functional prototype of a social network platform focused on digital artists, illustrators, and creators.

---

## About the Project

This project is being developed as an evaluation for the **Applied Project: Startup One** course in the Systems Analysis and Development program at Facens.

The goal is to create a platform that values artists, combining the interactivity and sense of community of a social feed (like X/Twitter) with the curated visual experience of a professional portfolio (such as Pinterest, Tumblr, or Pixiv).

The platform aims to solve a core issue artists face on generic social networks: the difficulty of displaying their work in an organized way and finding commission opportunities.

---

## Implemented Features

This prototype is a complete full-stack application.

-   **Full-stack Authentication System:**
    -   User **Registration** (Signup).
    -   User **Login** with email/password and **Google OAuth**.
    -   **Password Recovery** flow via Supabase Auth.

-   **Complete Post CRUD:**
    -   **Create** posts with text and image uploads.
    -   **Read** posts in feeds.
    -   **Update** post text via an inline editing interface.
    -   **Delete** posts (with confirmation).

-   **Social Graph & Engagement:**
    -   **Follow / Unfollow** system.
    -   **Like / Unlike** system with real-time counts.
    -   **Commenting** system on post detail pages.

-   **Dynamic Artist Profiles:**
    -   Dynamic profile pages (`/perfil/:username`).
    -   Functional **Portfolio** tab (image grid) and **Feed** tab (full posts).
    -   Full **Profile Editing** page, including avatar upload, bio, and **Commission Status**.

-   **Content Discovery:**
    -   **"Trending Tags"** sidebar that automatically finds and counts tags (e.g., `#art`) from all posts.
    -   **"Following Feed"** sidebar showing recent posts from followed users.
    -   **"Featured Artist"** sidebar that strategically promotes artists with **"Commissions Open"**.

---

## Tech Stack

-   **Frontend:** Vue.js 3 (Composition API with `<script setup>`)
-   **Bundler:** Vite
-   **Routing:** Vue Router
-   **State Management:** Vue 3 Reactive Store (custom `store.js`)
-   **Backend (BaaS):** Supabase
-   **Database:** Supabase (PostgreSQL)
-   **Authentication:** Supabase Auth
-   **File Storage:** Supabase Storage

---

## How to Run the Project Locally

### 1. Clone the repository
```bash
git clone [https://github.com/PH-T7/Startup-one.git](https://github.com/PH-T7/Startup-one.git)
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

### 1. Storage Bucket:

In your Supabase project, go to Storage and create one public Bucket named uploads.

### 2. Database Tables (SQL Editor).

Go to the SQL Editor in your Supabase dashboard and run the SQL script below. This will create all the necessary tables and their relationships.

(Note: Row Level Security (RLS) is disabled for this prototype. For a production environment, RLS policies for SELECT, INSERT, UPDATE, and DELETE would be required for each table.)
```bash
-- 1. Tabela de Perfis de Usuário
-- Armazena dados públicos do usuário e é ligada ao 'auth.users' do Supabase.
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL UNIQUE,
  avatar_url text,
  bio text,
  missionstatus text, -- Coluna para o Status de Comissão
  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);

-- 2. Tabela de Posts
-- Armazena os posts, linkados ao 'profiles.id' do autor.
CREATE TABLE public.posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text text,
  image_url text, -- (Note: snake_case)
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT posts_pkey PRIMARY KEY (id)
);

-- 3. Tabela de Likes
-- Tabela de junção para likes (Muitos-para-Muitos).
CREATE TABLE public.likes (
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  CONSTRAINT likes_pkey PRIMARY KEY (user_id, post_id)
);

-- 4. Tabela de Comentários
-- Armazena comentários, linkados ao autor e ao post.
CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id)
);

-- 5. Tabela de Seguidores
-- Tabela de junção para o sistema de "seguir" (Muitos-para-Muitos).
CREATE TABLE public.followers (
  follower_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT followers_pkey PRIMARY KEY (follower_id, following_id)
);
```

### 3. Run the Development Server
```bash
npm run dev
```
### 4. Open the project in your browser 
```bash
http://localhost:5173
```
---

### License 
This project is for academic and educational purposes as part of the Startup One discipline at Facens.

