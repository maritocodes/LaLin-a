import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // El identificador (ej: 'hero', 'vocesMarta')

    if (!file) {
      return NextResponse.json({ error: "No se ha proporcionado ningún archivo" }, { status: 400 });
    }

    // Generamos un nombre único usando el tipo y el nombre original para evitar sobreescrituras
    const filename = `${type}_${Date.now()}_${file.name}`;

    // Subimos el archivo directamente al almacenamiento de Vercel Blob
    const blob = await put(filename, file, {
      access: "public", // Permite que el archivo sea accesible mediante URL en la web
    });

    // Devolvemos la URL pública final de la imagen/video (ej: https://xxx.public.blob.vercel-storage.com/...)
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Error subiendo a Vercel Blob:", error);
    return NextResponse.json({ error: "Error en el servidor al subir el archivo" }, { status: 500 });
  }
}