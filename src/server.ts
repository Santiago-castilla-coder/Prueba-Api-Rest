import dotenv from "dotenv";
dotenv.config();

import "./models"; // 👈 Importa TODOS los modelos y asociaciones
import app from "./app";
import { sequelize } from "./models";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida");

    await sequelize.sync({ force: true }); // 👈 fuerza la creación de TODAS las tablas
    console.log("🧩 Tablas sincronizadas correctamente");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
};

startServer();
