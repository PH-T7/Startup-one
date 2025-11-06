import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue"; // Importa sua Home
import Login from "../pages/Login.vue"; // Importa o Login do seu amigo
import Profile from "../pages/Profile.vue";
import PostDetail from "../pages/PostDetail.vue";
import Tag from "../pages/Tag.vue";
// 1. Define as rotas (URLs)
const routes = [
  {
    path: "/", // A URL "raiz" do site
    name: "Home",
    component: Home, // Carrega o componente Home.vue
  },
  {
    path: "/login", // A URL "site.com/login"
    name: "Login",
    component: Login, // Carrega o componente Login.vue
  },
  {
    // O ":username" é uma prop dinâmica.
    // Isso vai pegar a URL (ex: /perfil/ArtistaManga)
    path: "/perfil/:username",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/post/:id", // Ex: /post/123
    name: "PostDetail",
    component: PostDetail,
  },
  {
    path: "/tags/:tagName",
    name: "Tag",
    component: Tag,
  },
];

// 2. Cria a instância do roteador
const router = createRouter({
  history: createWebHistory(),
  routes, // usa as rotas que definimos
});

export default router;
