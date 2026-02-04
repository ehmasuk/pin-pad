"use client";

import React from "react";

import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import Bento from "./Bento";
import Navbar from "./navbar";

export default function HeroSection() {
  const router = useRouter();

  const createInstantNote = () => {
    const randomId = Math.random().toString(36).substring(2, 12);
    router.push(`/${randomId}`);
  };

  return (
    <>
      <main className="bg-white dark:bg-slate-950 overflow-hidden">
        <section>
          <div className="relative py-20">
            <div className="mx-auto max-w-5xl px-6">
              <Navbar />

              <div>
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-bold lg:text-6xl text-slate-900 dark:text-white">Write quick notes, secure and shareable</h1>
                <p className="my-6 max-w-3xl text-balance text-2xl text-slate-800 dark:text-slate-300">Write, save, and share notes in seconds, no signup required.</p>

                <div className="flex flex-col gap-8 *:w-full sm:flex-row sm:*:w-fit">
                  <Button size="lg" variant="default" className="h-14 text-md" onClick={createInstantNote}>
                    Create Note Instantly
                  </Button>

                  <CustomLinkInput />
                </div>
              </div>

              <div className="relative -mr-56 mt-16 sm:mr-0">
                <Bento />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const CustomLinkInput = () => {
  const router = useRouter();
  const [customId, setCustomId] = useState("");

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
    <form onSubmit={createCustomNote} className="relative group">
      <InputGroup className="border-2 border-slate-900 dark:border-slate-300 focus:shadow-none min-w-80 bg-white dark:bg-slate-900">
        <InputGroupInput
          type="text"
          placeholder="Enter custom url e.g. note123"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          className="text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400"
        />
        <InputGroupAddon align="inline-end">
          <Button type="submit" size="icon" variant="ghost" className="hover:!bg-transparent" disabled={!customId.trim()}>
            <ArrowRight className="w-5 text-slate-900 dark:text-white" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">URI: https://pinpad.vercel.app/{customId || "note123"}</p>
    </form>
  );
};
