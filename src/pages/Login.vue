<template>
    <div class="login-page-container">
        <LoginForm />
    </div>
</template>

<script setup>
import LoginForm from "../components/login/LoginForm.vue";
</script>

<style scoped>
.login-page-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh; /* Faz a página ocupar a tela inteira */
}
</style>
