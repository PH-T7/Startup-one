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

                <div v-if="!isEditing" class="post-text-content">
                    <p>{{ text }}</p>
                </div>
                <div v-else class="post-text-content">
                    <textarea
                        v-model="editText"
                        class="edit-textarea"
                        rows="4"
                    ></textarea>
                </div>
            </div>
        </div>

        <router-link :to="`/post/${postId}`" v-if="imageUrl">
            <img :src="imageUrl" alt="Arte do post" class="post-image" />
        </router-link>

        <div class="post-actions" v-if="!isEditing">
            <div class="action-group" @click="handleLike">
                <img
                    src="@/assets/heart.svg"
                    class="icon"
                    :class="{ 'icon-liked': isLiked }"
                />
                <span class="action-count">{{ likeCount }}</span>
            </div>

            <div class="action-group" @click="handleComment">
                <img src="@/assets/message-square.svg" class="icon" />
            </div>

            <div class="action-group" v-if="isMyPost" @click="handleEdit">
                <img src="@/assets/edit.svg" class="icon" />
            </div>
        </div>

        <div class="post-actions edit-mode" v-else>
            <button class="edit-btn delete" @click="handleDelete">
                <img src="@/assets/trash.svg" class="btn-icon" />
                Deletar Post
            </button>
            <button class="edit-btn" @click="handleSaveText">
                <img src="@/assets/edit-2.svg" class="btn-icon" />
                Salvar Texto
            </button>
            <button class="edit-btn cancel" @click="isEditing = false">
                <img src="@/assets/x-circle.svg" class="btn-icon" />
                Cancelar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/lib/supabaseClient.js";
import store from "@/lib/store.js";

const emit = defineEmits(["post-deleted"]);

const props = defineProps({
    post: Object,
});

const router = useRouter();
const currentUser = computed(() => store.state.currentUser);

// --- VARIÁVEIS DE EDIÇÃO ---
const isEditing = ref(false);
const editText = ref("");

// --- VARIÁVEIS COMPUTADAS (EXISTENTES) ---
const postId = computed(() => props.post.id);
const username = computed(() => props.post.profiles.username);
const text = computed(() => props.post.text);
const avatarUrl = computed(() => props.post.profiles.avatar_url);
const imageUrl = computed(() => props.post.image_url);
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
            await supabase.from("likes").delete().match({
                post_id: postId.value,
                user_id: currentUser.value.id,
            });
            isLiked.value = false;
            likeCount.value--;
        } else {
            await supabase.from("likes").insert({
                post_id: postId.value,
                user_id: currentUser.value.id,
            });
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

// --- FUNÇÕES DE EDIÇÃO E DELETE ATUALIZADAS ---
function handleEdit() {
    editText.value = props.post.text;
    isEditing.value = true;
}

async function handleSaveText() {
    if (editText.value === props.post.text) {
        isEditing.value = false;
        return;
    }
    try {
        const { error } = await supabase
            .from("posts")
            .update({ text: editText.value })
            .eq("id", props.post.id);
        if (error) throw error;
        props.post.text = editText.value;
        isEditing.value = false;
    } catch (error) {
        console.error("Erro ao salvar o post:", error.message);
        alert("Não foi possível salvar a edição: " + error.message);
    }
}

async function handleDelete() {
    if (
        !confirm(
            "Tem certeza que quer deletar este post? Esta ação não pode ser desfeita.",
        )
    ) {
        return;
    }
    try {
        const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", props.post.id);
        if (error) throw error;
        emit("post-deleted", props.post.id);
    } catch (error) {
        console.error("Erro ao deletar o post:", error.message);
        alert("Não foi possível deletar o post: " + error.message);
    }
}

// As funções handleRepeat() e handleShare() foram REMOVIDAS.
</script>

<style scoped>
.post-card {
    border: 1px solid #444;
    border-radius: 8px;
    background-color: #222;
    color: white;
    max-width: 500px;
    margin: 20px auto;
    font-family: Arial, sans-serif;

    /* TRANSIÇÃO PARA O HOVER (NOVO) */
    transition:
        transform 0.2s ease-out,
        border-color 0.2s ease-out,
        box-shadow 0.2s ease-out;
}

/* EFEITO HOVER PEDIDO (NOVO) */
.post-card:hover {
    transform: translateY(-3px); /* A "subidinha" */
    border-color: #666; /* Borda mais clara */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Sombra suave */
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

/* ESTILO PARA O GRUPO DE AÇÃO (NOVO) */
.action-group {
    display: flex;
    align-items: center;
    gap: 6px; /* Espaço entre o ícone e o número */
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: background-color 0.2s;
}
.action-group:hover {
    background-color: #333; /* Fundo leve no hover */
}

/* ESTILO PARA O CONTADOR (NOVO) */
.action-count {
    font-size: 0.8em; /* Tamanho menor */
    font-weight: 600;
    color: #aaa;
    /* Alinha o número com o ícone (pode precisar de ajuste) */
    position: relative;
    top: -1px;
}

/* ESTILO DO ÍCONE (EXISTENTE) */
.icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    filter: none;
    opacity: 0.7;
    transition: all 0.2s ease;
}
.icon:hover {
    opacity: 1;
    transform: scale(1.1);
}
.icon-liked {
    filter: invert(30%) sepia(90%) saturate(5000%) hue-rotate(350deg)
        brightness(100%) contrast(100%);
    opacity: 1;
}

/* ... (resto do seu CSS de .commission-badge, .edit-textarea, .edit-btn, etc. continua igual) ... */
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

.edit-textarea {
    width: 100%;
    margin-top: 4px;
    padding: 8px;
    background-color: #333;
    border: 1px solid #555;
    border-radius: 6px;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 0.9em;
    resize: vertical;
}

.edit-textarea:focus {
    outline: none;
    border-color: #42b883;
}

.post-actions.edit-mode {
    padding: 10px 15px;
    gap: 10px;
    justify-content: center;
}

.edit-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 6px 11px;
    border: none;
    border-radius: 20px;
    font-size: 0.85em;
    font-weight: 600;
    cursor: pointer;
    background-color: #333;
    color: white;
    transition: background-color 0.2s;
}

.edit-btn:hover {
    background-color: #444;
}

.btn-icon {
    width: 16px;
    height: 16px;
    filter: invert(1);
}

.edit-btn.delete {
    background-color: #d1495b;
    color: white;
}
.edit-btn.delete:hover {
    background-color: #a73c4a;
}
.edit-btn.delete .btn-icon {
    filter: none;
}

.edit-btn.cancel {
    background-color: transparent;
    border: 1px solid #555;
}
.edit-btn.cancel:hover {
    background-color: #222;
}
.edit-btn.cancel .btn-icon {
    filter: none;
}
</style>
