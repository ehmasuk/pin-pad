"use client";

import { motion } from "framer-motion";
import { Check, Clipboard, Link2, Lock, Share2, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "../global/Logo";

const Bento = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Live Editing Feature - Large */}
      <LiveEditingCard />

      {/* Real-time Collaboration */}
      <CollaborationCard />

      {/* Shareable Links */}
      <ShareableLinksCard />
    </div>
  );
};

// Live Editing Card with typing animation
const LiveEditingCard = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [isTyping1, setIsTyping1] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);

  const fullText1 =
    "Project kickoff meeting scheduled for next Monday at 10 AM. Main agenda: define project scope, assign team roles, and set initial milestones.";

  const fullText2 = "I'll handle the backend API design and database schema. Also, we should consider using WebSockets for real-time sync.";

  useEffect(() => {
    let index1 = 0;
    let index2 = 0;
    let startSecondTyper = false;

    const interval = setInterval(() => {
      // Start user typing first
      if (index1 <= fullText1.length) {
        setIsTyping1(true);
        setText1(fullText1.slice(0, index1));
        index1++;

        // After 20 characters, start the second typer too
        if (index1 > 20 && !startSecondTyper) {
          startSecondTyper = true;
        }
      } else {
        setIsTyping1(false);
      }

      // Anonymous starts typing after user has typed some text
      if (startSecondTyper && index2 <= fullText2.length) {
        setIsTyping2(true);
        setText2(fullText2.slice(0, index2));
        index2++;
      } else if (index2 > fullText2.length) {
        setIsTyping2(false);
      }

      // Reset when both are done
      if (index1 > fullText1.length && index2 > fullText2.length) {
        setTimeout(() => {
          index1 = 0;
          index2 = 0;
          setText1("");
          setText2("");
          startSecondTyper = false;
          setIsTyping1(false);
          setIsTyping2(false);
        }, 3000);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="md:col-span-2 border bg-purple-500/5 dark:bg-white/10 border-black/5 dark:border-white/10 lg:row-span-2 rounded-lg p-6 overflow-hidden relative group"
    >
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-4">
          <Clipboard className="size-4 text-slate-900 dark:text-slate-300" />
          <Lock className="size-4 text-slate-900 dark:text-slate-300" />
          <Share2 className="size-4 text-slate-900 dark:text-slate-300" />
        </div>
      </div>

      <div className="bg-white dark:bg-black/50 rounded-lg p-6 pt-8 min-h-[160px] lg:min-h-[calc(100%-2rem)] border border-black/10 mt-3 relative">
        {/* User's text */}
        <div className="text-sm text-slate-700 dark:text-slate-300 relative">
          {text1}
          {isTyping1 && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-0.5 h-4 bg-blue-600 dark:bg-blue-400 ml-0.5" />}
          {isTyping1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-5 left-0 px-2 py-0 bg-blue-100 dark:bg-blue-900/50 text-xs text-blue-700 dark:text-blue-300 font-medium"
            >
              You are typing...
            </motion.div>
          )}
        </div>

        {/* Anonymous user's text */}
        <div className="text-sm text-slate-700 dark:text-slate-300 mt-20 relative">
          {text2}
          {isTyping2 && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-0.5 h-4 bg-purple-600 dark:bg-purple-400 ml-0.5" />}
          {isTyping2 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-5 left-0 px-2 py-0 bg-purple-100 dark:bg-purple-900/50 text-xs text-purple-700 dark:text-purple-300 font-medium items-center gap-1.5"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              Anonymous is typing...
            </motion.div>
          )}
        </div>

        <div className="mt-6 items-center hidden md:flex absolute left-6 bottom-6 justify-end gap-2 text-xs text-black dark:text-slate-400">
          <span className="px-2 py-0.5 bg-purple-500/10 dark:bg-indigo-900/30 rounded-lg">{text1.split(" ").length + text2.split(" ").length - 2} words</span>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-slate-200/20 dark:from-slate-800/20 rounded-tl-full blur-2xl" />
    </motion.div>
  );
};

// Real-time Collaboration Card
const CollaborationCard = () => {
  const avatars = [
    { color: "bg-blue-500", delay: 0 },
    { color: "bg-pink-500", delay: 0.2 },
    { color: "bg-orange-500", delay: 0.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-lg p-6 border border-black/5 bg-orange-500/10 dark:bg-white/10 dark:border-white/10 relative overflow-hidden group"
    >
      <Users className="w-6 h-6 text-blue-500 dark:text-blue-400 mb-3" />

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Live Collaboration</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Multiple users editing simultaneously</p>

      <div className="flex items-center gap-2">
        {avatars.map((avatar, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: -20 }}
            animate={{ scale: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: avatar.delay,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className={`size-6 ${avatar.color} rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-white font-semibold text-sm shadow-lg`}
          >
            <User className="w-4"/>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="ml-2 px-3 py-0.5 bg-slate-100 dark:bg-slate-900/30 border border-black/10 dark:border-white/10 rounded-lg text-xs text-slate-900 dark:text-slate-300 font-medium"
        >
          3 typing...
        </motion.div>
      </div>

      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-orange-300/30 dark:from-orange-700/30 rounded-full blur-xl" />
    </motion.div>
  );
};

// Shareable Links Card
const ShareableLinksCard = () => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-lg p-6 border border-black/10 bg-rose-500/5 dark:bg-white/10 dark:border-white/10 overflow-hidden relative"
    >
      <Link2 className="w-6 h-6 text-rose-600 dark:text-rose-400 mb-3" />

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Shareable Links</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">One click to share</p>

      <motion.div
        animate={isCopied ? { scale: [1, 1.05, 1] } : {}}
        className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 border border-rose-200 dark:border-rose-800 text-xs font-mono text-slate-600 dark:text-slate-400"
      >
        pinpad.app/abc123
      </motion.div>

      {isCopied && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute flex gap-0.5 items-center top-4 right-4 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-lg"
        >
          <Check className="size-3" /> Copied!
        </motion.div>
      )}

      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-violet-300/30 dark:from-pink-700/30 rounded-full blur-xl" />
    </motion.div>
  );
};

export default Bento;
