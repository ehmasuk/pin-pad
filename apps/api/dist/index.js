import connectDb from "./db/conect-db.js";
import { startListening } from "./server.js";
connectDb()
    .then(() => {
    console.log("Database connected");
    startListening();
})
    .catch((err) => {
    console.error("Error connecting database: ", err.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map