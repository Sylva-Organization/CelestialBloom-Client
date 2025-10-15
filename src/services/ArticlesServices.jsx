import { useAuthStore } from "../store/authStore"

const URL_API = "http://localhost:8000/posts"
const EXPANDED_URL =  `${URL_API}?_expand=user&_expand=categories`

// zustand
function getAuthHeaders() {
  const token = useAuthStore.getState().token;
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

//GET METHOD
export async function getAllArticles() {
    const response = await fetch(EXPANDED_URL, {headers: getAuthHeaders(),        
    })
    if (!response.ok) {
        throw new Error('Error al obtener los artículos')
    }

    return response.json() //convierte la respuesta del servidor a JSON y devuelve los datos para que se puede usar en la app
}

//GET/:ID
export async function getOneArticle(id) {
    // const response = await fetch (`${URL_API}/${id}`)
    const response = await fetch (`${URL_API}/${id}?_expand=user&_expand=categories`, {headers: getAuthHeaders(), 
        
});
    if (!response.ok) throw new Error('Error al obtener el artículo')
    return response.json()
}

// POST method
export async function createArticle(articleData) {
    const response = await fetch(URL_API, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(articleData)
    })

    if (!response.ok) {
        throw new Error('Error al crear el artículo')
    }
    return response.json()
}

// PUT method
export async function updateArticle(id, articleData) {
    const response = await fetch(`${URL_API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData)
    })

    if (!response.ok) {
        throw new Error('Error al actualizar el artículo')
    }

    return response.json()
}

// DELETE method
export async function deleteArticle(id) {
    const response = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        throw new Error('Error al eliminar el artículo')
    }

    return response.json()
}