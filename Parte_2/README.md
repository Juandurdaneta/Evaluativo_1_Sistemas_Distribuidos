
# Parte 2 del evaluativo

## Enunciado

Cree una API compuesta de dos conjuntos de servicios: un servicio de autenticación, y un par de servicios de API. 

El servicio de autenticación debe exponer funcionalidad para registrar e ingresar como usuario, devolviendo algo que demuestre la identidad del usuario (Un JWT, una cookie, es decision de usted). Este algo luego es usado para poder acceder al servicio de API. 

Esta API expondrá objetos de un tipo de entidad de su preferencia, permitiendo realizar operaciones CRUD sobre las instancias de esa entidad, si y solo si el usuario está autenticado. 

La API en sí está compuesta de dos servicios separados: uno que recibe la petición y se la hace llegar a un segundo servicio. El primer servicio es un proxy, actuando de cara a la peticiones, y debe ser capaz de comprimir su respuesta si la petición HTTP que recibe asi lo desea, este servicio hace llegar las peticiones que lleguen al segundo servicio. El segundo servicio recibe las peticiones en sí y realiza las operaciones sobre la base de datos de la entidad, segun la petición del usuario.



## Forma de utilizar la API

Ejecutar los siguientes comando dentro de cada una de las carpetas api_backend_service, api_frontend_service y auth_system

```bash
  npm install
  node app.js
```

## Referencia de la API

Las peticiones deben ser realizadas a traves del api_frontend_service que es el servicio que actua de cara a las peticiones.

### Registrar un usuario nuevo

```http
  POST /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Requerido**. El nombre de usuario a registrar |
| `password` | `string` | **Requerido**. La contraseña de usuario a registrar |

### Iniciar Sesion

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Requerido**. El nombre de usuario a logear |
| `password` | `string` | **Requerido**. La contraseña de usuario a logear |

Esto retornara un json web token el cual sera utilizado para verificar la identidad del usuario al hacer una peticion.

## Obtener todas las peliculas en la base de datos

```http
  GET /movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization` | `string` | **Requerido**. El token de autenticacion de JWT |

## Obtener una pelicula en especifico

```http
  GET /movies/${movieId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization` | `string` | **Requerido**. El token de autenticacion de JWT |
| `movieId` | `integer` | **Requerido**. El id de la pelicula que se desea consultar |

## Agregar una pelicula a la base de datos

```http
  POST /movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization` | `string` | **Requerido**. El token de autenticacion de JWT |
| `title` | `string` | **Requerido**. El titulo de la pelicula |
| `overview` | `string` | Descripcion de la pelicula |
| `genre` | `string` | Genero de la pelicula |
| `poster_url` | `string` | Poster de la pelicula |

## Actualizar una pelicula

```http
  PUT /movies/${movieId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization` | `string` | **Requerido**. El token de autenticacion de JWT |
| `movieId` | `string` | **Requerido**. El id de la pelicula a modificar |

## Eliminar una pelicula

```http
  DELETE /movies/${movieId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization` | `string` | **Requerido**. El token de autenticacion de JWT |
| `movieId` | `string` | **Requerido**. El id de la pelicula a eliminar |

## EN LA CARPETA SCREENSHOTS SE PROVEEN IMAGENES DE EJEMPLO DE COMO UTILIZAR LA API USANDO POSTMAN
