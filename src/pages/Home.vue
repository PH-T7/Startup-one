<template>
    <div>
        <CreatePostWidget v-if="currentUser" @post-created="handleNewPost" />

        <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CreatePostWidget from "../components/post/CreatePostWidget.vue";
import PostItem from "../components/post/PostItem.vue";
import store from "@/lib/store.js";
import { supabase } from "../lib/supabaseClient";

const currentUser = computed(() => store.state.currentUser);
const posts = ref([]);

// 2. RENOMEAR A FUNÇÃO DE BUSCAR POSTS
async function fetchPosts() {
    console.log("Buscando posts no Supabase...");
    try {
        let { data, error } = await supabase
            .from("posts")
            .select(
                `
                *,
                profiles:user_id(id, username, avatar_url, missionstatus),
                likes(user_id)
                `,
            )
            .order("created_at", { ascending: false });

        if (error) throw error;

        if (data) {
            posts.value = data.map((post) => ({
                ...post,
                isLikedByMe: post.likes.some(
                    (like) => like.user_id === currentUser.value.id,
                ),
                likeCount: post.likes.length,
            }));
            console.log("Posts carregados:", posts.value);
        }
    } catch (error) {
        console.error("Erro ao buscar posts:", error.message);
        alert("Erro ao buscar posts: " + error.message);
    }
}

// 3. onMounted agora SÓ CHAMA a função
onMounted(fetchPosts);

// 4. NOVA FUNÇÃO (chamada pelo emit)
// Esta função vai rodar QUANDO o widget avisar
// Ela é "otimista" - ela não busca no DB, só adiciona na lista.
async function handleNewPost(newPost) {
    // Precisamos do perfil para o post... vamos buscar SÓ o perfil.
    const { data, error } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, missionstatus")
        .eq("id", newPost.user_id)
        .single();

    if (error) {
        console.error(
            "Não foi possível buscar o perfil para o novo post:",
            error,
        );
        // Se falhar, recarregamos tudo por segurança
        fetchPosts();
    } else {
        // Adiciona o novo post no topo da lista
        posts.value.unshift({
            ...newPost,
            profiles: data, // Adiciona o perfil que buscamos
            likes: [], // Novo post, 0 likes
            isLikedByMe: false,
            likeCount: 0,
        });
    }
}
</script>

<style scoped>
/* Aqui ficam estilos SÓ da home, se precisar */
</style>
