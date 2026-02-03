import { type Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

function Footer({ editor }: { editor: Editor | null }) {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      setUpdate((s) => s + 1);
    };

    editor.on("update", handleUpdate);
    editor.on("transaction", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
      editor.off("transaction", handleUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  // Access characterCount from storage with any cast to avoid lint errors on dynamic storage
  const storage = editor.storage as any;
  const characters = storage.characterCount?.characters() || 0;
  const words = storage.characterCount?.words() || 0;

  return (
    <div className="flex justify-end items-center gap-6 py-4 px-6 border-t border-border/40 bg-muted/5 text-xs font-medium text-muted-foreground/50 transition-all duration-300">
      <div className="flex items-center gap-1.5 hover:text-foreground/80 cursor-default">
        <span className="tabular-nums text-foreground/80">{words}</span>
        <span className="uppercase tracking-widest text-[10px]">Words</span>
      </div>
      <div className="h-3 w-[1px] bg-border/40" />
      <div className="flex items-center gap-1.5 hover:text-foreground/80 cursor-default">
        <span className="tabular-nums text-foreground/80">{characters}</span>
        <span className="uppercase tracking-widest text-[10px]">Characters</span>
      </div>
    </div>
  );
}

export default Footer;
