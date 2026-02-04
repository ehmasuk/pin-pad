import mongoose, { type HydratedDocument } from "mongoose";
export interface INote {
    noteName: string;
    content: Buffer;
    password?: string | null;
    isLocked: boolean;
    updatedAt: Date;
    createdAt: Date;
}
export type NoteDocument = HydratedDocument<INote>;
export declare const Note: mongoose.Model<INote, {}, {}, {}, mongoose.Document<unknown, {}, INote, {}, mongoose.DefaultSchemaOptions> & INote & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, INote>;
//# sourceMappingURL=Note.d.ts.map