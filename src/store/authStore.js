import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
    (set) => ({
        user: null,
        token: null,
        roles: [],
        setAuth: (user, token) => set({ user, token, roles: user?.role ? [user.role] : [] }),
        logout: () => set({ user: null, token: null, roles: [] 
    }),

     // helpers
      isAuthenticated: () => Boolean(get().token),      
      isAdmin: () => get().roles.includes("admin"),
    }),

    {
        name: 'auth-storage',
        getStorage: () => localStorage
    }
));