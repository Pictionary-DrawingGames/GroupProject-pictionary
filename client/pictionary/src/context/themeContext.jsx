import { createContext, useState } from "react";
import MaleBackground from "../assets/bg-repeat.png"; // Background image
import FemaleBackground from "../assets/bg-repeat-1.png"; // Background image
import { Avatars } from "../lib/utils"; // Ensure the correct path for Avatars

export const themeContext = createContext({
  currentTheme: "",
  setCurrentTheme: () => {},
  theme: {
    male: {
      // bgImage: ``, // Set background image
      bgColor: "",
      // userAvatar: "",
    },
    female: {
      // bgImage: ``, // Set background image
      bgColor: "",
      // userAvatar: "",
    },
  },
});

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("male");

  return (
    <themeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        theme: {
          male: {
            bgImage: `url(${MaleBackground})`, // Set background image
            bgColor: "#09a3fa",
            // userAvatar: Avatars[0],
          },
          female: {
            bgImage: `url(${FemaleBackground})`, // Set background image
            bgColor: "#ff6bf9",
            // userAvatar: Avatars[1],
          },
        },
      }}
    >
      {children}
    </themeContext.Provider>
  );
}
