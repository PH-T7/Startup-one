<template>
    <div class="header-container">
        <img :src="avatar" :alt="username" class="header-avatar" />
        <div class="header-info">
            <div class="info-top-row">
                <h1 class="username">{{ username }}</h1>
                <button class="follow-button">Seguir</button>
            </div>
            <p class="bio">{{ bio }}</p>

            <div
                v-if="commissionStatus"
                :class="[
                    'commission-badge-profile',
                    commissionStatus.toLowerCase().replace(' ', '-'),
                ]"
            >
                Comissões: {{ commissionStatus }}
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    username: String,
    avatar: String,
    bio: String,
    commissionStatus: String,
});
</script>

<style scoped>
.header-container {
    display: flex;
    align-items: center;
}
.header-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 30px;
    object-fit: cover;
}
.header-info {
    flex-grow: 1;
}
.info-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.username {
    font-size: 2em;
    margin: 0;
}
.follow-button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
}
.bio {
    font-size: 1em;
    color: #ccc;
}

.commission-badge-profile {
    font-size: 0.9em;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 20px;
    display: inline-block; /* Para não ocupar a largura toda */
    margin-top: 10px;
}
.commission-badge-profile.aberto {
    background-color: #3aa073;
    color: white;
}
.commission-badge-profile.fechado {
    background-color: #d1495b;
    color: white;
}
.commission-badge-profile.lista-de-espera {
    background-color: #fca311;
    color: white;
}
</style>
