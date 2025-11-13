import { createClient } from "@supabase/supabase-js";

// Pega as variáveis do .env (igual ao guia do professor [cite: 960, 961])
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Exporta o cliente (igual ao guia [cite: 964])
export const supabase = createClient(supabaseUrl, supabaseKey);

// Função helper para pegar a URL pública de um arquivo do Storage
export function getPublicUrl(filePath) {
  const { data } = supabase.storage
    .from("uploads") // O nome do "bucket" que criamos
    .getPublicUrl(filePath);

  return data.publicUrl;
}
