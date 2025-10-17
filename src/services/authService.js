import { api } from "./http";
import { useAuthStore } from "../store/authStore";

export const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    const { token, data: user } = res.data || {};
    useAuthStore.getState().setAuth({ token, user });
    return { token, user };
};

export const fetchMe = async () => {
    const res = await api.get("/auth/me");
    const user = res.data?.data || null;
    useAuthStore.getState().setAuth({ user });
    return user;
};

export const logout = async () => {
    try {
       
    } finally {
        useAuthStore.getState().clearAuth();
    }
};