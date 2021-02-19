# Sprinter

_Desarrollo de lógica del proyecto por parte del cliente, para proporcionar la API a la cual se van a realizar la peticiones para crear usuarios y espacios de trabajo._

## Comenzando [🚀](https://github.com/carosalazar28/server-sprinter)

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

Tener instalado Node de manera global para correr en local el servidor.

### Instalación 🔧

_Para ejecutar la APP desde tu local deberás de clonar el repositorio con el siguiente comando_

```
git clone https://github.com/carosalazar28/server-sprinter
```

### Ejecución 🔧

_Para ejecutar la APP desde tu local ejecuta el siguiente comando_

```
yarn start
```

_O tambien puedes realizar peticiones desde el despliegue de heroku_:

https://sprinter-service.herokuapp.com/

### End Points 📡

Las rutas creadas de los MVC son:

```
/user
/workspaces
/task
/backlog
```

_De las anteriores rutas se podran realizar las siguientes peticiones:_

```
/user/sign-up -> post
/user/sign-in -> post
/user/users -> get
/user/ -> get / put / delete
/workspaces/workspace -> get
/workspaces/ -> post
/workspaces/:workspaceId -> get / put / delete
/backlog/:backlogId -> get
/task/:workspaceId -> post
/task/tasks -> get
/task/:taskId -> put / get
```

## Construido con 🛠️

_Las herramientas para el desarrollo de la API fueron_

- [Expressjs](https://expressjs.com/es/) - Infraestructura de aplicaciones web con Nodejs
- [Nodejs](https://nodejs.org/es/) - Entorno de ejecución de JavaScript
- [Mongo](https://www.mongodb.com/1) - Base de datos no SQL mas popular
- [Mongoose](https://mongoosejs.com/) - ODM para la base de datos

## Autores ✒️

- **Carolina Salazar** - _Full Stack Developer_ - [carosalazar28](https://github.com/carosalazar28)
