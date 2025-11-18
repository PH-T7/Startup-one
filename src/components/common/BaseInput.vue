<template>
    <div class="input-wrapper">
        <label v_if="label" :for="id">{{ label }}</label>
        <input
            :id="id"
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
        />
    </div>
</template>

<script setup>
import { computed } from "vue";

defineProps({
    label: String,
    type: {
        type: String,
        default: "text", // Pode ser 'text', 'password', 'email'
    },
    modelValue: String, // Isso é o que faz o v-model funcionar
    placeholder: String,
});

// Define o evento que o v-model escuta
defineEmits(["update:modelValue"]);

// Gera um ID único para conectar o label ao input (bom para acessibilidade)
const id = computed(
    () => `base-input-${Math.random().toString(36).substring(2, 9)}`,
);
</script>

<style scoped>
.input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}
label {
    margin-bottom: 8px;
    font-size: 0.9em;
    color: #ccc;
}
input {
    background-color: #2c2c2c;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 12px 10px;
    color: white;
    font-size: 1em;
}
input:focus {
    outline: none;
    border-color: #42b883; /* Verde do Vue, como exemplo */
}
</style>
