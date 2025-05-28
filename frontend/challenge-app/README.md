# Frontend Challenge Toolbox

Aplicación web construida con Node v16 y React que permite visualizar y filtrar archivos de datos. La aplicación se conecta a un backend que proporciona información sobre archivos y sus contenidos.

## Tecnologías Utilizadas

- **Frontend Framework**: React 16
- **Gestión de Estado**: Redux Toolkit
- **UI Framework**: React Bootstrap 5
- **Desarrollo**: Vite
- **Lenguaje**: JavaScript (ES6+)

## Estructura de la Aplicación

### Componentes

La aplicación está organizada en componentes reutilizables y modulares:

- `App.jsx`: Componente raíz que estructura la aplicación
- `Header.jsx`: Barra de navegación superior
- `Content.jsx`: Contenedor principal que organiza los componentes de filtrado y tabla
- `FilesFilter.jsx`: Componente para filtrar archivos por nombre
- `FilesTable.jsx`: Tabla que muestra los datos de los archivos

### Gestión de Estado (Redux)

La aplicación utiliza Redux Toolkit para la gestión del estado global, organizado en dos slices principales:

#### fileNamesSlice

- Gestiona la lista de nombres de archivos disponibles
- Estados:
  - `fileNamesList`: Lista de nombres de archivos
  - `fileNamesLoading`: Estado de carga
  - `fileNamesError`: Manejo de errores
- Acciones asíncronas:
  - `fetchFileNames`: Obtiene la lista de archivos disponibles

#### filesSlice

- Gestiona los datos de los archivos
- Estados:
  - `filesList`: Lista de datos de archivos
  - `filesLoading`: Estado de carga
  - `filesError`: Manejo de errores
- Acciones asíncronas:
  - `fetchFiles`: Obtiene los datos de los archivos (con filtrado opcional)

### Características Principales

- Visualización de datos en tabla
- Filtrado de archivos por nombre
- Manejo de estados de carga
- Gestión de errores
- Diseño responsivo
- Interfaz de usuario intuitiva

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
``` 

## Construir

```bash
npm run build
```

## Estructura de Directorio Principal

```bash
src/
├── components/         # Componentes React
├── store/              # Configuración de Redux y slices
├── hooks/              # Hooks personalizados
└── main.jsx            # Punto de entrada de la aplicación
```

## API

La aplicación se conecta a un backend local en `http://localhost:3000` con los siguientes endpoints:

- `GET /files/list`: Obtiene la lista de archivos disponibles
- `GET /files/data`: Obtiene los datos de los archivos
  - Parámetro opcional: `fileName` para filtrar por archivo específico
