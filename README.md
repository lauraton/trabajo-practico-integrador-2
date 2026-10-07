# Trabajo Práctico Integrador II

Frontend en **React + Vite** con **Tailwind CSS** para el Sistema de Gestión de Blog Personal con Autenticación.

## Backend utilizado (Trabajo Práctico Integrador I)

https://github.com/lauraton/trabajo-practico-integrador-1

## Cómo levantar el proyecto

### 1. Backend

1. Clonar el repositorio del backend e instalar dependencias con `npm install`.
2. Crear el archivo `.env` a partir de `.env.example` (el backend debe correr en el puerto **6767**).
3. Verificar que en `app.js` el CORS acepte credenciales desde Vite:

   ```js
   app.use(cors({ origin: "http://localhost:5173", credentials: true }));
   ```

4. Levantar el servidor con `npm run dev`.

### 2. Frontend (este repositorio)

1. Clonar este repositorio.
2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Levantar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir http://localhost:5173

## Funcionalidades

- Registro de usuario con creación de perfil (`POST /api/auth/register`).
- Inicio de sesión con JWT en cookie (`POST /api/auth/login`) y `isLogged` en `localStorage`.
- Listado de artículos publicados (`GET /api/articles`).
- Cierre de sesión (`POST /api/auth/logout`).
- Rutas públicas (Login y Register) y privadas (Home).

## Estructura

```
src/
├── components/   Navbar
├── hooks/        useFetch y useForm
├── pages/        HomePage, LoginPage y RegisterPage
├── router/       AppRouter, PrivateRoutes y PublicRoutes
├── App.jsx
├── index.css
└── main.jsx
```
