import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./lib/store.js"; // <-- 1. Importa a store

async function startApp() {
  // 2. ESPERA a store carregar o usuário
  await store.initializeAuth();

  // 3. SÓ ENTÃO cria o app
  const app = createApp(App);

  // 4. Usa o roteador
  app.use(router);

  // 5. Monta o app
  app.mount("#app");
}

// 6. Inicia o app
startApp();
