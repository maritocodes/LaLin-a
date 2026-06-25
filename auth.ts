// En tu auth.ts
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        // Leemos las credenciales desde el entorno seguro del servidor
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Comprobamos contra las variables seguras
        if (email === adminEmail && password === adminPassword) {
          return {
            id: "1",
            name: "Admin",
            email: adminEmail,
            role: "admin",
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
}