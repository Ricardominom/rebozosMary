import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  setSession: (session) =>
    set({ session, user: session?.user ?? null, loading: false }),

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },

  isAdmin: (user) => user?.user_metadata?.role === 'admin',
}))
