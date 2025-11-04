<template>
    <div>
        <PostItem
            :postId="mockPost.id"
            :username="mockPost.user"
            :text="mockPost.text"
            :avatar-url="mockPost.avatarUrl"
            :image-url="mockPost.imageUrl"
            :commission-status="mockPost.commissionStatus"
        />

        <div class="comments-section">
            <h3>Comentários</h3>
            <div class="comment">
                <strong>OutroArtista:</strong>
                <p>Uau, que incrível! 😮</p>
            </div>
            <div class="comment">
                <strong>NexoArtFan:</strong>
                <p>Amei as cores!</p>
            </div>
            <textarea
                class="comment-input"
                placeholder="Escreva um comentário..."
            ></textarea>
            <button class="comment-button">Enviar</button>
        </div>
    </div>
</template>

<script setup>
// (O script setup dele fica igual ao que fizemos antes)
import { computed } from "vue";
import { useRoute } from "vue-router";
import PostItem from "../components/post/PostItem.vue";

const route = useRoute();
const postId = computed(() => route.params.id);

// Dados Falsos
const mockPost = {
    id: postId.value,
    user: "ArtistaManga",
    text: "Meu novo OC! O que acharam?",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    imageUrl: `https://picsum.photos/600/800?random=${postId.value}`,
    commissionStatus: "Aberto",
};
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
</style>
