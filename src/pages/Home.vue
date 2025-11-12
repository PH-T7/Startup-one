<template>
    <div>
        <CreatePostWidget v-if="currentUser" />

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
import { ref, onMounted } from "vue"; // <-- 1. onMounted está de volta
import CreatePostWidget from "../components/post/CreatePostWidget.vue";
import PostItem from "../components/post/PostItem.vue";
import { currentUser } from "../lib/store.js";

// 2. IMPORTA O SUPABASE (DE VERDADE)
import { supabase } from "../lib/supabase";

const posts = ref([]); // Começa vazio

// 3. BUSCA NO SUPABASE (AGORA ATIVADO)
onMounted(async () => {
    console.log("Buscando posts no Supabase...");

    try {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false }); // (Usando a coluna que criamos)

        if (error) {
            throw error;
        }

        if (data) {
            posts.value = data;
            console.log("Posts carregados:", posts.value);
        }
    } catch (error) {
        console.error("Erro ao buscar posts:", error.message);
        alert("Erro ao buscar posts: " + error.message);
    }
});

// 4. A LISTA FALSA FOI APAGADA
</script>

<style scoped>
/* Aqui ficam estilos SÓ da home, se precisar */
</style>
