import authRoutes from "./auth.js";
import noteRoutes from "./noteRoutes.js";
const routes = (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/notes", noteRoutes);
};
export default routes;
//# sourceMappingURL=index.js.map