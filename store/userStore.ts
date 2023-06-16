import { create } from "zustand";
import { User } from "../model/user";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  accessToken: null,
  setAccessToken: (accessToken: string) => set({ accessToken }),
}));