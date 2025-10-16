import { useAuthStore } from "../store/authStore";

// zustand
export function getAuthHeaders() {
    const token = useAuthStore.getState().token;
    return token
        ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" };
}