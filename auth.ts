
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const allowedEmails = ["adm@gmail.com"]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      if (profile?.email && allowedEmails.includes(profile?.email)) {
        return true
      }
      return false
    },
  },
})
