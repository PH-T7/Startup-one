<template>
    <aside class="sidebar-tags">
        <h3>Tags em alta</h3>
        <ul>
            <li>
                <strong>tag 1</strong>
                <span>130 posts</span>
            </li>
            <li>
                <strong>tag 2</strong>
                <span>125 posts</span>
            </li>
            <li>
                <strong>tag 3</strong>
                <span>120 posts</span>
            </li>
            <li>
                <strong>tag 4</strong>
                <span>115 posts</span>
            </li>
            <li>
                <strong>tag 5</strong>
                <span>110 posts</span>
            </li>
        </ul>
    </aside>
</template>

<script setup>
// Nenhuma lógica necessária por enquanto
</script>

<style scoped>
.sidebar-tags {
    padding: 15px;
    color: white;
    font-family: Arial, sans-serif;
}
h3 {
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
}
ul {
    list-style-type: none; /* Remove as bolinhas da lista */
    padding: 0;
}
li {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column; /* Coloca o número de posts abaixo da tag */
}
li strong {
    font-size: 1.1em;
}
li span {
    font-size: 0.9em;
    color: #aaa; /* Cor cinza para a contagem */
}
</style>
