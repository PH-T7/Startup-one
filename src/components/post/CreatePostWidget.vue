<template>
    <div class="create-post-widget">
        <div class="input-row">
            <img
                :src="
                    currentUser
                        ? currentUser.avatar_url
                        : 'https://i.pravatar.cc/150?img=1'
                "
                class="avatar"
                alt="Seu Avatar"
            />

            <input
                type="text"
                class="input-box"
                placeholder="O que você está criando hoje?"
                v-model="newPostText"
            />
        </div>

        <div v-if="selectedFilePreview" class="image-preview">
            <img :src="selectedFilePreview" />
            <button class="remove-image" @click="removeImage">X</button>
        </div>

        <div class="actions-row">
            <button class="icon-button" @click="triggerFileInput">
                <img src="@/assets/paperclip.svg" class="btn-icon" />
            </button>

            <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                class="file-input"
                accept="image/png, image/jpeg, image/gif"
            />

            <button
                class="post-button"
                @click="handlePost"
                :disabled="isUploading"
            >
                {{ isUploading ? "Enviando..." : "Postar" }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
// A router não é mais necessária aqui
// import { useRouter } from "vue-router";
import { supabase, getPublicUrl } from "../../lib/supabaseClient";
import store from "@/lib/store.js";

// 1. DEFINIR O EVENTO QUE VAMOS EMITIR
const emit = defineEmits(["post-created"]);

// const router = useRouter(); // Não precisamos mais
const newPostText = ref("");
const isUploading = ref(false);
const currentUser = computed(() => store.state.currentUser);

// ... (toda a lógica de 'fileInput', 'handleFileSelect', 'removeImage' continua igual) ...
const fileInput = ref(null);
const selectedFile = ref(null);
const selectedFilePreview = ref(null);

function triggerFileInput() {
    fileInput.value.click();
}
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    selectedFile.value = file;
    selectedFilePreview.value = URL.createObjectURL(file);
}
function removeImage() {
    selectedFile.value = null;
    selectedFilePreview.value = null;
    fileInput.value.value = null;
}

// FUNÇÃO DE POSTAR (ATUALIZADA)
async function handlePost() {
    if (newPostText.value.trim() === "" && !selectedFile.value) {
        alert("Escreva algo ou adicione uma imagem para postar!");
        return;
    }
    isUploading.value = true;
    let uploadedImageUrl = null;

    try {
        if (selectedFile.value) {
            const fileName = `public/${currentUser.value.id}-${Date.now()}-${
                selectedFile.value.name
            }`;
            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from("uploads")
                    .upload(fileName, selectedFile.value);

            if (uploadError) throw uploadError;
            uploadedImageUrl = getPublicUrl(fileName);
        }

        const { data: newPost, error: insertError } = await supabase
            .from("posts")
            .insert([
                {
                    user_id: currentUser.value.id,
                    text: newPostText.value,
                    // CORREÇÃO AQUI
                    image_url: uploadedImageUrl, // Mudado de imageUrl para image_url
                },
            ])
            .select(); // <-- Importante: Pega o post que acabou de ser criado

        if (insertError) throw insertError;

        console.log("Post criado com sucesso!");
        removeImage();
        newPostText.value = "";

        // 2. AVISAR A HOME.VUE (EMITIR O EVENTO)
        // Nós não vamos recarregar a página
        // window.location.reload(); // <-- DELETAR ISSO

        // Em vez disso, vamos emitir o evento com o novo post
        if (newPost && newPost.length > 0) {
            emit("post-created", newPost[0]);
        }
    } catch (error) {
        console.error("Erro ao adicionar post: ", error.message);
        alert("Erro ao postar: " + error.message);
    } finally {
        isUploading.value = false;
    }
}
</script>

<style scoped>
.create-post-widget {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #1a1a1a;
    padding: 15px;
    border-bottom: 1px solid #444;
}
.input-row {
    display: flex;
    align-items: center;
    gap: 10px;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.input-box {
    flex-grow: 1;
    padding: 12px;
    background-color: #222;
    border: 1px solid #444;
    border-radius: 20px;
    color: white;
    font-size: 1em;
}
.input-box:focus {
    outline: none;
    border-color: #42b883;
}

/* --- ESTILOS NOVOS --- */
.image-preview {
    position: relative;
    max-height: 200px;
    overflow: hidden;
    border-radius: 16px;
    margin-top: 5px;
}
.image-preview img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
.remove-image {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-weight: bold;
    cursor: pointer;
}

.actions-row {
    display: flex;
    justify-content: space-between; /* Botões em lados opostos */
    align-items: center;
    margin-top: 5px;
}

.icon-button {
    background: none;
    border: none;
    color: #42b883; /* Cor verde (pode mudar) */
    font-size: 1.5em;
    cursor: pointer;
    padding: 5px;
}
.icon-button:hover {
    background-color: #222;
    border-radius: 50%;
}

/* Input de arquivo escondido */
.file-input {
    display: none;
}

.post-button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
}
.post-button:disabled {
    background-color: #888;
    cursor: not-allowed;
}
</style>
