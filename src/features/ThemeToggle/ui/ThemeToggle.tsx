import { useContext } from "react";
import { Sun, Moon } from "lucide-react";

import { ThemeContext } from "@/shared/lib/themeContext";
import { Button } from "@/shared/ui/button";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Переключить тему</span>
    </Button>
  );
};
