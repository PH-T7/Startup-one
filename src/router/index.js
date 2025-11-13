import { createRouter, createWebHistory } from "vue-router";
import store from "../lib/store.js"; // Importe a store
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Profile from "../pages/Profile.vue";
import PostDetail from "../pages/PostDetail.vue";
import Tag from "../pages/Tag.vue";
import EditProfile from "../pages/EditProfile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/perfil/:username",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    component: PostDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/tags/:tagName",
    name: "Tag",
    component: Tag,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// O GUARDA DE ROTA (AGORA SIMPLES E INFALÍVEL)
// Este código roda DEPOIS que a store já foi inicializada (graças ao main.js)
router.beforeEach((to, from, next) => {
  const { currentUser } = store.state;
  const requiresAuth = to.meta.requiresAuth;
  const requiresGuest = to.meta.requiresGuest;

  if (requiresAuth && !currentUser) {
    // Se a rota exige login E o usuário NÃO está logado, vá para o Login
    next({ name: "Login" });
  } else if (requiresGuest && currentUser) {
    // Se a rota é para visitantes E o usuário JÁ está logado, vá para a Home
    next({ name: "Home" });
  } else {
    // Em todos os outros casos, pode ir
    next();
  }
});

export default router;
