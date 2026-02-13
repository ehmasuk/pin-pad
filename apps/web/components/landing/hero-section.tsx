"use client";

import React from "react";

import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import Navbar from "@/components/landing/navbar";
import { Bento } from "@/components/landing/bento";

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
          <div className="relative md:py-20 py-16">
            <div className="mx-auto max-w-5xl px-6">
              <Navbar />

              <div>
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-bold lg:text-6xl text-slate-900 dark:text-white">Write quick notes, secure and shareable</h1>
                <p className="my-6 max-w-3xl text-balance md:text-2xl text-lg text-slate-800 dark:text-slate-300">Write, save, and share notes in seconds, no signup required.</p>

                <div className="flex flex-col md:gap-8 gap-4 *:w-full sm:flex-row sm:*:w-fit">
                  <Button size="lg" variant="default" className="text-md h-12" onClick={createInstantNote}>
                    Create instant note
                  </Button>

                  <CustomLinkInput />
                </div>
              </div>

              <div className="mt-16">
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
      <InputGroup className="border-3 border-slate-900 h-12 dark:border-slate-300  md:min-w-90 bg-white dark:bg-slate-900">
        <InputGroupInput
          minLength={10}
          type="text"
          placeholder="Start with a custom url e.g. note123456"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          className="text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400"
        />
        <InputGroupAddon align="inline-end">
          <Button type="submit" size="icon" variant="default" className="" disabled={customId.trim().length > 10 ? false : true}>
            <ArrowRight className="w-5 text-white-900 dark:text-black" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {customId && (
        <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-2 text-sm text-slate-900 dark:text-slate-400">
          URI: <span className="text-blue-600">https://pinpad.vercel.app/{customId}</span>
        </motion.p>
      )}
    </form>
  );
};
