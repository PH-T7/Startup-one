<template>
    <aside class="sidebar-recomendados">
        <section v-if="featuredArtist" class="featured-artist">
            <h3>Artista em Destaque</h3>
            <router-link
                :to="`/perfil/${featuredArtist.username}`"
                class="artist-card-link"
            >
                <div class="artist-card">
                    <img
                        :src="featuredArtist.avatar_url"
                        class="artist-avatar"
                        alt="Avatar do artista em destaque"
                    />
                    <div class="artist-info">
                        <strong>{{ featuredArtist.username }}</strong>
                        <span
                            v-if="featuredArtist.commission_status"
                            :class="[
                                'artist-status',
                                featuredArtist.commission_status
                                    .toLowerCase()
                                    .replace(' ', '-'),
                            ]"
                        >
                            {{ featuredArtist.commission_status }}
                        </span>
                    </div>
                </div>
            </router-link>
        </section>

        <section class="post-grid">
            <h3>Posts de quem você segue</h3>
            <div class="grid-container">
                <!-- This part is still static, can be made dynamic later -->
                <div class="grid-item">
                    <img
                        src="https://pbs.twimg.com/media/GK_s8A8WAAA-NfY?format=jpg&name=medium"
                        alt="Post"
                    />
                </div>
                <div class="grid-item">
                    <img
                        src="https://pbs.twimg.com/media/GFu8m0tXEAAkqaR?format=jpg&name=medium"
                        alt="Post"
                    />
                </div>
                <div class="grid-item">
                    <img
                        src="https://pbs.twimg.com/media/GI-S-qiaEAABhB0?format=jpg&name=medium"
                        alt="Post"
                    />
                </div>
                <div class="grid-item">
                    <img
                        src="https://pbs.twimg.com/media/GIl89m0WQAAdJcg?format=jpg&name=medium"
                        alt="Post"
                    />
                </div>
            </div>
        </section>
    </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../service/supabase";
import { currentUser } from "../../service/store";

const featuredArtist = ref(null);

onMounted(async () => {
    // Fetch a user that is not the current user, and who has an avatar
    let query = supabase
        .from("profiles")
        .select("*")
        .not("avatar_url", "is", null) // Ensure the user has an avatar
        .limit(10); // Fetch a few to have a choice

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching featured artist:", error);
    } else if (data) {
        let artists = data;
        // Filter out the current user if they are in the list
        if (currentUser.value) {
            artists = artists.filter(
                (artist) => artist.id !== currentUser.value.id,
            );
        }
        // Pick a random artist from the filtered list
        if (artists.length > 0) {
            const randomIndex = Math.floor(Math.random() * artists.length);
            featuredArtist.value = artists[randomIndex];
        }
    }
});
</script>

<style scoped>
.sidebar-recomendados {
    padding: 15px;
    color: white;
    font-family: Arial, sans-serif;
}
h3 {
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
}
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
}

.grid-item {
    width: 100%;
    border-radius: 8px;
    background-color: #333;
    overflow: hidden;
    aspect-ratio: 1 / 1;
}
.grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.post-grid {
    margin-bottom: 25px;
}
.featured-artist {
    background-color: #222;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}
.artist-card-link {
    text-decoration: none;
    color: inherit;
}
.artist-card {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
}
.artist-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}
.artist-info {
    display: flex;
    flex-direction: column;
}
.artist-info strong {
    font-size: 1.1em;
    font-weight: 600;
}
.artist-status {
    font-size: 0.8em;
    font-weight: 600;
    padding: 3px 6px;
    border-radius: 10px;
    margin-top: 4px;
    align-self: flex-start;
    text-transform: capitalize;
}
.artist-status.aberto {
    background-color: #3aa073;
    color: white;
}
.artist-status.fechado {
    background-color: #d1495b;
    color: white;
}
.artist-status.lista-de-espera {
    background-color: #fca311;
    color: white;
}
</style>
