"use client";

import EditorComponent from "@/components/editor/editor";
import Navbar from "@/components/editor/navbar";
import { UnlockView } from "@/components/editor/unlock-view";
import { Editor as TiptapEditor } from "@tiptap/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ editorId: string }> }) {
  const { editorId } = use(params);
  const [isLocked, setIsLocked] = useState<boolean | null>(null);
  const [verified, setVerified] = useState(false);
  const [editor, setEditor] = useState<TiptapEditor | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (editorId.length < 8) {
      const randomSuffix = Math.random().toString(36).substring(2, 9);
      router.replace(`/${editorId}${randomSuffix}`);
    }
  }, [editorId, router]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/documents/${editorId}/status`);
        const { data } = await res.json();
        setIsLocked(data.isLocked);
      } catch (err) {
        console.error("Failed to check document status", err);
        setIsLocked(false);
      }
    };

    checkStatus();
  }, [editorId]);

  if (isLocked === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/20" />
      </div>
    );
  }

  if (isLocked && !verified) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-0 flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center">
          <UnlockView documentName={editorId} onVerified={() => setVerified(true)} />
        </main>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-0 flex flex-col min-h-screen">
      <Navbar documentName={editorId} isLocked={isLocked} onStatusChange={setIsLocked} editor={editor} />
      <main className="flex-1 flex flex-col">
        <EditorComponent id={editorId} onEditorReady={setEditor} />
      </main>
    </div>
  );
}
