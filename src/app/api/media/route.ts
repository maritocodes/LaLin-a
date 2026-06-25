import { NextResponse } from "next/server";
import { getMedia, setMedia } from "@/lib/media";

export async function POST(req: Request) {
  try {
    // Leemos el JSON que nos manda el cliente (ej. { heroBrightness: 0.8 })
    const body = await req.json();
    
    // Obtenemos el JSON actual
    const media = await getMedia();
    
    // Mezclamos los datos viejos con los nuevos
    const updatedMedia = { ...media, ...body };
    
    // Guardamos en el archivo
    await setMedia(updatedMedia);
    
    return NextResponse.json({ success: true, data: updatedMedia });
  } catch (error) {
    console.error("Error guardando datos:", error);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}