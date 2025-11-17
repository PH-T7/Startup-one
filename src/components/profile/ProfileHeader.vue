<template>
    <div class="header-container">
        <img :src="avatar" :alt="username" class="header-avatar" />
        <div class="header-info">
            <div class="info-top-row">
                <h1 class="username">{{ username }}</h1>

                <button
                    v-if="!isMyProfile"
                    class="follow-button"
                    @click="handleFollow"
                    :disabled="isLoadingFollow"
                >
                    {{ isFollowing ? "Seguindo" : "Seguir" }}
                </button>

                <button
                    v-if="isMyProfile"
                    class="edit-profile-button"
                    @click="goToEditProfile"
                >
                    Editar Perfil
                </button>
            </div>
            <p class="bio">{{ bio }}</p>

            <div
                v-if="commissionStatus"
                :class="[
                    'commission-badge-profile',
                    commissionStatus.toLowerCase().replace(' ', '-'),
                ]"
            >
                Comissões: {{ commissionStatus }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
// Importações para a lógica de "seguir"
import { ref, onMounted, computed, watch } from "vue";
import store from "@/lib/store.js";
import { supabase } from "@/lib/supabaseClient.js";

const props = defineProps({
    username: String,
    avatar: String,
    bio: String,
    commissionStatus: String,
    isMyProfile: Boolean,
    profileId: String, // Prop necessária para a lógica de seguir
});

const router = useRouter();
const currentUser = computed(() => store.state.currentUser);

// --- Lógica para seguir ---
const isFollowing = ref(false);
const isLoadingFollow = ref(false);

async function checkIfFollowing() {
    if (!props.profileId || !currentUser.value) return;

    isLoadingFollow.value = true;
    try {
        const { data, error } = await supabase
            .from("followers")
            .select()
            .eq("follower_id", currentUser.value.id)
            .eq("following_id", props.profileId)
            .single();

        if (error && error.code !== "PGRST116") {
            throw error;
        }
        isFollowing.value = !!data;
    } catch (error) {
        console.error("Erro ao checar se segue:", error.message);
    } finally {
        isLoadingFollow.value = false;
    }
}

async function handleFollow() {
    isLoadingFollow.value = true;
    try {
        if (isFollowing.value) {
            // Deixar de Seguir
            const { error } = await supabase.from("followers").delete().match({
                follower_id: currentUser.value.id,
                following_id: props.profileId,
            });
            if (error) throw error;
            isFollowing.value = false;
        } else {
            // Seguir
            const { error } = await supabase.from("followers").insert({
                follower_id: currentUser.value.id,
                following_id: props.profileId,
            });
            if (error) throw error;
            isFollowing.value = true;
        }
    } catch (error) {
        console.error("Erro ao seguir/deixar de seguir:", error.message);
    } finally {
        isLoadingFollow.value = false;
    }
}

onMounted(checkIfFollowing);
watch(() => props.profileId, checkIfFollowing);

// --- Lógica de Editar Perfil ---
const goToEditProfile = () => {
    router.push("/edit-profile");
};
</script>

<style scoped>
.header-container {
    display: flex;
    align-items: center;
}
.header-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 30px;
    object-fit: cover;
}
.header-info {
    flex-grow: 1;
}
.info-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.username {
    font-size: 2em;
    margin: 0;
}
.follow-button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
}
.edit-profile-button {
    background-color: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
}
.edit-profile-button:hover {
    background-color: #222;
}
.bio {
    font-size: 1em;
    color: #ccc;
}

.commission-badge-profile {
    font-size: 0.9em;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 20px;
    display: inline-block; /* Para não ocupar a largura toda */
    margin-top: 10px;
}
.commission-badge-profile.aberto {
    background-color: #3aa073;
    color: white;
}
.commission-badge-profile.fechado {
    background-color: #d1495b;
    color: white;
}
.commission-badge-profile.lista-de-espera {
    background-color: #fca311;
    color: white;
}
</style>
