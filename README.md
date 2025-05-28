# Challenge Toolbox

Este proyecto está compuesto por dos aplicaciones:

- **Backend**: API REST creada con Node.js v14 y Express.
- **Frontend**: Aplicación web construida con Node v16 y React.

---

## 🧱 Estructura del proyecto

```bash
ChallengeToolbox/
├── backend/ # API Node.js + Express
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── test/
│ ├── utils/
│ ├── .dockerignore
│ ├── app.js
│ ├── Dockerfile
│ ├── package.json
│ └── README.md 
│
├── frontend/
│ └── challenge-app/ # React + Vite
│   ├── public/
│   ├── src/
│   ├── .dockerignore
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md 
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## 🚀 Requisitos previos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

---

## ⚙️ Instrucciones para ejecutar el proyecto

1. Clona este repositorio:

```bash
git clone https://github.com/AldiTorresDev/ChallengeToolbox.git
cd ChallengeToolbox
```

2. Crea el archivo .env en el directorio backend con la clave de la API externa:

```bash
cd backend
echo "EXTERNAL_API_KEY=CLAVE_API_EXTERNA" > .env  # Reemplaza CLAVE_API_EXTERNA con la clave de la API externa
cd ..
```

3. Levanta los contenedores (backend y frontend):

```bash
docker-compose up --build
```

4. Accede a la aplicación en tu navegador:

```bash
http://localhost:5173
```

---

## 🛠 Comandos útiles

- Detener los contenedores:

```bash
docker-compose down
```

- Reiniciar los contenedores:

```bash
docker-compose restart
```

## 📝 Notas de desarrollo

- Cada aplicación (backend y frontend) tiene su propio README.md más detallado.

- El backend escucha en el puerto 3000

- El frontend escucha en el puerto 5173

- El archivo docker-compose.yml está configurado para levantar los contenedores de backend y frontend.

## 🧪 Testing

Para ejecutar los tests del backend, tienes dos opciones:

### Opción 1: Dentro del contenedor

```bash
docker exec -it challengetoolbox-api-1 npm test
```

### Opción 2: Localmente

```bash
cd backend
npm test
```
