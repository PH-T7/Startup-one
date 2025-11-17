<template>
    <div>
        <ProfileHeader
            v-if="profile"
            :username="profile.username"
            :avatar="profile.avatar_url"
            :bio="profile.bio"
            :commission-status="profile.missionstatus"
            :is-my-profile="isMyProfile"
            :profile-id="profile.id"
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
                    :post="post"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import PostItem from "../components/post/PostItem.vue";
import PostCard from "../components/post/PostCard.vue";
import ProfileHeader from "../components/profile/ProfileHeader.vue";
import store from "@/lib/store.js";
import { supabase } from "../lib/supabaseClient.js";

const route = useRoute();
const activeTab = ref("portfolio");

const profile = ref(null);
const posts = ref([]);

const username = computed(() => route.params.username);

const fetchProfileData = async () => {
    const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username.value)
        .single();

    if (profileError) {
        console.error("Error fetching profile:", profileError);
        return;
    }
    profile.value = profileData;

    const { data: postsData, error: postsError } = await supabase
        .from("posts")
        // CORREÇÃO AQUI (Não é uma correção, mas uma boa prática)
        // Adicione image_url ao select para garantir que ele venha
        .select(
            "*, image_url, profiles:user_id(id, username, avatar_url, missionstatus)",
        )
        .eq("user_id", profile.value.id)
        .order("created_at", { ascending: false });

    if (postsError) {
        console.error("Error fetching posts:", postsError);
        return;
    }
    posts.value = postsData;
};

onMounted(fetchProfileData);
watch(username, fetchProfileData);

const portfolioPosts = computed(() => {
    // CORREÇÃO AQUI
    return posts.value.filter((p) => p.image_url); // Mudado de imageUrl para image_url
});

const feedPosts = computed(() => {
    return posts.value;
});

const isMyProfile = computed(() => {
    return (
        store.state.currentUser &&
        profile.value &&
        store.state.currentUser.id === profile.value.id
    );
});
</script>

<style scoped>
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
