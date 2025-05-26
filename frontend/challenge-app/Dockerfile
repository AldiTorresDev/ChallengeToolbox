FROM node:16-alpine

WORKDIR /usr/src/app

# Copiar solo los archivos de dependencias
COPY package.json package-lock.json ./

# Limpiar caché de npm y eliminar node_modules si existe
RUN rm -rf node_modules && \
    npm cache clean --force && \
    npm ci

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto de desarrollo de Vite
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]

