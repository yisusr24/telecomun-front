<<<<<<< HEAD
# telecomun-front
=======
# telecomun-front

## Descripción
Este proyecto corresponde al frontend del sistema **Notes**, desarrollado en **Angular** y desplegado con **Nginx**. Se comunica con el backend a través de APIs y se autentica utilizando **Keycloak**.

## Requisitos previos
Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js** (v18 o superior) y **npm**
- **Angular CLI** (v18 o superior)
- **Docker** y **Docker Compose** (si deseas ejecutar el sistema completo con contenedores)

## Instalación y ejecución
### 1. Clonar el repositorio
```bash
git clone https://gitlab.gizlosoftware.com/developer-test/developer-test-web.git
cd telecomun-front
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
Para iniciar el servidor de desarrollo con recarga automática:
```bash
ng serve --open
```
El proyecto estará disponible en `http://localhost:4200/`.

## Despliegue con Docker
Si deseas ejecutar el frontend con **Nginx** dentro de un contenedor Docker:

### 1. Generar el build del proyecto
```bash
ng build 
```

### 2. Construir la imagen Docker
```bash
docker build -t telecomun-front .
```

### 3. Ejecutar el contenedor
```bash
docker run -d -p 80:80 --name telecomun-front telecomun-front
```
El frontend estará disponible en `http://localhost/`.

## Despliegue con Docker Compose
Si estás ejecutando el backend y otros servicios en **Docker Compose**, sigue estos pasos:

1. Asegúrate de que el archivo `docker-compose.yml` se encuentra en la raíz del proyecto.
2. Ejecuta:
```bash
docker-compose up -d
```
El frontend se desplegará automáticamente junto con el backend y los demás servicios.

## Creación de usuarios en Keycloak
Para acceder a la aplicación, debes crear un usuario en Keycloak:

1. Ir a `http://localhost:8080/admin/master/console`.
2. Iniciar sesión con las credenciales de administrador (`admin/admin`).
3. Navegar a **Usuarios** → **Agregar usuario**.
4. Configurar nombre, correo y credenciales.
5. Guardar y probar el inicio de sesión.

## Tecnologías utilizadas
- **Angular** (v19)
- **TypeScript**
- **Nginx** (para despliegue con Docker)
- **Keycloak** (para autenticación)
>>>>>>> 39b8f9c (Simulación del entorno frontend Angular dockerizado con Nginx)
