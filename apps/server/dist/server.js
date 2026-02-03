// server.ts
import { Server } from "@hocuspocus/server";
import * as Y from "yjs";
import app from "./app.js";
import Note from "./models/Note.js";
import cors from "cors";
const EXPRESS_PORT = 8080;
const HOCUSPOCUS_PORT = 7070;
app.use(cors({
    origin: ["http://localhost:3000", "https://pinpad.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
}));
app.options("*", cors());
export function startListening() {
    const hocuspocus = new Server({
        port: HOCUSPOCUS_PORT,
        async onLoadDocument({ documentName: noteName }) {
            const doc = new Y.Doc();
            const existing = await Note.findOne({ noteName });
            if (existing && existing.content) {
                Y.applyUpdate(doc, existing.content);
                console.log("Loaded:", noteName);
            }
            return doc;
        },
        async onStoreDocument({ documentName: noteName, document }) {
            const update = Y.encodeStateAsUpdate(document);
            await Note.findOneAndUpdate({ noteName }, {
                content: Buffer.from(update),
                updatedAt: new Date(),
            }, { upsert: true });
            console.log("Saved:", noteName);
        },
    });
    hocuspocus.listen();
    app.listen(EXPRESS_PORT, () => {
        console.log("Express running on http://localhost:" + EXPRESS_PORT);
        console.log("Hocuspocus running on ws://localhost:" + HOCUSPOCUS_PORT);
    });
}
//# sourceMappingURL=server.js.map