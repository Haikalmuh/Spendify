// app/(tabs)/settings.tsx
import React from "react";
import { View, Text, Switch } from "react-native";
import { useThemeApp } from "@/src/context/ThemeContext";

export default function SettingsScreen() {
  const { theme, themeColors, toggleTheme } = useThemeApp();

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: themeColors.background,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: themeColors.text,
          marginBottom: 25,
        }}
      >
        Settings
      </Text>

      {/* Dark Mode Toggle */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: themeColors.card,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: themeColors.border,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: themeColors.text }}>
          Dark Mode
        </Text>

        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
        />
      </View>
    </View>
  );
}
