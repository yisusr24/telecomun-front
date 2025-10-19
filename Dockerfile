FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine

# tu nginx.conf personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# limpia contenido por defecto
RUN rm -rf /usr/share/nginx/html/*

# ⬅️ copia la salida REAL del build
COPY --from=build /app/dist/browser /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
