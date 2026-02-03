import express from "express";
import morgan from "morgan";
const middlewares = (app) => {
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.urlencoded({ extended: true }));
};
export default middlewares;
//# sourceMappingURL=index.js.map