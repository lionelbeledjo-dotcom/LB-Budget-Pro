import { create } from "zustand";
import { supabase, supabaseConfigured } from "../supabase";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isSuperAdmin: boolean;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

const SUPER_ADMIN_EMAIL = "lbcloudadmin@gmail.com";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  isSuperAdmin: false,

  initialize: async () => {
    if (!supabaseConfigured) {
      set({ loading: false });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;
    set({
      session,
      user,
      loading: false,
      isSuperAdmin: user?.email === SUPER_ADMIN_EMAIL,
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      const newUser = newSession?.user ?? null;
      set({
        session: newSession,
        user: newUser,
        loading: false,
        isSuperAdmin: newUser?.email === SUPER_ADMIN_EMAIL,
      });
    });
  },

  signOut: async () => {
    if (supabaseConfigured) {
      await supabase.auth.signOut();
    }
    set({ user: null, session: null, isSuperAdmin: false });
  },
}));
