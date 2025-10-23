<template>
    <div class="app-container">
        <header class="col-nav">
            <Navbar />
            <SidebarTags />
        </header>

        <main class="col-feed">
            <PostItem
                v-for="post in posts"
                :key="post.id"
                :username="post.user"
                :text="post.text"
            />
        </main>

        <aside class="col-recomendados">
            <SidebarRecomendados />
        </aside>
    </div>
</template>

<script setup>
import PostItem from "./components/PostItem.vue";
import Navbar from "./components/Navbar.vue";
import SidebarTags from "./components/SidebarTags.vue";
import SidebarRecomendados from "./components/SidebarRecomendados.vue";

const posts = [
    { id: 1, user: "Usuario001", text: "Olha que arte bonita :D" },
    { id: 2, user: "ArtistaManga", text: "Meu novo OC!" },
    { id: 3, user: "SketchMaster", text: "Estudando anatomia..." },
];
</script>

<style>
/* 3. Estilos GLOBAIS (sem "scoped") para o layout */
body {
    background-color: #1a1a1a;
    margin: 0;
    padding: 0;
    color: white;
}

.app-container {
    display: grid;
    /* Define as 3 colunas. O feed (1fr) vai ocupar o espaço que sobrar */
    grid-template-columns: 240px 1fr 300px;
    gap: 20px; /* Espaço entre as colunas */
    max-width: 1400px; /* Limita a largura total */
    margin: 0 auto; /* Centraliza o layout na tela */
    padding: 10px;
}

.col-nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Deixa o feed rolar independentemente */
.col-feed {
    max-height: 100vh;
    overflow-y: auto;
}
</style>
