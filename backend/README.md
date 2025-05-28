# API de Challenge Toolbox

API REST para obtener y procesar datos de archivos CSV desde un servicio externo.

## Endpoints

### GET /files/data

Obtiene y transforma los datos de los archivos CSV disponibles.

#### Query Parameters

- `fileName` (opcional): Filtra los resultados por nombre de archivo

#### Respuesta Exitosa (200 OK)

```json
[
  {
    "file": "nombre_archivo.csv",
    "lines": [
      {
        "text": "contenido de la línea",
        "number": 123,
        "hex": "0123456789abcdef0123456789abcdef"
      }
    ]
  },
  // ...
]
```

#### Posibles Errores

- `404 Not Found`:
  - Cuando no se encuentran archivos disponibles
  - Cuando el archivo solicitado no existe
  - Cuando no hay archivos con datos válidos
- `500 Internal Server Error`: Error interno del servidor

### GET /files/list

Obtiene la lista de archivos disponibles.

#### Respuesta Exitosa (200 OK)

```json
{
  "files": [
    "archivo1.csv",
    "archivo2.csv"
  ]
}
```

#### Posibles Errores

- `404 Not Found`: Cuando no se encuentran archivos disponibles
- `500 Internal Server Error`: Error interno del servidor

## Validaciones

Los datos de los archivos CSV son validados según las siguientes reglas:

1. Estructura de columnas requerida:
   - file
   - text
   - number
   - hex

2. Validaciones por campo:
   - `text`: Debe ser una cadena de texto no vacía
   - `number`: Debe ser un número válido
   - `hex`: Debe ser un hexadecimal de 32 dígitos

## Desarrollo

### Scripts Disponibles

- `npm start`: Inicia el servidor en modo desarrollo
- `npm test`: Ejecuta las pruebas
- `npm run dev`: Inicia el servidor con nodemon para desarrollo

### Pruebas

Las pruebas están escritas usando Chai y Mocha. Para ejecutarlas:

```bash
npm test
```

## Docker

Para ejecutar la API usando Docker:

```bash
docker-compose up api
```

El servicio estará disponible en `http://localhost:3000`
