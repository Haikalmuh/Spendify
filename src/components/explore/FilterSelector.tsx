// components/explore/FilterSelector.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useThemeApp } from "@/src/context/ThemeContext";

type Props = {
  months: string[];
  labels: Record<string, string>;
  selected: string;
  onSelect: (v: string) => void;
};

export default function FilterSelector({ months, labels, selected, onSelect }: Props) {
  const { theme, themeColors } = useThemeApp();
  const isDark = theme === "dark";

  return (
    <View style={{ marginBottom: 12 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 4 }}
      >
        {months.map((m) => {
          const active = m === selected;

          return (
            <TouchableOpacity
              key={m}
              onPress={() => onSelect(m)}
              style={[
                styles.chip,
                {
                  backgroundColor: active
                    ? // soft primary background using hex alpha suffix (works for 6-char hex)
                      themeColors.primary.length === 7
                        ? themeColors.primary + "22"
                        : themeColors.primary
                    : isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
                  borderWidth: active ? 0 : 0,
                },
              ]}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: active ? themeColors.primary : themeColors.text,
                  },
                ]}
              >
                {labels[m] ?? m}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginRight: 8,
  },
  chipText: {
    fontWeight: "600",
    fontSize: 13,
  },
});
