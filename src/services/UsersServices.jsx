const URL_API_USERS = "http://localhost:8000/users"
const URL_API_POSTS = "http://localhost:8000/posts"

//GET method
export async function getAllUsers() {
    const response = await fetch(URL_API_USERS)
    if (!response.ok) {
        throw new Error('Error al obtener los usuarios')
    }

    return response.json()
}

//GET/:id method
export async function getOneUser(id) {
    const response = await fetch(`${URL_API_USERS}/${id}`)
    if (!response.ok) throw new Error('Error al obtener el usuario')
    return response.json()
}

export async function getUserPosts(authorId) {
    const response = await fetch(`${URL_API_POSTS}?author_id=${authorId}`)
    if (!response.ok) throw new Error("Error al obtener los posts del usuario");
    return response.json()
}
// PUT o PATCH /users/:id → { data: User }
export const updateUser = async (id, payload, { method = "put" } = {}) => {
    const fn = method === "patch" ? api.patch : api.put;
    const res = await fn(`/users/${id}`, payload);
    return res.data?.data;
};

// DELETE /users/:id → { message }
export const deleteUser = async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data; // { message }
};