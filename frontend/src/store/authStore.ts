import axios from "axios";
import { create } from "zustand";
import api from "../services/api";
import { Role } from "../types";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  avatarUrl: string | null;
};

type AuthState = {
  user: User | null;
  loading: boolean;

  fetchMe: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchMe: async () => {
    try {
      const res = await api.get("/users/me");
      const user = res.data;
      console.log(user);
      set({ user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await axios.post("/auth/logout");
    set({ user: null });
  },
}));
