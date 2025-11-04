<template>
    <nav class="navbar">
        <button v-if="showBackButton" @click="goBack" class="back-button">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 18L9 12L15 6"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>

        <router-link v-else to="/" class="logo-link"> Nexo Art </router-link>
    </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 'computed' significa que esta variável reage a mudanças na rota
const showBackButton = computed(() => {
    return route.path !== "/"; // Mostra o botão se a rota NÃO FOR a Home
});

function goBack() {
    router.go(-1); // Função do Vue Router para "voltar" no histórico
}
</script>

<style scoped>
.navbar {
    padding: 15px;
    display: flex;
    align-items: center;
}

.back-button {
    background: none;
    border: 1px solid #444;
    color: white;
    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
}
.back-button:hover {
    background-color: #222;
}

.logo-link {
    font-size: 1.5em;
    font-weight: 700;
    color: white;
    text-decoration: none;
}
</style>
