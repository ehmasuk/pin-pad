"use client";

import { Editor as TiptapEditor } from "@tiptap/react";
import { Check, Clipboard, Edit2, Globe, Lock, LockKeyhole, Moon, Share2, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconButton } from "../global/icon-button";
import { PasswordModal } from "./password-modal";
import { RenameModal } from "./rename-modal";
import { ShareModal } from "./share-modal";

interface NavbarProps {
  noteName: string;
  isLocked: boolean;
  onStatusChange: (isLocked: boolean) => void;
  editor: TiptapEditor | null;
}

function Navbar({ noteName, isLocked, onStatusChange, editor }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    if (editor) {
      const text = editor.getText();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex justify-between items-center p-3">
      <div className="flex items-center gap-2">
        <p className="font-medium text-lg text-slate-600 dark:text-slate-400 tracking-tighter">PinPad</p>
        {isLocked ? <LockKeyhole className="w-4 dark:text-slate-400  text-gray-400" /> : <Globe className="w-4 dark:text-slate-400  text-gray-400" />}
      </div>
      <div className="flex items-center gap-2">
        {/* theme toggler */}
        <IconButton icon={mounted && theme === "dark" ? <Sun /> : <Moon />} tooltip="Change Theme" kbd="Ctrl+L" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}></IconButton>

        {/* lock/unlock button */}
        <IconButton icon={isLocked ? <Lock className="text-primary" /> : <Lock />} tooltip={isLocked ? "Secure with PIN" : "Protect with PIN"} onClick={() => setIsModalOpen(true)}></IconButton>

        {/* share button */}
        <IconButton icon={<Share2 />} tooltip="Share" onClick={() => setIsShareModalOpen(true)}></IconButton>

        {/* copy button */}
        <IconButton icon={copied ? <Check className="text-green-500" /> : <Clipboard />} tooltip="Copy note" onClick={handleCopy}></IconButton>

        {/* edit note url button */}
        <IconButton icon={<Edit2 />} tooltip="Edit note url" onClick={() => setIsRenameModalOpen(true)}></IconButton>
      </div>

      <PasswordModal noteName={noteName} isLocked={isLocked} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onStatusChange={onStatusChange} />

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} isLocked={isLocked} />

      <RenameModal noteName={noteName} isOpen={isRenameModalOpen} onClose={() => setIsRenameModalOpen(false)} />
    </div>
  );
}

export default Navbar;
