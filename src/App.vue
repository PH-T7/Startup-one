<template>
    <main>
        <PostItem />

        <PostItem />
        <PostItem />
    </main>
</template>

<script setup>
// Para "usar" o componente, precisamos importá-lo
import PostItem from "./components/PostItem.vue";
</script>

<style>
/* Estilos globais (para o site inteiro) */
body {
    background-color: #1a1a1a; /* Fundo preto/cinza escuro do seu wireframe */
    margin: 0;
    padding: 0;
}
</style>
