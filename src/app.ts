import express from "express";
import cors from "cors";
import { initModels } from "./models";
import { setupSwagger } from "./config/swagger";

// Routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import warehouseRoutes from "./routes/warehouse.routes";
import orderRoutes from "./routes/order.routes";

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 📚 Swagger documentation
setupSwagger(app);

// 🚀 API Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/warehouses", warehouseRoutes);
app.use("/orders", orderRoutes);

// ✅ Health check
app.get("/", (_req, res) => {
  res.send("✅ API running correctly");
});

// 🧩 Initialize database models & relations
(async () => {
  try {
    await initModels();
    console.log("✅ Models initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing models:", error);
  }
})();

export default app;
