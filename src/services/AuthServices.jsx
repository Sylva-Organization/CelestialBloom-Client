import { useAuthStore } from "../store/AuthStore";

const URL_API_AUTH = "http://localhost:8000/auth";

// REGISTER
export async function registerUser(newUser) {
    const res = await fetch(`${URL_API_AUTH}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });

    if (!res.ok) throw new Error("Error al registrar el usuario");

    const data = await res.json();
    const { data: user, token } = data;

    // guarda en Zustand
    useAuthStore.getState().setAuth(user, token);

    return data;
}

// LOGIN
export async function loginUser(credentials) {
    const res = await fetch(`${URL_API_AUTH}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials), // { identifier, password }
    });

    if (!res.ok) throw new Error("Error al iniciar sesión");

    const data = await res.json();
    const { data: user, token } = data;

    // guarda en Zustand
    useAuthStore.getState().setAuth(user, token);

    return data;
}

// LOGOUT
export async function logoutUser() {
    const token = useAuthStore.getState().token;

    await fetch(`${URL_API_AUTH}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    useAuthStore.getState().logout();
}
