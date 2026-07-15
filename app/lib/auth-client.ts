import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Prefix with NEXT_PUBLIC_ so the browser can read it!
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://skill-bridge-client-rho.vercel.app"
})

export const { signIn, signUp, useSession } = authClient;