import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database"; // tu database.ts

// Swagger
import { setupSwagger } from "./config/swagger";

// Rutas
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import warehouseRoutes from "./routes/warehouse.routes";
import orderRoutes from "./routes/order.routes";

// Modelos
import "./models/user.model";
import "./models/customer.model";
import "./models/address.model";
import "./models/product.model";
import "./models/warehouse.model";
import "./models/order.model";
import "./models/orderProduct.model";


dotenv.config();

const app: Express = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta base de prueba
app.get("/", (_req, res) => {
  res.send("🚀 API FHL funcionando correctamente");
});

// Registrar rutas
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/warehouses", warehouseRoutes);
app.use("/orders", orderRoutes);

// Configurar Swagger en /docs
setupSwagger(app);

// Sincronizar tablas de la base de datos
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Tablas sincronizadas correctamente"))
  .catch((err: any) => console.error("❌ Error sincronizando tablas:", err));

// Middleware de manejo de errores
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: "Algo salió mal" });
});

export default app;
