<script setup>
import store from "../../lib/store.js";
import { useRouter } from "vue-router";
import Avatar from "../common/Avatar.vue";

const router = useRouter();

async function handleLogout() {
    await store.signOut();
    router.push({ name: "Login" });
}
</script>

<template>
    <nav>
        <div v-if="store.state.currentUser" class="nav-container">
            <Avatar :src="store.state.currentUser.avatar_url" />

            <button @click="handleLogout">Sair</button>
        </div>

        <div v-else>
            <router-link :to="{ name: 'Login' }">Entrar</router-link>
        </div>
    </nav>
</template>

<style scoped>
/* Adicionando um CSS mínimo para o layout */
.nav-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
</style>
