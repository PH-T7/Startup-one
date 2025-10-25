import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // <-- 1. Importe seu roteador

// 2. Crie o app e dê .use(router) ANTES de .mount()
createApp(App).use(router).mount("#app");
