<template>
    <div v-if="post">
        <PostItem
            :postId="post.id"
            :username="post.user"
            :text="post.text"
            :avatar-url="post.avatarUrl"
            :image-url="post.imageUrl"
            :commission-status="post.commissionStatus"
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
            <button class="comment-button" @click="handleSendComment">
                Enviar
            </button>
        </div>
    </div>
</template>

<script setup>
// (O script setup dele fica igual ao que fizemos antes)
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import PostItem from "../components/post/PostItem.vue";

// 1. COPIAMOS O BANCO DE DADOS FALSO DA HOME
const posts = ref([
    {
        id: 1,
        user: "Zumi",
        text: "a Luz! ✨ #TheOwlHouse",
        avatarUrl:
            "https://64.media.tumblr.com/837a686c6e497180890c1cad980b8326/c59fb7be68d45748-86/s1280x1920/cae307c29c98e40dc08be601d5cbb38051c4111e.png",
        imageUrl:
            "https://64.media.tumblr.com/5fde43ff17805e35207f293a2a9a9490/fe1fd5995f06f3b8-9f/s1280x1920/54b47d6e2919a29bb5d42e3fd36ec52feaeadd02.png",
        commissionStatus: "Aberto",
    },
    {
        id: 2,
        user: "sanobdd",
        text: "Um sketch rápido do Aomine. 🏀 #KurokoNoBasket",
        avatarUrl:
            "https://pbs.twimg.com/profile_images/1979504749406806016/5jfrLI0__400x400.jpg",
        imageUrl: "https://pbs.twimg.com/media/E0laSkHWQAgvpPL.jpg",
        commissionStatus: "Fechado",
    },
    {
        id: 3,
        user: "vialentino",
        text: "Estudando um pouco de iluminação em retratos.",
        avatarUrl:
            "https://i.pinimg.com/736x/4d/f2/20/4df220f7fa1a115dfc8fe1dc42471865.jpg",
        imageUrl:
            "https://scontent.fsod2-1.fna.fbcdn.net/v/t39.30808-6/465578040_8912182182166437_3177728228340639453_n.png?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=X41WuZ6xThYQ7kNvwHScqB7&_nc_oc=AdnLIPhiZ12ATeLK-CnaW1_WWYoqLoMyxmRvthrVC1YZPMw1bUNRIkHBU9XEedYJoXkMb2GmTJ_wBXq077xD-yww&_nc_zt=23&_nc_ht=scontent.fsod2-1.fna&_nc_gid=Cw5STJ65Ib2ymMGZ93DToA&oh=00_AfiaTG6HmoOMfrQEyH0P8hZQ5brHQ8OGvCo7aZU3xIahRg&oe=6912A838",
        commissionStatus: "Lista de Espera",
    },
]);

const route = useRoute();
// 2. PEGAMOS O ID DA URL E GARANTIMOS QUE É UM NÚMERO
const postId = computed(() => parseInt(route.params.id));

// 3. BUSCAMOS O POST CORRETO NO NOSSO "BANCO DE DADOS"
const post = computed(() => {
    return posts.value.find((p) => p.id === postId.value);
});

function handleSendComment() {
    alert("Comentário enviado com sucesso!");
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
</style>
