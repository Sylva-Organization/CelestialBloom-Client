const URL_API_USERS = "http://localhost:8000/users"
const URL_API_POSTS = "http://localhost:8000/posts"
import { getAuthHeaders } from "./apiHelpers";

export async function getAllUsers() {
    const response = await fetch(URL_API_USERS, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al obtener los usuarios')
    }
    return response.json()
}

export async function getOneUser(id) {
    const response = await fetch(`${URL_API_USERS}/${id}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener el usuario')
    return response.json()
}

export async function getUserPosts(authorId) {
    const response = await fetch(`${URL_API_POSTS}?author_id=${authorId}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Error al obtener los posts del usuario");
    return response.json();
}

export const updateUser = async (id, payload, { method = "put" } = {}) => {
    const fn = method === "patch" ? api.patch : api.put;
    const res = await fn(`/users/${id}`, payload);
    return res.data?.data;
};


export const deleteUser = async (id) => {
    const res = await api.delete(`/users/${id}`, {
        headers: getAuthHeaders()
    });
    return res.data;
};