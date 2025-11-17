<template>
    <div class="post-card-wrapper">
        <img :src="post.image_url" class="post-image" />

        <div class="post-overlay">
            <div class="user-info">
                <img :src="post.profiles.avatar_url" class="avatar-overlay" />

                <span>{{ post.profiles.username }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    // Estamos passando o objeto 'post' inteiro, é mais fácil
    post: Object,
});
</script>

<style scoped>
.post-card-wrapper {
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    background: #333;
    position: relative;

    /* A mágica do Masonry: impede que um card quebre entre duas colunas */
    break-inside: avoid;
    margin-bottom: 15px; /* Espaço entre os cards (vertical) */
}

.post-image {
    width: 100%;
    height: auto; /* Altura automática é a alma do masonry */
    display: block; /* Remove espaço extra embaixo da imagem */
}

/* Efeito de hover */
.post-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    font-family: Arial, sans-serif;
    font-size: 0.9em;
}

.post-card-wrapper:hover .post-overlay {
    opacity: 1;
}

.user-info {
    display: flex;
    align-items: center;
}

.avatar-overlay {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
    object-fit: cover;
}
</style>
