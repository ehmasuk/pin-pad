import healthRoutes from "./healthRoutes.js";
import noteRoutes from "./noteRoutes.js";

const routes = (app: any): void => {
  app.use("/api/health", healthRoutes);
  app.use("/api/notes", noteRoutes);
};

export default routes;
