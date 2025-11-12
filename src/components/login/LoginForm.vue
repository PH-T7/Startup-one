<template>
    <form
        class="login-form"
        @submit.prevent="isSignUp ? handleSignUp() : handleLogin()"
    >
        <h2>{{ isSignUp ? "Criar Conta" : "Login" }}</h2>
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
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">
            {{ successMessage }}
        </p>
        <BaseButton type="submit">
            {{ isSignUp ? "Criar Conta" : "Entrar" }}
        </BaseButton>
        <a href="#" @click.prevent="toggleMode" class="toggle-link">
            {{
                isSignUp
                    ? "Já tem uma conta? Faça login."
                    : "Não tem uma conta? Crie uma."
            }}
        </a>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../lib/supabase";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";

const email = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref(null);
const successMessage = ref(null);
const isSignUp = ref(false);

function toggleMode() {
    isSignUp.value = !isSignUp.value;
    errorMessage.value = null;
    successMessage.value = null;
}

async function handleLogin() {
    try {
        errorMessage.value = null;
        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });
        if (error) throw error;
        router.push("/");
    } catch (error) {
        errorMessage.value = "Email ou senha inválidos.";
        console.error("Error logging in:", error.message);
    }
}

async function handleSignUp() {
    try {
        errorMessage.value = null;
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });
        if (error) throw error;
        if (
            data.user &&
            data.user.identities &&
            data.user.identities.length === 0
        ) {
            errorMessage.value = "Este email já está em uso.";
            return;
        }
        successMessage.value =
            "Conta criada! Por favor, verifique seu email para confirmar.";
    } catch (error) {
        errorMessage.value = error.message;
        console.error("Error signing up:", error.message);
    }
}
</script>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 400px;
    padding: 24px;
    background-color: #222;
    border-radius: 8px;
}
h2 {
    text-align: center;
    margin-top: 0;
}
.error-message {
    color: #ff5555;
    text-align: center;
    margin: -10px 0;
}
.success-message {
    color: #42b883;
    text-align: center;
    margin: -10px 0;
}
.toggle-link {
    color: #aaa;
    text-align: center;
    font-size: 0.9em;
    text-decoration: none;
}
.toggle-link:hover {
    text-decoration: underline;
}
</style>
