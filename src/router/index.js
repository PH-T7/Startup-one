import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue"; // Importa sua Home
import Login from "../pages/Login.vue"; // Importa o Login do seu amigo

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
  // (Vocês vão adicionar /perfil, /post/:id, etc. aqui no futuro)
];

// 2. Cria a instância do roteador
const router = createRouter({
  history: createWebHistory(),
  routes, // usa as rotas que definimos
});

export default router;
