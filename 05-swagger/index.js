import express, { json } from "express";
const app = express();
const PORT = 3000;
import router from "./routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with { type: "json" };

app.use(json());
app.use("/", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start
app.listen(PORT, () => {
  console.log(`Todo API running at http://localhost:${PORT}`);
});
