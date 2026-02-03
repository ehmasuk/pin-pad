import jwt from "jsonwebtoken";
import env from "../config/env.js";
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=tokenHandlers.js.map