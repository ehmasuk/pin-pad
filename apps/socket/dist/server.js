// server.ts
import { Server } from "@hocuspocus/server";
import * as Y from "yjs";
import Note from "./models/Note.js";
const PORT = process.env.PORT || 7070;
export function startListening() {
    const hocuspocus = new Server({
        port: Number(PORT),
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
    hocuspocus.listen().then(() => {
        console.log("Hocuspocus running on port:" + PORT);
    });
}
//# sourceMappingURL=server.js.map