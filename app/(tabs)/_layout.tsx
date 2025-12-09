import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeApp } from "@/src/context/ThemeContext";

export default function TabsLayout() {
  const { themeColors, theme } = useThemeApp();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 110,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: themeColors.card,
          borderTopWidth: 1,
          borderTopColor: theme === "light" 
            ? "rgba(0,0,0,0.08)" 
            : "rgba(255,255,255,0.12)",

          // Shadow iOS
          shadowColor: theme === "light" ? "#000" : "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: theme === "light" ? 0.15 : 0.35,
          shadowRadius: 8,

          // Shadow Android
          elevation: theme === "light" ? 4 : 10,
        },

        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.textMuted,

        tabBarIconStyle: {
          marginTop: Platform.OS === "ios" ? 2 : 0,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />

      {/* EXPLORE */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "analytics" : "analytics-outline"}
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />

      {/* SETTINGS */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
