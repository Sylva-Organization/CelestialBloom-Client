const URL_API = "http://localhost:3000/posts"
const EXPANDED_URL =  `${URL_API}?_expand=user&_expand=categories`

//GET METHOD
export async function getAllArticles() {
    const response = await fetch(EXPANDED_URL)
    if (!response.ok) {
        throw new Error('Error al obtener los artículos')
    }

    return response.json() //convierte la respuesta del servidor a JSON y devuelve los datos para que se puede usar en la app
}

//GET/:ID
export async function getOneArticle(id) {
    // const response = await fetch (`${URL_API}/${id}`)
    const response = await fetch (`${URL_API}/${id}?_expand=user&_expand=categories`)
    if (!response.ok) throw new Error('Error al obtener el artículo')
    return response.json()
}

// POST method
export async function createArticle(newArticle) {
    const response = await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
    })

    if (!response.ok) {
        throw new Error('Error al crear el artículo')
    }
    return response.json()
}

// PUT method


// DELETE method
export async function deleteArticle(id) {
    const response = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Error al eliminar el artículo')
    }

    return response.json()
}