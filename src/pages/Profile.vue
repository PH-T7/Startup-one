<template>
    <div>
        <ProfileHeader
            :username="username"
            :avatar="currentUser.avatar"
            :bio="currentUser.bio"
            :commission-status="currentUser.commissionStatus"
            :is-my-profile="isMyProfile"
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import PostItem from "../components/post/PostItem.vue";
import PostCard from "../components/post/PostCard.vue";
import ProfileHeader from "../components/profile/ProfileHeader.vue";
import { currentUser as loggedInUser } from "../service/store.js";

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

const fakeUserDatabase = {
    Zumi: {
        avatar: "https://64.media.tumblr.com/837a686c6e497180890c1cad980b8326/c59fb7be68d45748-86/s1280x1920/cae307c29c98e40dc08be601d5cbb38051c4111e.png",
        bio: "Só uma garota que ama desenhar",
        commissionStatus: "Aberto",
    },
    sanobdd: {
        avatar: "https://pbs.twimg.com/profile_images/1979504749406806016/5jfrLI0__400x400.jpg",
        bio: "Fanart de animes de esporte é minha especialidade.",
        commissionStatus: "Fechado",
    },
    vialentino: {
        avatar: "https://i.pinimg.com/736x/4d/f2/20/4df220f7fa1a115dfc8fe1dc42471865.jpg",
        bio: "Artista de retratos e iluminação.",
        commissionStatus: "Lista de Espera",
    },
};

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

const portfolioPosts = computed(() => {
    return posts.value.filter((p) => p.user === username.value);
});

const feedPosts = computed(() => {
    return posts.value.filter((p) => p.user === username.value);
});

const isMyProfile = computed(() => loggedInUser.value.name === username.value);
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
