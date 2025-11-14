<template>
    <div v-if="post">
        <PostItem :post="post" />
    </div>
    <div class="comments-section">
        <h3>Comentários</h3>

        <div v-if="comments.length > 0">
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <router-link
                    :to="`/perfil/${comment.profiles.username}`"
                    class="comment-author-link"
                >
                    <img
                        :src="
                            comment.profiles.avatar_url ||
                            'https://i.imgur.com/626N2S4.png'
                        "
                        class="comment-avatar"
                    />
                    <strong>{{ comment.profiles.username }}:</strong>
                </router-link>
                <p>{{ comment.content }}</p>
            </div>
        </div>

        <div v-else>
            <p>Nenhum comentário ainda. Seja o primeiro!</p>
        </div>

        <textarea
            class="comment-input"
            placeholder="Escreva um comentário..."
            v-model="newComment"
        ></textarea>
        <button class="comment-button" @click="handleSendComment">
            Enviar
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"; // <-- Importe 'computed'
import { useRoute } from "vue-router";
import PostItem from "../components/post/PostItem.vue";
import { supabase } from "../lib/supabaseClient"; // <-- Importe supabase
import store from "@/lib/store.js"; // <-- Importe a store

const route = useRoute();
const post = ref(null);
const postId = route.params.id;

// -- NOVOS REFS PARA COMENTÁRIOS --
const comments = ref([]);
const newComment = ref("");
const currentUser = computed(() => store.state.currentUser);

// -- NOVA FUNÇÃO PARA BUSCAR COMENTÁRIOS --
async function fetchComments() {
    try {
        const { data, error } = await supabase
            .from("comments")
            .select("*, profiles(id, username, avatar_url)") // Pega o perfil do comentarista
            .eq("post_id", postId)
            .order("created_at", { ascending: true });

        if (error) throw error;
        comments.value = data;
    } catch (error) {
        console.error("Error fetching comments:", error.message);
    }
}

// -- onMounted ATUALIZADO --
onMounted(async () => {
    const { data, error } = await supabase
        .from("posts")
        .select(
            "*, image_url, profiles:user_id(id, username, avatar_url, missionstatus)",
        )
        .eq("id", postId)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
    } else {
        post.value = data;
        await fetchComments(); // <-- Busca os comentários DEPOIS de achar o post
    }
});

// -- FUNÇÃO DE ENVIAR ATUALIZADA --
async function handleSendComment() {
    if (!newComment.value.trim() || !currentUser.value) return;

    try {
        const { error } = await supabase.from("comments").insert({
            post_id: postId,
            user_id: currentUser.value.id,
            content: newComment.value,
        });

        if (error) throw error;

        newComment.value = ""; // Limpa o input
        await fetchComments(); // Recarrega os comentários
    } catch (error) {
        console.error("Error sending comment:", error.message);
        alert("Erro ao enviar comentário: " + error.message);
    }
}
</script>

<style scoped>
/* O CSS scoped dele fica idêntico ao que já tínhamos */
.comments-section {
    background-color: #222;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
}
.comment {
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.comment p {
    margin: 5px 0 0 10px;
}
.comment-input {
    width: 100%;
    height: 80px;
    background-color: #333;
    border: 1px solid #555;
    color: white;
    border-radius: 8px;
    padding: 10px;
    margin-top: 20px;
}
.comment-button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
}
.comment-author-link {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: white;
}
.comment-author-link:hover {
    text-decoration: underline;
}
.comment-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
