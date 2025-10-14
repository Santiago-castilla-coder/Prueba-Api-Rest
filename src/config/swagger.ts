import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FHL Orders API",
      version: "1.0.0",
      description: "API para gestionar órdenes de entrega - Prueba M5.2"
    },
    servers: [{ url: "http://localhost:3000" }]
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"] // puedes anotar con JSDoc en rutas/controladores
};

const spec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
};
