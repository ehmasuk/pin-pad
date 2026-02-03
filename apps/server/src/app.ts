import express, { type Express } from "express";
import {
  catchGlobalErrors,
  notFound,
} from "./middlewares/globalErrorHandlers.js";
import middlewares from "./middlewares/index.js";
import routes from "./routes/index.js";
import cors from "cors";
const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://pinpad.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
  })
);


app.options("*", cors());

// load all middlewares
middlewares(app);

// load all routes
routes(app);

// catch not found routes and throw error
app.use(notFound);

// identify and throw global errors
app.use(catchGlobalErrors);

export default app;
