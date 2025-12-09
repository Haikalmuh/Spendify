// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "@/src/theme/colors";

type ThemeType = "light" | "dark";

type ThemeContextProps = {
  theme: ThemeType;
  themeColors: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  themeColors: lightTheme,
  toggleTheme: () => {},
});

const STORAGE_KEY = "APP_THEME";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") {
          setTheme(saved);
        } else {
          // optionally detect system preference here
          setTheme("light");
        }
      } catch (error) {
        console.warn("Gagal load theme:", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme: ThemeType = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn("Gagal menyimpan theme:", error);
    }
  };

  const themeColors = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeApp = () => useContext(ThemeContext);
