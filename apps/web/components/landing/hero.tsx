"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Hero() {
  const router = useRouter();
  const [customId, setCustomId] = useState("");

  const createInstantNote = () => {
    const randomId = Math.random().toString(36).substring(2, 12); // Longer random ID
    router.push(`/${randomId}`);
  };

  const createCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (customId.trim()) {
      let finalId = customId.trim();
      if (finalId.length < 8) {
        const randomSuffix = Math.random().toString(36).substring(2, 9);
        finalId = `${finalId}${randomSuffix}`;
      }
      router.push(`/${finalId}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5" onClick={createInstantNote}>
        Create Note Instantly
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <form onSubmit={createCustomNote} className="relative flex-1 group">
        <Input
          placeholder="custom-url-name"
          className="h-14 pl-4 pr-16 text-lg rounded-xl border-2 border-border/50 focus:border-primary transition-all bg-card/50 backdrop-blur-sm"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
        />
        <Button type="submit" size="sm" className="absolute right-2 top-2 h-10 w-12 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity" disabled={!customId.trim()}>
          Go
        </Button>
      </form>
    </div>
  );
}
