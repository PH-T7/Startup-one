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
            <router-link
                :to="`/perfil/${store.state.currentUser.username}`"
                aria-label="Meu Perfil"
            >
                <Avatar :src="store.state.currentUser.avatar_url" />
            </router-link>

            <button class="logout-button" @click="handleLogout">Sair</button>
        </div>

        <div v-else>
            <router-link :to="{ name: 'Login' }">Entrar</router-link>
        </div>
    </nav>
</template>

<style scoped>
.nav-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px; /* Aumentei um pouco o espaço */
    padding-top: 20px;
}

/* NOVO: Remove qualquer sublinhado do link do avatar */
.nav-container a {
    text-decoration: none;
    display: inline-block; /* Bom para hover */
    transition: transform 0.2s ease;
    border-radius: 50%; /* Acompanha o avatar */
}

/* NOVO: Efeito de hover no avatar para mostrar que é clicável */
.nav-container a:hover {
    transform: scale(1.05); /* Leve "zoom" */
    opacity: 0.9; /* Leve transparência */
}

/* Estilo do botão Sair (já existe) */
.logout-button {
    padding: 8px 12px;
    border: none;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: 600;
    cursor: pointer;
    background-color: #d1495b; /* Vermelho */
    color: white;
    transition: background-color 0.2s;
}

.logout-button:hover {
    background-color: #a73c4a; /* Vermelho escuro */
}
</style>
