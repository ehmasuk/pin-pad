// src/index.ts
import { default as default2 } from "mongoose";

// src/client.ts
import mongoose from "mongoose";
var connectDb = async (url, dbName) => {
  const connection = await mongoose.connect(url, {
    dbName
  });
  return connection;
};

// src/models/Note.ts
import mongoose2, { Schema } from "mongoose";
var NoteSchema = new Schema(
  {
    noteName: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    content: {
      type: Buffer,
      required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    password: {
      type: String,
      required: false
    },
    isLocked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
NoteSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3 });
var Note = mongoose2.models.Note || mongoose2.model("Note", NoteSchema);
export {
  Note,
  connectDb,
  default2 as mongoose
};
