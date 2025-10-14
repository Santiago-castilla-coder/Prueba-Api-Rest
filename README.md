# Backend API REST - FHL

API para gestionar órdenes de entrega con **Node.js, Express, TypeScript, Sequelize y PostgreSQL**.

---

## 🔧 Requisitos

- **Node.js** >= 18  
- **npm** >= 9  
- **PostgreSQL**  

---

## 📥 Instalación

1. **Instala todas las dependencias:**

   ```bash
   npm install
   ```

2. **Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:**

   ```env
   DB_NAME=fhl_db
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_HOST=localhost
   PORT=3000
   JWT_SECRET=tu_secreto
   ```

---

## 🏗️ Preparar la base de datos

1. Asegúrate de que PostgreSQL esté corriendo y crea la base de datos:

   ```sql
   CREATE DATABASE fhl_db;
   ```

2. Ejecuta el seeder para poblar datos iniciales:

   ```bash
   npm run seed
   ```

   Esto creará tablas (`users`, `customers`, `addresses`, `products`, `warehouses`, `orders`, `order_products`) y cargará datos de prueba.

---

## 🚀 Levantar el servidor

En modo desarrollo:

```bash
npm run dev
```

Servidor disponible en: [http://localhost:3000](http://localhost:3000)

Swagger (documentación API) disponible en: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🧩 Scripts disponibles

| Comando           | Descripción                               |
|-------------------|-------------------------------------------|
| `npm run dev`     | Levanta el servidor en modo desarrollo    |
| `npm run build`   | Compila TypeScript a JavaScript           |
| `npm start`       | Ejecuta la versión compilada              |
| `npm run seed`    | Población inicial de la base de datos     |

---

## 📦 Dependencias principales

```bash
npm install express cors dotenv sequelize pg jsonwebtoken bcryptjs csv-parser swagger-jsdoc swagger-ui-express
```

## 📦 DevDependencies (TypeScript y tipos)

```bash
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs @types/swagger-jsdoc @types/swagger-ui-express @types/dotenv
```

---

## 📂 Estructura del proyecto

```
src/
 ├─ config/          # Configuración de DB, Swagger, etc.
 ├─ models/          # Modelos Sequelize
 ├─ routes/          # Rutas Express
 ├─ controllers/     # Lógica de endpoints
 ├─ seeders/         # Scripts para poblar datos
 ├─ app.ts           # Configuración de Express
 └─ server.ts        # Punto de entrada del servidor
```

---

## 👨‍💻 Autor

**Nombre:** Santiago