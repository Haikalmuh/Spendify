// components/explore/TopCategories.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@/src/utils/format";
import { useThemeApp } from "@/src/context/ThemeContext"; // <--- pakai useThemeApp

type Item = { name: string; amount: number; percent: number };

type Props = {
  items: Item[];
};

export default function TopCategories({ items }: Props) {
  const { theme, themeColors } = useThemeApp();
  const isDark = theme === "dark";

  const colors = {
    bg: themeColors.card,
    text: themeColors.text,
    textMuted: themeColors.textMuted ?? (isDark ? "#94a3b8" : "#64748b"),
    border: themeColors.border,
    shadow: isDark ? "transparent" : "#000",
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={[styles.title, { color: colors.text }]}>Top Categories</Text>

      <View
        style={[
          styles.list,
          {
            backgroundColor: colors.bg,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}
      >
        {items.map((it, idx) => (
          <View
            key={it.name}
            style={[styles.row, { borderBottomColor: colors.border }]}
          >
            <View>
              <Text style={{ fontWeight: "700", color: colors.text }}>
                {idx + 1}. {it.name}
              </Text>

              <Text style={{ color: colors.textMuted, marginTop: 4 }}>
                {formatCurrency(it.amount)}
              </Text>
            </View>

            <Text style={{ color: colors.textMuted, fontWeight: "700" }}>
              {Math.round(it.percent)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: "700", marginBottom: 8, fontSize: 16 },
  list: {
    borderRadius: 14,
    padding: 12,
    shadowOpacity: 0.04,
    elevation: 1,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
