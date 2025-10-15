// Utilidades para generar datos falsos (mock data) - Frontend only
console.log('🎭 MockData cargado - Sistema de datos simulados frontend')

export const mockData = {
    // Usuarios de ejemplo
    users: [
        {
            id: 1,
            name: 'Ana García',
            email: 'ana@celestialbloom.com',
            role: 'astronomer',
            avatar: '/public/gabriela.png',
            joinDate: '2024-01-15',
            bio: 'Astrónoma especializada en exoplanetas'
        },
        {
            id: 2,
            name: 'María López',
            email: 'maria@celestialbloom.com',
            role: 'botanist',
            avatar: '/public/mariany.png',
            joinDate: '2024-02-10',
            bio: 'Botánica experta en plantas tropicales'
        },
        {
            id: 3,
            name: 'Carmen Silva',
            email: 'carmen@celestialbloom.com',
            role: 'creator',
            avatar: '/public/paloma.png',
            joinDate: '2024-03-05',
            bio: 'Creadora de contenido científico'
        }
    ],

    // Generar usuario aleatorio
    generateRandomUser: () => {
        const names = ['Ana', 'María', 'Carmen', 'Sofía', 'Elena', 'Laura', 'Patricia', 'Claudia']
        const lastNames = ['García', 'López', 'Silva', 'Martín', 'González', 'Rodríguez', 'Fernández', 'Sánchez']
        const roles = ['astronomer', 'botanist', 'creator']
        const avatars = ['/public/gabriela.png', '/public/mariany.png', '/public/paloma.png', '/public/guissella.png', '/public/priscelis.png']
        
        const name = names[Math.floor(Math.random() * names.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const fullName = `${name} ${lastName}`
        const email = `${name.toLowerCase()}@celestialbloom.com`
        const role = roles[Math.floor(Math.random() * roles.length)]
        const avatar = avatars[Math.floor(Math.random() * avatars.length)]
        
        const user = {
            id: Date.now(),
            name: fullName,
            email,
            role,
            avatar,
            joinDate: new Date().toISOString().split('T')[0],
            bio: `${role === 'astronomer' ? 'Astrónoma' : role === 'botanist' ? 'Botánica' : 'Creadora'} apasionada por la ciencia`
        }
        
        console.log('👤 Usuario generado:', user)
        return user
    },

    // Artículos de ejemplo
    articles: [
        {
            id: 1,
            title: 'Los Secretos del Cosmos',
            category: 'astronomy',
            author: 'Ana García',
            date: '2024-01-20',
            excerpt: 'Descubre los misterios más fascinantes del universo...',
            content: 'El cosmos guarda secretos increíbles que la humanidad ha estado descubriendo...',
            image: '/src/assets/parallax-photo.jpg',
            tags: ['cosmos', 'estrellas', 'galaxias']
        },
        {
            id: 2,
            title: 'Plantas Extraordinarias',
            category: 'botany',
            author: 'María López',
            date: '2024-02-15',
            excerpt: 'Conoce las plantas más raras y hermosas del mundo...',
            content: 'En nuestro planeta existen plantas con características extraordinarias...',
            image: '/src/assets/parallax-photo.jpg',
            tags: ['plantas', 'naturaleza', 'biodiversidad']
        }
    ],

    // Generar artículo aleatorio
    generateRandomArticle: () => {
        const astronomyTitles = ['Nuevos Planetas Descubiertos', 'Misterios de los Agujeros Negros', 'La Vida en Marte', 'Lluvia de Meteoros']
        const botanyTitles = ['Plantas Carnívoras', 'Flores Nocturnas', 'Bosques Tropicales', 'Cactus del Desierto']
        const creatorTitles = ['Arte y Ciencia', 'Fotografía Astronómica', 'Documentales Científicos', 'Educación Ambiental']
        
        const categories = ['astronomy', 'botany', 'creator']
        const category = categories[Math.floor(Math.random() * categories.length)]
        
        let titles = astronomyTitles
        if (category === 'botany') titles = botanyTitles
        if (category === 'creator') titles = creatorTitles
        
        const title = titles[Math.floor(Math.random() * titles.length)]
        const authors = this.users.map(u => u.name)
        const author = authors[Math.floor(Math.random() * authors.length)]
        
        const article = {
            id: Date.now(),
            title,
            category,
            author,
            date: new Date().toISOString().split('T')[0],
            excerpt: `Explora ${title.toLowerCase()} en este fascinante artículo...`,
            content: `Este es el contenido completo del artículo sobre ${title.toLowerCase()}...`,
            image: '/src/assets/parallax-photo.jpg',
            tags: ['ciencia', 'investigación', 'descubrimiento']
        }
        
        console.log('📄 Artículo generado:', article)
        return article
    },

    // Simular respuesta de login exitoso
    mockLoginSuccess: (email) => {
        console.log('🔑 Simulando login exitoso para:', email)
        const user = this.users.find(u => u.email === email) || this.generateRandomUser()
        const response = {
            success: true,
            user,
            token: `mock_token_${Date.now()}`,
            message: 'Login exitoso'
        }
        console.log('✅ Login simulado exitoso:', response)
        return response
    },

    // Simular respuesta de registro exitoso
    mockRegisterSuccess: (userData) => {
        console.log('📝 Simulando registro exitoso para:', userData)
        const newUser = {
            id: Date.now(),
            ...userData,
            role: 'creator',
            avatar: '/public/gabriela.png',
            joinDate: new Date().toISOString().split('T')[0],
            bio: 'Nueva usuaria de CelestialBloom'
        }
        const response = {
            success: true,
            user: newUser,
            token: `mock_token_${Date.now()}`,
            message: 'Registro exitoso'
        }
        console.log('✅ Registro simulado exitoso:', response)
        return response
    },

    // Obtener usuario por email (simulado)
    getUserByEmail: (email) => {
        console.log('🔍 Buscando usuario por email:', email)
        const user = this.users.find(u => u.email === email)
        console.log(user ? '✅ Usuario encontrado' : '❌ Usuario no encontrado')
        return user
    }
}
