import { ref } from "vue";

// Usamos 'ref' para que, se este valor mudar,
// todos os componentes que o usam sejam atualizados automaticamente.
export const currentUser = ref({
  name: "ArtistaManga",
  avatar: "https://i.pravatar.cc/150?img=11",
  handle: "@artista_manga",
});
