import { ThemeContext } from "@/context/user-context";
import { Slot } from "expo-router";
import { useState } from "react";
import "../../global.css";

export default function RootLayout() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Slot />
    </ThemeContext.Provider>
  );
}
