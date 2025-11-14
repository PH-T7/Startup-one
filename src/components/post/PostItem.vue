<template>
    <div class="post-card">
        <div class="post-header">
            <img :src="avatarUrl" alt="Avatar" class="avatar" />
            <div class="user-info">
                <router-link :to="`/perfil/${username}`" class="username-link">
                    <strong>{{ username }}</strong>
                    <span
                        v-if="commissionStatus"
                        :class="[
                            'commission-badge',
                            commissionStatus.toLowerCase().replace(' ', '-'),
                        ]"
                    >
                        {{ commissionStatus }}
                    </span>
                </router-link>
                <p>{{ text }}</p>
            </div>
        </div>

        <router-link :to="`/post/${postId}`" v-if="imageUrl">
            <img :src="imageUrl" alt="Arte do post" class="post-image" />
        </router-link>

        <div class="post-actions">
            <img
                src="@/assets/heart.svg"
                class="icon"
                :class="{ 'icon-liked': isLiked }"
                @click="handleLike"
            />
            <img
                src="@/assets/message-square.svg"
                class="icon"
                @click="handleComment"
            />

            <img
                v-if="isMyPost"
                src="@/assets/edit.svg"
                class="icon"
                @click="handleEdit"
            />

            <img
                src="@/assets/refresh-cw.svg"
                class="icon"
                @click="handleRepeat"
            />
            <img src="@/assets/star.svg" class="icon" @click="handleShare" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/lib/supabaseClient.js"; // Importe o Supabase
import store from "@/lib/store.js"; // Importe a Store

const props = defineProps({
    post: Object,
});

const router = useRouter();
const currentUser = computed(() => store.state.currentUser);

const postId = computed(() => props.post.id);
const username = computed(() => props.post.profiles.username);
const text = computed(() => props.post.text);
const avatarUrl = computed(() => props.post.profiles.avatar_url);

// --- A CORREÇÃO ESTÁ AQUI ---
// Mudamos de props.post.imageUrl para props.post.image_url
const imageUrl = computed(() => props.post.image_url);
// -----------------------------

const commissionStatus = computed(() => props.post.profiles.missionstatus);

const isLiked = ref(props.post.isLikedByMe);
const likeCount = ref(props.post.likeCount);
const isLoadingLike = ref(false);

const isMyPost = computed(() => {
    return currentUser.value && currentUser.value.id === props.post.user_id;
});

async function handleLike() {
    if (!currentUser.value || isLoadingLike.value) return;

    isLoadingLike.value = true;

    try {
        if (isLiked.value) {
            const { error } = await supabase.from("likes").delete().match({
                post_id: postId.value,
                user_id: currentUser.value.id,
            });

            if (error) throw error;

            isLiked.value = false;
            likeCount.value--;
        } else {
            const { error } = await supabase.from("likes").insert({
                post_id: postId.value,
                user_id: currentUser.value.id,
            });

            if (error) throw error;

            isLiked.value = true;
            likeCount.value++;
        }
    } catch (error) {
        console.error("Erro ao curtir:", error.message);
    } finally {
        isLoadingLike.value = false;
    }
}

function handleComment() {
    router.push(`/post/${postId.value}`);
}

function handleEdit() {
    alert("Função de editar o post!");
}

function handleRepeat() {
    console.log("Repostar...");
}
function handleShare() {
    console.log("Compartilhar...");
}
</script>

<style scoped>
/* Estilos permanecem os mesmos */
.post-card {
    border: 1px solid #444;
    border-radius: 8px;
    background-color: #222;
    color: white;
    max-width: 500px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
}
.post-header {
    display: flex;
    align-items: center;
    padding: 10px;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
}
.user-info {
    display: flex;
    flex-direction: column;
}
.user-info p {
    margin: 0;
    font-size: 0.9em;
}
.username-link {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
}
.username-link:hover {
    text-decoration: underline;
}
.post-image {
    width: 100%;
    max-height: 70vh;
    object-fit: cover;
    background-color: #333;
    display: block;
}
.post-actions {
    display: flex;
    justify-content: space-around;
    padding: 15px;
    font-size: 1.5em;
}
.post-actions span,
.post-actions img {
    cursor: pointer;
}
.icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    filter: invert(1); /* Deixa o SVG branco */
}
.icon-liked {
    /* Este é o filtro que deixa o coração vermelho */
    filter: invert(30%) sepia(90%) saturate(5000%) hue-rotate(350deg)
        brightness(100%) contrast(100%);
}
.icon {
    /* ... (estilos existentes) ... */

    /* ADICIONE/AJUSTE ESTES */
    font-size: 24px; /* Tamanho do emoji */
    filter: none; /* Remove o 'invert(1)' que não é mais necessário */
    opacity: 0.7;
    transition: all 0.2s ease;
}
.icon:hover {
    opacity: 1;
    transform: scale(1.1);
}
.icon-liked {
    /* ... (estilo existente) ... */
    filter: none; /* Remove o filtro de cor */
    opacity: 1;
    /* Adiciona o filtro vermelho de volta, mas de forma seletiva */
    filter: invert(30%) sepia(90%) saturate(5000%) hue-rotate(350deg)
        brightness(100%) contrast(100%);
}
.commission-badge {
    font-size: 0.7em;
    font-weight: 600;
    padding: 3px 6px;
    border-radius: 10px;
    margin-left: 8px;
    vertical-align: middle;
}
.commission-badge.aberto {
    background-color: #3aa073;
    color: white;
}
.commission-badge.fechado {
    background-color: #d1495b;
    color: white;
}
.commission-badge.lista-de-espera {
    background-color: #fca311;
    color: white;
}
</style>
