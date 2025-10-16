# CelestialBloom-Client

## Descripción

**CelestialBloom-Client** es una aplicación web moderna desarrollada con React que combina contenido astronómico y botánico en una plataforma interactiva. Este proyecto frontend se integra con el backend de CelestialBloom para ofrecer a los usuarios una experiencia completa de exploración y aprendizaje sobre el fascinante mundo de las plantas y los fenómenos celestiales.

La aplicación permite a los usuarios navegar por artículos especializados, gestionar sus perfiles personales y participar en una comunidad dedicada a la naturaleza y el cosmos, todo a través de una interfaz intuitiva y responsive optimizada para cualquier dispositivo.

## Características principales

- **Gestión de Artículos**: Visualización y exploración de contenido botánico y astronómico
- **Sistema de Autenticación**: Registro, inicio de sesión con JWT y gestión de perfiles
- **Búsqueda y Filtrado**: Funcionalidades para encontrar contenido por categorías
- **Interfaz Responsiva**: Diseño adaptativo optimizado para móviles y desktop
- **Gestión de Roles**: Sistema de permisos para usuarios y administradores
- **Integración con Cloudinary**: Gestión y optimización de imágenes
- **UI/UX Moderna**: Componentes reutilizables con SweetAlert2

## Stack Tecnológico

- **Frontend:** React 18 + Vite
- **Routing:** React Router DOM
- **Estado Global:** Zustand
- **Estilos:** CSS3 + Responsive Design
- **Alertas:** SweetAlert2
- **Imágenes:** Cloudinary
- **Testing:** Vitest + React Testing Library
- **Herramientas:** ESLint, Prettier

## Arquitectura del proyecto

```
CelestialBloom-Client/
│
├── src/                    # Código fuente principal
│   ├── components/         # Componentes reutilizables de UI
│   │   ├── navBar.jsx     # Navegación principal
│   │   ├── ArticlesFront.jsx # Listado de artículos
│   │   └── ...
│   ├── pages/             # Vistas y páginas principales
│   │   ├── Login.jsx      # Página de inicio de sesión
│   │   ├── Register.jsx   # Página de registro
│   │   └── ...
│   ├── services/          # Servicios de comunicación con APIs
│   │   ├── UsersServices.jsx    # Gestión de usuarios
│   │   ├── ArticlesServices.jsx # Gestión de artículos
│   │   └── ...
│   ├── store/             # Estado global con Zustand
│       └── authStore.js   # Store de autenticación
├── test/              # Suite de pruebas unitarias
│   │   └── Navbar.test.jsx # Test TDD del componente Navbar
├── server/                # Servidor de desarrollo
│   └── db.json           # Base de datos JSON para desarrollo
├── public/               # Archivos públicos estáticos
├── .env.example         # Variables de entorno 
└── package.json         # Dependencias y scripts
```

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/Sylva-Organization/CelestialBloom-Client.git
cd CelestialBloom-Client
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` basado en `.env.example`:

```env
VITE_UPLOAD_PRESET=tu_upload_preset
VITE_CLOUDINARY_FOLDER=celestialbloom
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/tu_cloud_name
```

### 4. Ejecutar la aplicación

**Servidor de desarrollo (Frontend):**
```bash
npm run dev
```

**API de desarrollo (Backend simulado):**
```bash
npm run api-fake
```

La aplicación estará disponible en:
- **Frontend:** `http://localhost:5173`

## Testing

Ejecutar tests unitarios:
```bash
npm run test
```

**Cobertura actual:**
- ✅ Test TDD del Navbar
- ✅ Configuración con Vitest + React Testing Library

## Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Para consultas o soporte:
- 🏢 **Organización:** [Celestial-Bloom](https://github.com/Sylva-Organization)

---