import mongoose, { HydratedDocument } from 'mongoose';
export { default as mongoose } from 'mongoose';

declare const connectDb: (url: string, dbName: string) => Promise<typeof mongoose>;
declare const getDbState: () => mongoose.ConnectionStates;

interface INote {
    noteName: string;
    content: Buffer;
    password?: string | null;
    isLocked: boolean;
    updatedAt: Date;
    createdAt: Date;
}
type NoteDocument = HydratedDocument<INote>;
declare const Note: mongoose.Model<INote, {}, {}, {}, mongoose.Document<unknown, {}, INote, {}, mongoose.DefaultSchemaOptions> & INote & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, INote>;

export { type INote, Note, type NoteDocument, connectDb, getDbState };
