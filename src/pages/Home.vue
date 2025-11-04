<template>
    <div>
        <CreatePostWidget :user="currentUser" />

        <PostItem
            v-for="post in posts"
            :key="post.id"
            :postId="post.id"
            :username="post.user"
            :text="post.text"
            :avatar-url="post.avatarUrl"
            :image-url="post.imageUrl"
            :commission-status="post.commissionStatus"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CreatePostWidget from "../components/post/CreatePostWidget.vue";
import PostItem from "../components/post/PostItem.vue";
import { currentUser } from "../service/store.js";

// 1. IMPORTAR O NOVO CLIENTE
import { supabase } from "../service/supabase";

const posts = ref([]);

onMounted(async () => {
    console.log("Buscando posts no Supabase...");

    try {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false }); // <-- LINHA CORRIGIDA

        if (error) {
            throw error;
        }

        // 3. ATUALIZA A LISTA
        if (data) {
            posts.value = data;
            console.log("Posts carregados:", posts.value);
        }
    } catch (error) {
        console.error("Erro ao buscar posts:", error.message);
        alert("Erro ao buscar posts: " + error.message);
    }
});
</script>

<style scoped>
/* Aqui ficam estilos SÓ da home, se precisar */
</style>
