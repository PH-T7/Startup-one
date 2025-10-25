<template>
    <form class="login-form" @submit.prevent="handleLogin">
        <h2>Login</h2>
        <BaseInput
            label="Email"
            type="email"
            placeholder="seu@email.com"
            v-model="email"
        />
        <BaseInput
            label="Senha"
            type="password"
            placeholder="Sua senha"
            v-model="password"
        />
        <BaseButton type="submit"> Entrar (Fake) </BaseButton>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // 1. Importe o Roteador
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";

// Variáveis para guardar o que o usuário digita
const email = ref("");
const password = ref("");

// 2. Pegue a instância do roteador
const router = useRouter();

// 3. A mágica do "quebra-galho"
function handleLogin() {
    // Lógica de login fake:
    // Não importa o que o usuário digitar,
    // apenas finja que o login deu certo e navegue para a Home.

    console.log("Login fake com:", email.value, password.value);

    // 4. Navega o usuário para a rota '/' (Home)
    router.push("/");
}
</script>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Cria espaço entre os inputs e o botão */
    width: 100%;
    max-width: 400px; /* Define uma largura máxima para o form */
    padding: 24px;
    background-color: #222;
    border-radius: 8px;
}
h2 {
    text-align: center;
    margin-top: 0;
}
</style>
