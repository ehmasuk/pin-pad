"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconButton } from "./icon-button";

function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <IconButton icon={mounted && theme === "dark" ? <Sun /> : <Moon />} tooltip="Change Theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}></IconButton>;
}

export default ThemeChanger;
