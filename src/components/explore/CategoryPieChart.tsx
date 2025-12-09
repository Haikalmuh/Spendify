// components/explore/CategoryPieChart.tsx
import { useThemeApp } from "@/src/context/ThemeContext";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type PieItem = { name: string; population: number; color: string };

type Props = {
  data: PieItem[];
  title?: string;
};

export default function CategoryPieChart({
  data,
  title = "Pengeluaran per Kategori",
}: Props) {
  const { theme, themeColors } = useThemeApp();
  const isDark = theme === "dark";

  const chartConfig = {
    backgroundGradientFrom: themeColors.card,
    backgroundGradientTo: themeColors.card,
    color: (opacity = 1) =>
      isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`,
    labelColor: () => themeColors.textMuted,
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColors.card,
          shadowOpacity: isDark ? 0.1 : 0.06,
        },
      ]}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>

      {data.length === 0 ? (
        <Text style={{ color: themeColors.textMuted, marginTop: 8 }}>
          Belum ada data kategori
        </Text>
      ) : (
        <PieChart
          data={data.map((d) => ({
            name: d.name,
            population: d.population,
            color: d.color,

            // tambahkan ini agar teks legend mengikuti tema
            legendFontColor: themeColors.text,
            legendFontSize: 13,
          }))}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
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
