
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { EMAIL_ADMIN } from "@/lib/constants"

const allowedEmails = EMAIL_ADMIN

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
