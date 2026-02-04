import { Github } from "lucide-react";
import { IconButton } from "../global/icon-button";
import Logo from "../global/Logo";
import ThemeChanger from "../global/theme-changer";

function Navbar() {
  return (
    <div className="flex items-end gap-4 justify-between">
      <Logo size="md" />
      <div className="flex gap-4 items-center">
        <ThemeChanger />
        <a href="https://github.com/ehmasuk/pin-pad" target="_blank" rel="noreferrer">
          <IconButton icon={<Github />} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
