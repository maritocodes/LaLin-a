import NextAuth from "next-auth";
import { authConfig } from "@/auth"; // Ajusta la ruta si es necesario

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };