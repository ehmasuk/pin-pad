// server.ts
import app from "./app.js";

const EXPRESS_PORT = process.env.PORT || 8080;

export function startListening() {
  app.listen(EXPRESS_PORT, () => {
    console.log("Express running on http://localhost:" + EXPRESS_PORT);
  });
}
