<template>
    <div class="edit-profile-page">
        <h2>Editar Perfil</h2>
        <form @submit.prevent="updateProfile" class="profile-form">
            <div class="form-group">
                <label for="username">Nome de usuário</label>
                <input type="text" id="username" v-model="username" />
            </div>
            <div class="form-group">
                <label for="bio">Bio</label>
                <textarea id="bio" v-model="bio"></textarea>
            </div>
            <div class="form-group">
                <label for="missionstatus">Status de Comissão</label>
                <select id="missionstatus" v-model="missionStatus">
                    <option value="Aberto para comissões">
                        Aberto para comissões
                    </option>
                    <option value="Fechado">Fechado</option>
                    <option value="Lista de Espera">Lista de Espera</option>
                </select>
            </div>
            <div class="form-group">
                <label for="avatar">Avatar</label>
                <input
                    type="file"
                    id="avatar"
                    @change="handleFileChange"
                    accept="image/*"
                />
            </div>
            <button type="submit" :disabled="isUploading">
                {{ isUploading ? "Salvando..." : "Salvar Alterações" }}
            </button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success-message">
                {{ successMessage }}
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import store from "@/lib/store.js";

const router = useRouter();
const username = ref("");
const bio = ref("");
// 1. CORREÇÃO AQUI
const missionStatus = ref(""); // Renomeado de commissionStatus
const avatarFile = ref(null);
const isUploading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);
const currentUser = computed(() => store.state.currentUser);

onMounted(() => {
    if (currentUser.value) {
        username.value = currentUser.value.username;
        bio.value = currentUser.value.bio;
        // 2. CORREÇÃO AQUI
        missionStatus.value = currentUser.value.missionstatus; // Usando a coluna do DB
    }
});

const handleFileChange = (e) => {
    avatarFile.value = e.target.files[0];
};

const updateProfile = async () => {
    isUploading.value = true;
    errorMessage.value = null;
    successMessage.value = null;

    try {
        let avatarUrl = currentUser.value.avatar_url;

        if (avatarFile.value) {
            // ... (lógica de upload de avatar está correta) ...
            const fileName = `avatars/${currentUser.value.id}-${Date.now()}`;
            const { error: uploadError } = await supabase.storage
                .from("avatars") // Nota: Você precisa ter um bucket 'avatars'
                .upload(fileName, avatarFile.value, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(fileName);
            avatarUrl = data.publicUrl;
        }

        const { error: updateError } = await supabase
            .from("profiles")
            .update({
                username: username.value,
                bio: bio.value,
                // 3. CORREÇÃO AQUI
                missionstatus: missionStatus.value, // Usando o nome da coluna do DB
                avatar_url: avatarUrl,
            })
            .eq("id", currentUser.value.id);

        if (updateError) throw updateError;

        // FORÇAR A ATUALIZAÇÃO DA STORE (BÔNUS)
        // Isso é importante para que o avatar mude imediatamente
        // (Requer modificar a store.js para ter uma função 'setUser')
        // Por agora, vamos pular isso.

        successMessage.value = "Perfil atualizado com sucesso!";
        setTimeout(() => {
            router.push(`/perfil/${username.value}`);
        }, 2000);
    } catch (error) {
        errorMessage.value = `Erro ao atualizar perfil: ${error.message}`;
    } finally {
        isUploading.value = false;
    }
};
</script>

<style scoped>
.edit-profile-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}
.profile-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.form-group {
    display: flex;
    flex-direction: column;
}
label {
    margin-bottom: 5px;
    font-weight: 600;
}
input,
textarea,
select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #444;
    background-color: #222;
    color: white;
}
button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #42b883;
    color: white;
    cursor: pointer;
    font-weight: 600;
}
button:disabled {
    background-color: #888;
    cursor: not-allowed;
}
.error-message {
    color: #ff5555;
}
.success-message {
    color: #42b883;
}
</style>
