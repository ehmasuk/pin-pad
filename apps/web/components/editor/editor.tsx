"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";

import { copySelectedTextToClipboard } from "@/utils/copy-to-clipborad";
import { Editor as TiptapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@workspace/ui/components/button";
import { Check, Clipboard, Loader2, Wifi } from "lucide-react";
import { useMemo, useState } from "react";
import * as Y from "yjs";
import Footer from "./footer";

function getRandomColor() {
  const randomNum = Math.floor(Math.random() * 16777215);
  const hexColor = randomNum.toString(16).padStart(6, "0");
  return `#${hexColor}`;
}

const colors = ["#B7BDF7", "#DDAED3", "#00F7FF", "#FFF57E", "#FFA4A4", "#FF2DD1"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

interface EditorProps {
  id: string;
  onEditorReady?: (editor: TiptapEditor) => void;
}

export default function Editor({ id, onEditorReady }: EditorProps) {
  if (!id) return null;

  const [isConnected, setIsConnected] = useState(false);

  const ydoc = useMemo(() => new Y.Doc(), []);

  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        url: process.env.NEXT_PUBLIC_SOCKET_URL!,
        name: id,
        document: ydoc,
        onStatus({ status }) {
          setIsConnected(status === "connected");
        },
      }),
    [id, ydoc],
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ undoRedo: false }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCaret.configure({
        provider,
        user: { name: "Anonymous", color: randomColor },
      }),
      CharacterCount.configure({
        limit: 100000,
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    immediatelyRender: false,
    onCreate({ editor }) {
      onEditorReady?.(editor);
    },
  });

  const [copied, setCopied] = useState(false);

  const handleCopySelectedText = () => {
    copySelectedTextToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 max-w-md text-center px-6">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <Wifi className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/60" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Connecting to Server...</h3>
            <p className="text-sm text-muted-foreground">We're hosted on a free server, so it might take a moment to wake up only for the first time. We appreciate your patience! 🙂</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Establishing secure connection...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[70vh] w-full bg-card border border-border/50 rounded-lg shadow-2xl shadow-foreground/5 overflow-hidden transition-all duration-500 hover:border-border group">
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} className="w-full" />
      </div>
      <Footer editor={editor} />

      {editor && (
        <BubbleMenu key="bubble" editor={editor} options={{ offset: 10, flip: true }}>
          <Button variant="outline" size="sm" className="text-xs" onClick={handleCopySelectedText}>
            {copied ? <Check className="text-green-500" /> : <Clipboard />}Copy
          </Button>
        </BubbleMenu>
      )}
    </div>
  );
}
