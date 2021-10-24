import React from "react";
import Icon from "./Icon";
import { DB_KEYS } from "../constants";
import useLocalStorage from "../utils/useLocalStorage";
import { Button } from "react-bootstrap";

function DarkModeToggle() {
  const [theme, setTheme] = useLocalStorage(DB_KEYS.DARK_MODE, "light");
  document.documentElement.setAttribute("data-theme", theme);
  const toogleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  };
  return (
    <Button
      variant={theme}
      onClick={() => {
        toogleTheme();
      }}
      className="rounded-circle p-0"
      style={{ width: "36px", height: "36px" }}
    >
      {theme === "light" ? (
        <Icon name="moon" size="28px" />
      ) : (
        <Icon name="sun" color="#fff" size="28px" />
      )}
    </Button>
  );
}

export default DarkModeToggle;
