<template>
    <button class="base-button">
        <slot />
    </button>
</template>

<script setup>
// Por enquanto, sem lógica necessária
</script>

<style scoped>
.base-button {
    background-color: #42b883; /* Verde do Vue (mude para a cor do seu app) */
    border: none;
    border-radius: 6px;
    padding: 12px 20px;
    color: white;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s;
}
.base-button:hover {
    background-color: #3aa073;
}
</style>
