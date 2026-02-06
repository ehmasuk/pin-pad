"use client";

import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Check, Copy, Globe, Lock, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLocked: boolean;
}

export function ShareModal({ isOpen, onClose, isLocked }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            PinPad
          </DialogTitle>
          <DialogDescription>Anyone with the link can edit this note.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 border-border/40">
          <div className="flex items-center gap-2">
            {isLocked ? <Lock className="h-4 w-4 text-green-500" /> : <Globe className="h-4 w-4 text-slate-400" />}
            <span className="text-sm font-medium">Note Status</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wider ${isLocked ? "bg-green-500/10 text-green-500" : "bg-slate-500/10 text-slate-500"}`}>
            {isLocked ? "Locked" : "Public"}
          </span>
        </div>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="link">Note Link</Label>
            <div className="flex items-center gap-2">
              <Input id="link" value={shareUrl} readOnly className="flex-1 bg-muted/30" />
              <Button size="icon" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
