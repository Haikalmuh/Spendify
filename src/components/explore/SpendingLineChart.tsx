// components/explore/SpendingLineChart.tsx
import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { formatCurrency } from "@/src/utils/format";
import { useThemeApp } from "@/src/context/ThemeContext";

const screenWidth = Dimensions.get("window").width;

type Props = {
  labels: string[];
  data: number[];
  title?: string;
};

export default function SpendingLineChart({ labels, data, title = "Monthly Trend" }: Props) {
  const { theme, themeColors } = useThemeApp();
  const isDark = theme === "dark";

  const chartConfig = {
    backgroundGradientFrom: themeColors.card,
    backgroundGradientTo: themeColors.card,
    decimalPlaces: 0,
    color: (opacity = 1) =>
      isDark
        ? `rgba(129, 140, 248, ${opacity})` // soft purple (dark mode)
        : `rgba(99, 102, 241, ${opacity})`, // normal purple (light mode)

    labelColor: () => themeColors.textMuted,
    propsForDots: {
      r: "3",
      strokeWidth: "2",
      stroke: isDark ? "#818cf8" : "#6366f1",
    },
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: themeColors.card, shadowOpacity: isDark ? 0.1 : 0.06 },
      ]}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>
        {title}
      </Text>

      <LineChart
        data={{ labels, datasets: [{ data }] }}
        width={screenWidth - 40}
        height={200}
        chartConfig={chartConfig}
        bezier
        fromZero
        yAxisLabel="Rp "
        style={{ borderRadius: 12, marginTop: 8 }}
        formatYLabel={(y) => formatCurrency(Number(y))}
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
