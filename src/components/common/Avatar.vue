<template>
    <img
        :src="src || placeholderImage"
        alt="Avatar do usuário"
        class="avatar-image"
    />
</template>

<script setup>
// Define quais "props" (propriedades) este componente aceita.
// Nossos outros componentes (como o Navbar) vão passar o 'src' para ele.
defineProps({
    src: {
        type: String,
        default: null, // O 'default' é null
    },
});

// Uma imagem 'placeholder' caso o src não seja fornecido
// Você pode trocar isso pelo caminho de um asset local
const placeholderImage = "https://i.imgur.com/626N2S4.png"; // Exemplo de placeholder
</script>

<style scoped>
.avatar-image {
    width: 48px; /* Tamanho de exemplo, ajuste conforme seu layout */
    height: 48px; /* Tamanho de exemplo, ajuste conforme seu layout */
    border-radius: 50%; /* Deixa a imagem redonda */
    object-fit: cover; /* Garante que a imagem cubra o espaço sem distorcer */
    border: 2px solid #333; /* Borda de exemplo */
}
</style>
