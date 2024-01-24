# Backend de Aplicación de Tareas

Este backend para la Aplicación de Tareas es una API RESTful construida con Go, utilizando el framework web Gin y GORM para el mapeo objeto-relacional. Provee endpoints para la gestión de tareas en una base de datos PostgreSQL.

## Requisitos Previos

- Go (versión 1.x)
- Docker
- PostgreSQL (se puede usar a través de Docker)

## Configuración y Ejecución

### Configuración de la Base de Datos

Iniciar una instancia de PostgreSQL usando Docker:

- `docker run --name some-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres `
  Asegúrate de cambiar mysecretpassword por tu propia contraseña.

### Configuración del Proyecto

Clona el repositorio y navega al directorio del proyecto:

- `git clone https://github.com/matias-rojas-dev/todo-app-next-go`
- `cd todo-app-next-go/backend`

Instala las dependencias del proyecto:

- `go mod tidy`

Ejecuta el servidor de la aplicación:

- `go run .`

Esto iniciará el servidor en localhost:3001.

## Uso de la API

La API soporta los siguientes endpoints:

- Obtener todas las tareas: GET /tasks
- Obtener una tarea por ID: GET /tasks/:id
- Crear una nueva tarea: POST /tasks
- Actualizar una tarea existente: PATCH /tasks/:id
- Eliminar una tarea: DELETE /tasks/:id
