"use client";

import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { AlertCircle, Edit2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RenameModalProps {
  noteName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function RenameModal({ noteName, isOpen, onClose }: RenameModalProps) {
  const router = useRouter();
  const [newName, setNewName] = useState(noteName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRename = async () => {
    if (newName === noteName) {
      onClose();
      return;
    }

    if (newName.length < 8) {
      setError("Note name must be at least 8 characters long");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteName}/rename`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to rename note");
      }

      // Success
      router.push(`/${newName}`);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentUrlPrefix = typeof window !== "undefined" ? `${window.location.origin}/` : "/";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit2 className="h-5 w-5" />
            Rename Note
          </DialogTitle>
          <DialogDescription>Change the URL of this note. The old URL will no longer be accessible.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="newName">New Note Name</Label>
            <div className="flex items-center gap-1 p-2 rounded-md border bg-muted/20 border-border">
              <span className="text-xs text-muted-foreground whitespace-nowrap">{currentUrlPrefix}</span>
              <Input
                id="newName"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value.replace(/\s+/g, "-").toLowerCase());
                  setError(null);
                }}
                className="h-8 border-none focus-visible:ring-0 px-1 bg-transparent"
                placeholder="new-note-name"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">Spaces will be replaced with hyphens.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleRename} disabled={loading || newName.length < 8}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
