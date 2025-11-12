<template>
    <div class="app-container">
        <header class="col-nav">
            <Navbar />
            <SidebarTags
                v-if="currentUser"
                :user="currentUser"
                :tags="trendingTags"
            />
        </header>

        <main class="col-feed">
            <router-view />
        </main>

        <aside class="col-recomendados">
            <SidebarRecomendados />
        </aside>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
// 1. Importa os componentes da "moldura"
import Navbar from "./components/layout/Navbar.vue";
import SidebarTags from "./components/layout/SidebarTags.vue";
import SidebarRecomendados from "./components/layout/SidebarRecomendados.vue";

// 2. Importa o "usuário logado" do nosso store
import { currentUser } from "./lib/store.js";

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

const trendingTags = computed(() => {
    const tagCounts = {};
    posts.value.forEach((post) => {
        const words = post.text.split(" ");
        words.forEach((word) => {
            if (word.startsWith("#")) {
                const tag = word.substring(1);
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            }
        });
    });

    return Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
});
</script>

<style>
/* Estilos globais (sem 'scoped') para o layout */
html,
body,
#app {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #000; /* Fundo preto padrão */
    color: white; /* Texto branco padrão */
    font-family: Arial, sans-serif;
    overflow-x: hidden; /* Evita rolagem horizontal indesejada */
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
