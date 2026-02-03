import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    documentName: string;
    content: Buffer<ArrayBufferLike>;
    updatedAt: NativeDate;
    isLocked: boolean;
    password?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    documentName: string;
    content: Buffer<ArrayBufferLike>;
    updatedAt: NativeDate;
    isLocked: boolean;
    password?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    documentName: string;
    content: Buffer<ArrayBufferLike>;
    updatedAt: NativeDate;
    isLocked: boolean;
    password?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    documentName: string;
    content: Buffer<ArrayBufferLike>;
    updatedAt: NativeDate;
    isLocked: boolean;
    password?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    documentName: string;
    content: Buffer<ArrayBufferLike>;
    updatedAt: NativeDate;
    isLocked: boolean;
    password?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    documentName: string;
    content: Buffer<ArrayBufferLike>;
    updatedAt: NativeDate;
    isLocked: boolean;
    password?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        documentName: string;
        content: Buffer<ArrayBufferLike>;
        updatedAt: NativeDate;
        isLocked: boolean;
        password?: string | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        documentName: string;
        content: Buffer<ArrayBufferLike>;
        updatedAt: NativeDate;
        isLocked: boolean;
        password?: string | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    documentName: string;
    content: mongoose.mongo.Binary;
    updatedAt: NativeDate;
    isLocked: boolean;
    password?: string | null;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    documentName: string;
    content: mongoose.mongo.Binary;
    updatedAt: NativeDate;
    isLocked: boolean;
    password?: string | null;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Document.d.ts.map