// components/explore/WeeklyBarChart.tsx
import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { formatCurrency } from "@/src/utils/format";
import { useThemeApp } from "@/src/context/ThemeContext";

const screenWidth = Dimensions.get("window").width;

type Props = {
  labels: string[];
  data: number[];
  title?: string;
};

// helper: convert hex color like "#RRGGBB" to "rgba(r,g,b,a)"
function hexToRgba(hex: string, alpha = 1) {
  try {
    const h = hex.replace("#", "");
    const bigint = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    // fallback to a blue-ish color
    return `rgba(59,130,246,${alpha})`;
  }
}

export default function WeeklyBarChart({ labels, data, title = "Pengeluaran 7 hari" }: Props) {
  const { theme, themeColors } = useThemeApp();
  const isDark = theme === "dark";

  // ensure primary color (hex) becomes rgba for chart color fn
  const primaryHex = themeColors.primary ?? "#3B82F6";

  const chartConfig = {
    backgroundGradientFrom: themeColors.card,
    backgroundGradientTo: themeColors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => hexToRgba(primaryHex, opacity),
    labelColor: () => themeColors.textMuted,
    // optional: style for bars (some versions accept propsForBackgroundLines etc.)
    propsForBackgroundLines: {
      stroke: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    },
    barPercentage: 0.6,
  } as any; // cast to any to avoid overly-strict chart-kit TypeScript mismatch

  return (
    <View style={[styles.card, { backgroundColor: themeColors.card, shadowOpacity: isDark ? 0.12 : 0.06 }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>

      <BarChart
        data={{ labels, datasets: [{ data }] }}
        width={screenWidth - 40}
        height={180}
        chartConfig={chartConfig}
        fromZero
        yAxisLabel="Rp "
        yAxisSuffix=""
        style={{ borderRadius: 12, marginTop: 8 }}
        showValuesOnTopOfBars
        // ensure types satisfied: some versions require these to exist (we've included them)
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
  },
});
