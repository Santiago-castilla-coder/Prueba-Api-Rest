import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FHL Orders API",
      version: "1.0.0",
      description: "REST API to manage delivery orders - M5.2 Project",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            username: { type: "string", example: "admin" },
            name: { type: "string", example: "Administrator" },
            email: { type: "string", example: "admin@example.com" },
            role: { type: "string", example: "admin" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Laptop" },
            price: { type: "number", example: 1200.5 },
            stock: { type: "integer", example: 10 },
          },
        },
        Warehouse: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Central Warehouse" },
            location: { type: "string", example: "Bogotá" },
          },
        },
        Address: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            street: { type: "string", example: "Main St 123" },
            city: { type: "string", example: "Springfield" },
          },
        },
        Customer: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            document_id: { type: "string", example: "123456789" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            addresses: {
              type: "array",
              items: { $ref: "#/components/schemas/Address" },
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            customer_id: { type: "integer", example: 1 },
            warehouse_id: { type: "integer", example: 1 },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product_id: { type: "integer", example: 2 },
                  quantity: { type: "integer", example: 3 },
                },
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

const spec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
}
