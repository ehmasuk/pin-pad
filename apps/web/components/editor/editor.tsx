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
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import * as Y from "yjs";
import Footer from "./footer";

function getRandomColor() {
  const randomNum = Math.floor(Math.random() * 16777215);
  const hexColor = randomNum.toString(16).padStart(6, "0");
  return `#${hexColor}`;
}

interface EditorProps {
  id: string;
  onEditorReady?: (editor: TiptapEditor) => void;
}

export default function Editor({ id, onEditorReady }: EditorProps) {
  if (!id) return null;

  const ydoc = new Y.Doc();

  const provider = new HocuspocusProvider({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:7070",
    name: id,
    document: ydoc,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ undoRedo: false }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCaret.configure({
        provider,
        user: { name: "Anonymous", color: getRandomColor() },
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
