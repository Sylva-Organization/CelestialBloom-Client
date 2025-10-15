const URL_API_USERS = "http://localhost:3000/users"
const URL_API_POSTS = "http://localhost:3000/posts"

// Servicio de autenticación
export async function loginUser(email, password) {
    try {
        // Obtener todos los usuarios para simular login
        const response = await fetch(URL_API_USERS)
        if (!response.ok) {
            throw new Error('Error al conectar con el servidor')
        }
        
        const users = await response.json()
        
        // Buscar usuario por email y password
        const user = users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        )
        
        if (!user) {
            throw new Error('Credenciales incorrectas')
        }
        
        // Generar token simulado (en un backend real sería un JWT firmado)
        const token = generateToken(user)
        
        // Guardar token en localStorage
        localStorage.setItem('celestialbloom_token', token)
        
        return {
            success: true,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                username: user.nick_name,
                role: user.role || 'user'
            },
            token
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

export async function registerUser(userData) {
    try {
        const newUser = {
            id: Date.now().toString(),
            role: "user",
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            password: userData.password,
            nick_name: userData.username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        
        // En un sistema real, esto sería un POST al backend
        console.log('Usuario registrado:', newUser)
        
        const token = generateToken(newUser)
        
        // Guardar token en localStorage
        localStorage.setItem('celestialbloom_token', token)
        
        return {
            success: true,
            user: {
                id: newUser.id,
                firstName: newUser.first_name,
                lastName: newUser.last_name,
                email: newUser.email,
                username: newUser.nick_name,
                role: newUser.role
            },
            token
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

export function generateToken(user) {
    // Simulación de JWT - en producción usar una librería como jsonwebtoken
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas
    }))
    const signature = btoa(`signature_${user.id}_${Date.now()}`)
    
    return `${header}.${payload}.${signature}`
}

export function verifyToken(token) {
    try {
        if (!token) return null
        
        const parts = token.split('.')
        if (parts.length !== 3) return null
        
        const payload = JSON.parse(atob(parts[1]))
        
        // Verificar expiración
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null
        }
        
        return payload
    } catch (error) {
        return null
    }
}

export function isTokenValid(token) {
    const payload = verifyToken(token)
    return payload !== null
}

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
    const response = await fetch (`${URL_API_USERS}/${id}`)
    if (!response.ok) throw new Error('Error al obtener el usuario')
    return response.json()
}

export async function getUserPosts(authorId) {
    const response = await fetch(`${URL_API_POSTS}?author_id=${authorId}`)
    if (!response.ok) throw new Error("Error al obtener los posts del usuario");
    return response.json()
}