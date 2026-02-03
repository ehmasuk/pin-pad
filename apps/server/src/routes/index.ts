import authRoutes from "./auth.js";
import noteRoutes from "./noteRoutes.js";

const routes = (app: any): void => {
  app.use("/api/auth", authRoutes);
  app.use("/api/notes", noteRoutes);
};

export default routes;
