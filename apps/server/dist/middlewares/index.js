import cors from "cors";
import express from "express";
import morgan from "morgan";
const middlewares = (app) => {
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: ["http://localhost:3000", "https://pinpad.vercel.app"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Content-Disposition"],
    }));
    app.options("*", cors());
};
export default middlewares;
//# sourceMappingURL=index.js.map