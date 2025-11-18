<template>
    <div class="app-container" v-if="currentUser">
        <header class="col-nav">
            <Navbar />
            <SidebarTags :user="currentUser" :tags="trendingTags" />
        </header>

        <main class="col-feed">
            <router-view />
        </main>

        <aside class="col-recomendados">
            <SidebarRecomendados />
        </aside>
    </div>

    <div class="unauthenticated-container" v-else>
        <router-view />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"; // 1. Importe onMounted
// 2. Importa o Supabase
import { supabase } from "@/lib/supabaseClient.js";

// 3. Importa os componentes da "moldura"
import Navbar from "./components/layout/Navbar.vue";
import SidebarTags from "./components/layout/SidebarTags.vue";
import SidebarRecomendados from "./components/layout/SidebarRecomendados.vue";

// 4. Importa o "usuário logado" do nosso store
import store from "@/lib/store.js";

const currentUser = computed(() => store.state.currentUser);

// 5. O posts 'fake' foi REMOVIDO
// const posts = ref([...]); // <-- REMOVIDO

// 6. trendingTags agora é um ref simples, não um computed
const trendingTags = ref([]);

// 7. Busca os posts REAIS (apenas o texto) quando o app carregar
onMounted(async () => {
    // Busca apenas o texto de todos os posts para calcular as tags
    const { data: postsData, error } = await supabase
        .from("posts")
        .select("text");

    if (error) {
        console.error("Erro ao buscar posts para tags:", error);
        return;
    }

    // Lógica que estava no 'computed' (agora roda uma vez)
    const tagCounts = {};
    postsData.forEach((post) => {
        if (!post.text) return; // Pula posts sem texto
        const words = post.text.split(" ");
        words.forEach((word) => {
            if (word.startsWith("#")) {
                const tag = word.substring(1);
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            }
        });
    });

    trendingTags.value = Object.entries(tagCounts).map(([name, count]) => ({
        name,
        count,
    }));
});
</script>

<style>
/* Estilos globais (sem 'scoped') para o layout */
html,
body,
html,
body,
#app {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #000;
    color: white;
    font-family: Arial, sans-serif;
    overflow-x: hidden;
}

/* ADICIONE ISTO AQUI PARA CORRIGIR A TELA PRETA */
.unauthenticated-container {
    height: 100%;
}

.app-container {
    display: grid;
    grid-template-columns: 250px 1fr 300px; /* Larguras das 3 colunas */
    gap: 20px;
    max-width: 1200px; /* Largura máxima do app */
    margin: 0 auto;
    min-height: 100vh;
    padding: 0 20px;
}

/* Colunas individuais */
.col-nav {
    /* Opcional: para fixar a barra lateral
    (Vamos deixar desativado por enquanto)
    position: sticky;
    top: 0;
    height: 100%;
  */
    padding-top: 20px; /* Espaço do topo */
    display: flex;
    flex-direction: column;
    gap: 20px; /* Espaço entre Navbar e SidebarTags */
}

.col-feed {
    padding-top: 20px;
    border-left: 1px solid #333; /* Linha divisória */
    border-right: 1px solid #333; /* Linha divisória */
    padding-left: 20px;
    padding-right: 20px;
}

.col-recomendados {
    padding-top: 20px;
}

/* Media Query para telas com 1024px de largura ou menos (tablets) */
@media (max-width: 1024px) {
    .app-container {
        grid-template-columns: 1fr; /* 1 coluna (layout do celular) */
        padding: 0;
        margin: 0;
    }

    .col-nav,
    .col-recomendados {
        display: none; /* Esconde as barras laterais em telas pequenas */
    }

    .col-feed {
        border-left: none;
        border-right: none;
        padding: 0 10px;
    }
}

/* Ocultar barra de rolagem (opcional) */
.col-feed::-webkit-scrollbar {
    display: none;
}
.col-feed {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
