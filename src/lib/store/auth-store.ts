import { create } from "zustand";
import { supabase } from "../supabase";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isSuperAdmin: boolean;
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const SUPER_ADMIN_EMAIL = "lbcloudadmin@gmail.com";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  isSuperAdmin: false,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;
    set({
      session,
      user,
      loading: false,
      isSuperAdmin: user?.email === SUPER_ADMIN_EMAIL,
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      set({
        session,
        user,
        isSuperAdmin: user?.email === SUPER_ADMIN_EMAIL,
      });
    });
  },

  signUp: async (email, password, fullName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };
    return { error: null };
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isSuperAdmin: false });
  },
}));
