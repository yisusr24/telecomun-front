# Xtrim Frontend — Angular App

Frontend desarrollado en **Angular** como parte del reto *Fullstack*.  
Permite visualizar la información de **suscripciones, consumo y facturación simulada** del backend Flask.  
Incluye componentes modulares, integración con API REST y soporte completo para ejecución con **Docker Compose**.

---

**Prerrequisitos**

- Node.js **18+**
- **Angular CLI** instalado globalmente (`npm install -g @angular/cli`)
- **Docker** y **Docker Compose** instalados
- Backend **Xtrim Backend** corriendo en `http://localhost:5000`

---

**Instalación local**
> - npm install  
> - ng serve

La aplicación quedará disponible en:  
> http://localhost:4200  

Si el backend está levantado correctamente, la app podrá consumir los datos desde el endpoint `/api/v1`.

---

**Ejecución con Docker**

El proyecto puede ejecutarse en contenedor Docker de forma conjunta con el backend y la base de datos.

Estructura requerida:

```
telecomun-backend/
├──
telecomun-front/
├──
db/
├──
docker-compose.yml
```


Abrir una terminal en la ruta donde están las carpetas y el `docker-compose.yml`, luego ejecutar:
> docker compose up -d --build
Este levantara los 3 contenedores >back >front >bd 

La aplicación quedará disponible en:  
> http://localhost:8080/
