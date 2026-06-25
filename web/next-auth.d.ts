import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Ampliamos los tipos de next-auth
declare module "next-auth" {
  // Ampliamos el tipo Session
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  // Ampliamos el tipo User (el que devuelves en tu authorize)
  interface User {
    role?: string;
  }
}

// Ampliamos los tipos del JWT
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}