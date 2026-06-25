import { kv } from "@vercel/kv";

// Clave única bajo la cual guardaremos todo el objeto de configuración en Redis
const KV_MEDIA_KEY = "lalinea:media_config";

export async function getMedia() {
  try {
    const data = await kv.get(KV_MEDIA_KEY);
    // Si no hay datos en la base de datos todavía, devolvemos un objeto vacío
    if (!data) return {};
    return data;
  } catch (error) {
    console.error("Error leyendo de Vercel KV:", error);
    return {};
  }
}

export async function setMedia(newData: any) {
  try {
    // Guardamos el objeto de golpe en Vercel KV
    await kv.set(KV_MEDIA_KEY, newData);
  } catch (error) {
    console.error("Error escribiendo en Vercel KV:", error);
  }
}