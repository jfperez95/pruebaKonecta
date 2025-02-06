readme_content = """# Aplicación Full Stack con Node.js, React y PostgreSQL

Este proyecto es una **aplicación web completa** que permite la gestión de empleados y solicitudes, desarrollado con **Node.js**, **React** y **PostgreSQL**, y ejecutado dentro de un contenedor **Docker**.

## TECNOLOGIAS UTILIZADAS

- **Backend:** Node.js v22.13.1, Express, Sequelize, JWT
- **Frontend:** React 19.0.0, Context API
- **Base de Datos:** PostgreSQL
- **Pruebas:** Jest (backend), React Testing Library (frontend)
- **Contenedores:** Docker, Docker Compose


## INSTALACION Y EJECUCION

En primer lugar es necesario tener instalado docker en el equipo. Una vez esté instalado docker en el equipo, en la raiz del proyecto abra la consola y ejecute el siguiente comando.

```sh
docker-compose up --build
```

Esto creara las imagenes y el contenedor:
* Dentro del contenedor ejecutará postgressql, además con un adeministrador visual llamado pgadmin
* Al ejecutar el back se crearán las tablas con las relaciones y además se hará una inserción de datos iniciales por medio de un seeder.
* Por ultimo correra el front creado en React

## EJECUTAR CON DOCKER
1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/jfperez95/pruebaKonecta.git

2. Ejecutar Docker Compose

```sh
docker-compose up --build
```

Esto ejecutará automáticamente:

Backend (pruebaBack) en http://localhost:5000
Frontend (pruebaFront) en http://localhost:3000
PostgreSQL en un contenedor
pgAdmin para gestión de la base de datos en http://localhost:5050 (usuario: admin@mail.com, contraseña: root)

En caso de  haber un error al ejecutarse abra la consola y ejecute los siguientes comandos:


```sh
docker exec -it codigosnode-postgres-1 bash
```
```sh
psql -U prueba -d postgres
```
```sh
CREATE DATABASE prueba;
```
```sh
\q
```
```sh
exit
```
```sh
docker-compose down -v
```
```sh
docker-compose up --build
```

Frontend


Construido con React y Context API para el manejo de estado global.
Lazy Loading para mejorar el rendimiento.
Diferenciación de vistas por roles (Empleado/Admin).

Al haber hecho correctamente los pasos anteriores tenga en cuenta que para realizar el login puede ingresar las siguientes credenciales

**Usuario: ramiro@ramiro.com
**Password: 123456

Para todos los usuarios ya registrados inicialmente, la contreseña es 123456


## SEGURIDAD

Protección contra SQL Injection y XSS mediante el uso de Sequelize.
Autenticación con JWT y encriptación de contraseñas con bcrypt.
Se usa express-validator para evitar las XSS (Cross-Site Scripting).
Se usa Helmet para proteger las cabeceras HTTP.
Roles diferenciados: Solo los administradores pueden modificar y eliminar datos.

## MEJORES PRACTICAS

Código modular y reutilizable.
ORM con Sequelize en lugar de consultas SQL directas.
Uso de variables de entorno (.env) para credenciales y configuraciones.
Dockerización para facilitar el despliegue.