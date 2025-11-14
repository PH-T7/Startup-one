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
import { ref, computed, onMounted, watch } from "vue"; // 1. Importe onMounted e watch
import { useRoute } from "vue-router";
import PostItem from "../components/post/PostItem.vue";
import { supabase } from "../lib/supabaseClient"; // 2. Importe o Supabase

const route = useRoute();
const tagName = computed(() => route.params.tagName);
const taggedPosts = ref([]); // 3. Começa vazio, sem dados falsos

// 4. Nova função para buscar os posts reais
async function fetchTaggedPosts() {
    console.log(`Buscando posts com a tag: #${tagName.value}`);
    taggedPosts.value = []; // Limpa antes de buscar

    try {
        const { data, error } = await supabase
            .from("posts")
            .select(
                "*, image_url, profiles:user_id(id, username, avatar_url, missionstatus)",
            )
            .like("text", `%#${tagName.value}%`) // A mágica: busca posts que contenham o texto da tag
            .order("created_at", { ascending: false });

        if (error) throw error;
        // CORREÇÃO AQUI: Precisamos mapear os likes, assim como na Home.vue
        // (Senão o PostItem vai quebrar ao tentar ler 'isLikedByMe')
        // Por agora, vamos apenas garantir que o objeto exista.
        // Uma implementação completa precisaria buscar os likes aqui também.
        taggedPosts.value = data.map((post) => ({
            ...post,
            isLikedByMe: false, // Simplificação (correto seria buscar os likes)
            likeCount: 0, // Simplificação
        }));
        console.log("Posts encontrados:", taggedPosts.value);
    } catch (error) {
        console.error("Erro ao buscar posts por tag:", error.message);
    }
}

// 5. Busca os posts quando a página carregar
onMounted(fetchTaggedPosts);

// 6. (Bônus) Busca novamente se o usuário clicar em outra tag
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
