// components/explore/FilterSelector.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

type Props = {
  months: string[]; // e.g. ['all','2025-11','2025-10', ...]
  labels: Record<string, string>;
  selected: string;
  onSelect: (v: string) => void;
};

export default function FilterSelector({ months, labels, selected, onSelect }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 4 }}>
        {months.map((m) => {
          const active = m === selected;
          return (
            <TouchableOpacity
              key={m}
              onPress={() => onSelect(m)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{labels[m] ?? m}</Text>
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
    backgroundColor: "#F1F5F9",
    borderRadius: 999,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: "#EEF2FF",
    borderWidth: 0,
  },
  chipText: {
    color: "#334155",
    fontWeight: "600",
    fontSize: 13,
  },
  chipTextActive: {
    color: "#3730A3",
  },
});
