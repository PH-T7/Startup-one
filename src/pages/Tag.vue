<template>
    <div>
        <h2>Posts com a tag #{{ tagName }}</h2>

        <PostItem v-for="post in taggedPosts" :key="post.id" :post="post" />

        <p v-if="taggedPosts.length === 0">
            Nenhum post encontrado com esta tag.
        </p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import PostItem from "../components/post/PostItem.vue";
import { supabase } from "../lib/supabaseClient";
import store from "@/lib/store.js"; // 1. IMPORTAR O STORE

const route = useRoute();
const tagName = computed(() => route.params.tagName);
const taggedPosts = ref([]);
const currentUser = computed(() => store.state.currentUser); // 2. PEGAR O USUÁRIO LOGADO

async function fetchTaggedPosts() {
    if (!currentUser.value) return; // Garante que temos um usuário antes de buscar

    console.log(`Buscando posts com a tag: #${tagName.value}`);
    taggedPosts.value = [];

    try {
        const { data, error } = await supabase
            .from("posts")
            .select(
                `
                *,
                image_url,
                profiles:user_id(id, username, avatar_url, missionstatus),
                likes(user_id)
                `,
            ) // 3. PEDIR OS LIKES NA QUERY
            .like("text", `%#${tagName.value}%`)
            .order("created_at", { ascending: false });

        if (error) throw error;

        // 4. MAPEAMENTO CORRETO DOS LIKES (igual o da Home.vue)
        taggedPosts.value = data.map((post) => ({
            ...post,
            isLikedByMe: post.likes.some(
                (like) => like.user_id === currentUser.value.id,
            ),
            likeCount: post.likes.length,
        }));

        console.log("Posts encontrados:", taggedPosts.value);
    } catch (error) {
        console.error("Erro ao buscar posts por tag:", error.message);
    }
}

onMounted(fetchTaggedPosts);
watch(tagName, fetchTaggedPosts);
</script>

<style scoped>
h2 {
    padding: 20px;
    border-bottom: 1px solid #444;
}
p {
    padding: 20px;
    color: #888;
}
</style>
