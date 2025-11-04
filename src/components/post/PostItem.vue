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

        <router-link :to="`/post/${postId}`">
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
            <img src="@/assets/edit.svg" class="icon" @click="handleEdit" />

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
import { ref } from "vue";

// SÓ UM defineProps com TUDO
defineProps({
    postId: [String, Number], // Para o link do post
    username: String,
    text: String,
    avatarUrl: String, // Para o avatar
    imageUrl: String, // Para a imagem principal
    commissionStatus: String,
});

// Lógica "fake" para o like
const isLiked = ref(false);
function handleLike() {
    isLiked.value = !isLiked.value; // Inverte o valor (true/false)
    console.log("Post curtido!", isLiked.value);
}

function handleComment() {
    console.log("Abrir caixa de comentários...");
}

function handleEdit() {
    console.log("Editar post...");
}
</script>

<style scoped>
/* "scoped" significa que esse CSS só afeta ESTE componente */
.post-card {
    border: 1px solid #444; /* Borda cinza escura */
    border-radius: 8px;
    background-color: #222; /* Fundo do card escuro */
    color: white; /* Texto branco */
    max-width: 500px; /* Largura máxima do post */
    margin: 20px auto; /* Centraliza o post na tela */
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
    object-fit: cover; /* Garante que a imagem não distorça */
}

.user-info p {
    margin: 0;
    font-size: 0.9em;
}

.post-image {
    width: 100%;
    max-height: 70vh; /* Limita a altura em telas grandes */
    object-fit: cover; /* Cobre o espaço sem distorcer */
    background-color: #333; /* Fundo enquanto a imagem carrega */
}

.post-image::before {
    content: "📷"; /* Ícone de câmera (como no seu wireframe) */
}

.post-actions {
    display: flex;
    justify-content: space-around;
    padding: 15px;
    font-size: 1.5em;
}

.post-actions span {
    cursor: pointer;
}

.icon-liked {
    /* Filtro para transformar o SVG branco em vermelho */
    filter: invert(30%) sepia(90%) saturate(5000%) hue-rotate(350deg)
        brightness(100%) contrast(100%);
}

.username-link {
    color: inherit; /* Herda a cor branca */
    text-decoration: none;
}
.username-link:hover {
    text-decoration: underline;
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
    background-color: #3aa073; /* Verde */
    color: white;
}
.commission-badge.fechado {
    background-color: #d1495b; /* Vermelho */
    color: white;
}
.commission-badge.lista-de-espera {
    background-color: #fca311; /* Laranja */
    color: white;
}
</style>
