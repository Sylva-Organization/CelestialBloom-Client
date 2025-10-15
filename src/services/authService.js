import { api } from "./http";
import { useAuthStore } from "../store/authStore";

// Login: backend debería devolver { token, data: user }
export const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    const { token, data: user } = res.data || {};
    useAuthStore.getState().setAuth({ token, user });
    return { token, user };
};

// Obtener perfil actual (si el back expone /auth/me)
export const fetchMe = async () => {
    const res = await api.get("/auth/me");
    const user = res.data?.data || null;
    useAuthStore.getState().setAuth({ user });
    return user;
};

// Logout simple en front (y opcionalmente /auth/logout si existe)
export const logout = async () => {
    try {
        // await api.post("/auth/logout"); // si tu back lo tiene
    } finally {
        useAuthStore.getState().clearAuth();
    }
};