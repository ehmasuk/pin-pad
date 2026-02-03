import authRoutes from "./auth.js";
import documentRoutes from "./documentRoutes.js";

const routes = (app: any): void => {
  app.use("/api/auth", authRoutes);
  app.use("/api/documents", documentRoutes);
};

export default routes;
