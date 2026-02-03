"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { useState } from "react";

interface UnlockViewProps {
  noteName: string;
  onVerified: () => void;
}

export function UnlockView({ noteName, onVerified }: UnlockViewProps) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteName}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid password");
      }

      onVerified();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md shadow-sm ring ring-neutral-100">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Protected Note</CardTitle>
          <CardDescription>This note is password protected. Enter the PIN to view and edit.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter PIN"
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleVerify();
                }}
                autoFocus
              />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full hover:bg-transparent" onClick={handleVerify} disabled={loading || !password}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <ArrowRight className="h-4 w-4 text-primary" />}
              </Button>
            </div>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <p className="text-[10px] text-muted-foreground/50 text-center uppercase tracking-widest">Secured by Share Note</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
