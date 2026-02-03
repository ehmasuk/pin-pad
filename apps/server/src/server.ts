// server.ts
import { Server } from "@hocuspocus/server";
import * as Y from "yjs";
import app from "./app.js";
import DocumentModel from "./models/Document.js";

const EXPRESS_PORT = 8080;
const HOCUSPOCUS_PORT = 7070;

export function startListening() {
  const hocuspocus = new Server({
    port: HOCUSPOCUS_PORT,

    async onLoadDocument({ documentName }) {
      const doc = new Y.Doc();

      const existing = await DocumentModel.findOne({ documentName });

      if (existing && existing.content) {
        Y.applyUpdate(doc, existing.content);
        console.log("Loaded:", documentName);
      }

      return doc;
    },

    async onStoreDocument({ documentName, document }) {
      const update = Y.encodeStateAsUpdate(document);

      await DocumentModel.findOneAndUpdate(
        { documentName },
        {
          content: Buffer.from(update),
          updatedAt: new Date(),
        },
        { upsert: true },
      );

      console.log("Saved:", documentName);
    },
  });

  hocuspocus.listen();

  app.listen(EXPRESS_PORT, () => {
    console.log("Express running on http://localhost:" + EXPRESS_PORT);
    console.log("Hocuspocus running on ws://localhost:" + HOCUSPOCUS_PORT);
  });
}
