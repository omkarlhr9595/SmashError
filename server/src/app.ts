import express from "express";
import cors from "cors";
import routes from "./routes/v1/";
import { errorConverter, errorHandler } from "./middlewares/error";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorConverter);

app.use(errorHandler);

export default app;
