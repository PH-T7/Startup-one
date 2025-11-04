<template>
    <div>
        <ProfileHeader
            :username="username"
            :avatar="currentUser.avatar"
            :bio="currentUser.bio"
            :commission-status="currentUser.commissionStatus"
        />

        <div class="profile-tabs">
            <button
                class="tab-button"
                :class="{ active: activeTab === 'portfolio' }"
                @click="activeTab = 'portfolio'"
            >
                Portfólio
            </button>
            <button
                class="tab-button"
                :class="{ active: activeTab === 'feed' }"
                @click="activeTab = 'feed'"
            >
                Feed
            </button>
        </div>

        <div class="profile-content">
            <div v-if="activeTab === 'portfolio'">
                <div class="portfolio-grid">
                    <router-link
                        v-for="post in portfolioPosts"
                        :key="post.id"
                        :to="`/post/${post.id}`"
                    >
                        <PostCard :post="post" />
                    </router-link>
                </div>
            </div>
            <div v-if="activeTab === 'feed'">
                <PostItem
                    v-for="post in feedPosts"
                    :key="post.id"
                    :postId="post.id"
                    :username="post.user"
                    :text="post.text"
                    :avatar-url="post.avatarUrl"
                    :image-url="post.imageUrl"
                    :commission-status="currentUser.commissionStatus"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
// (O script setup dele fica igual ao que fizemos antes,
// com o 'fakeUserDatabase', 'currentUser', 'portfolioPosts', etc.)
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import PostItem from "../components/post/PostItem.vue";
import PostCard from "../components/post/PostCard.vue";
import ProfileHeader from "../components/profile/ProfileHeader.vue";

// --- Simulação do Banco de Dados ---
const fakeUserDatabase = {
    ArtistaManga: {
        avatar: "https://i.pravatar.cc/150?img=11",
        bio: "Artista digital e fã de mangá.",
        commissionStatus: "Aberto",
    },
    SketchMaster: {
        avatar: "https://i.pravatar.cc/150?img=12",
        bio: "Especialista em sketch e anatomia. ✍️",
        commissionStatus: "Fechado",
    },
    Colorida: {
        avatar: "https://i.pravatar.cc/150?img=13",
        bio: "Amante de pintura digital e cores vibrantes.",
        commissionStatus: "Lista de Espera",
    },
};
// --- Fim da Simulação ---

const route = useRoute();
const activeTab = ref("portfolio");

const username = computed(() => route.params.username);

const currentUser = computed(() => {
    return (
        fakeUserDatabase[username.value] || {
            avatar: "https://i.pravatar.cc/150?img=1",
            bio: "Usuário não encontrado.",
            commissionStatus: "Fechado",
        }
    );
});

// --- Dados Falsos ---
const portfolioPosts = [
    {
        id: 1,
        user: username.value,
        avatarUrl: currentUser.value.avatar,
        imageUrl: `https://picsum.photos/600/800?random=${username.value}1`,
    },
    {
        id: 2,
        user: username.value,
        avatarUrl: currentUser.value.avatar,
        imageUrl: `https://picsum.photos/600/600?random=${username.value}2`,
    },
    {
        id: 3,
        user: username.value,
        avatarUrl: currentUser.value.avatar,
        imageUrl: `https://picsum.photos/600/700?random=${username.value}3`,
    },
    {
        id: 4,
        user: username.value,
        avatarUrl: currentUser.value.avatar,
        imageUrl: `https://picsum.photos/600/800?random=${username.value}4`,
    },
];
const feedPosts = [
    {
        id: 1,
        user: username.value,
        text: "Meu post mais recente!",
        avatarUrl: currentUser.value.avatar,
        imageUrl: `https://picsum.photos/600/700?random=${username.value}3`,
        postId: 1,
    },
    {
        id: 2,
        user: username.value,
        text: "WIP de hoje.",
        avatarUrl: currentUser.value.avatar,
        imageUrl: `https://picsum.photos/600/600?random=${username.value}2`,
        postId: 2,
    },
];
// --- Fim dos Dados Falsos ---
</script>

<style scoped>
/* O CSS scoped dele fica idêntico ao que já tínhamos */
.profile-tabs {
    display: flex;
    border-bottom: 1px solid #444;
    margin-top: 20px;
}
.tab-button {
    padding: 12px 20px;
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
}
.tab-button.active {
    color: white;
    border-bottom: 2px solid white;
}
.profile-content {
    padding-top: 20px;
}
.portfolio-grid {
    column-count: 3;
    column-gap: 15px;
}
@media (max-width: 768px) {
    .portfolio-grid {
        column-count: 2;
    }
}
</style>
