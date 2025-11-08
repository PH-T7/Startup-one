import { ref } from "vue";

// Usamos 'ref' para que, se este valor mudar,
// todos os componentes que o usam sejam atualizados automaticamente.
export const currentUser = ref({
  name: "PH",
  avatar:
    "https://images.steamusercontent.com/ugc/687144448805587280/6085648611088858DCCDB7A0C088B5A074FE07C3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
  handle: "@Phael",
});
