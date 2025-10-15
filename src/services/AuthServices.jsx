const URL_API_AUTH = "http://localhost:8000/auth";

/* ============================
   REGISTER  →  POST /auth/register
============================ */
export async function registerUser(newUser) {
    try {
        const response = await fetch(`${URL_API_AUTH}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error("Error al registrar el usuario");
        }

        // el backend devuelve { data: user, token }
        return response.json();
    } catch (error) {
        console.error("registerUser error:", error.message);
        throw error;
    }
}

/* ============================
   LOGIN  →  POST /auth/login
============================ */
export async function loginUser(credentials) {
    try {
        const response = await fetch(`${URL_API_AUTH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials), // { identifier, password }
        });

        if (!response.ok) {
            throw new Error("Error al iniciar sesión");
        }

        // el backend devuelve { data: user, token }
        const data = await response.json();
        // guarda el token si querés mantener sesión
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("loginUser error:", error.message);
        throw error;
    }
}

/* ============================
   LOGOUT  →  POST /auth/logout
============================ */
export async function logoutUser() {
    try {
        const response = await fetch(`${URL_API_AUTH}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }

        localStorage.removeItem("token");
        return response.json(); // { message: "Logged out successfully" }
    } catch (error) {
        console.error("logoutUser error:", error.message);
        throw error;
    }
}