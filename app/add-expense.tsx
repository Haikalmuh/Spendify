import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTransactions } from "../src/context/TransactionsContext";
import { useThemeApp } from "@/src/context/ThemeContext";

export default function AddExpenseScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const { theme, themeColors } = useThemeApp();
  const isDark = theme === "dark";

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!title || !amount || !category) return;

    addTransaction({
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    });

    router.back();
  };

  // Dynamic colors
  const colors = {
    bg: themeColors.background,
    card: themeColors.card,
    text: themeColors.text,
    muted: themeColors.textMuted ?? (isDark ? "#94a3b8" : "#64748b"),
    border: themeColors.border,
    primary: themeColors.primary,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: colors.bg }]}
    >
      <Text style={[styles.header, { color: colors.text }]}>Add New Expense</Text>

      {/* Title */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.muted }]}>Title</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="e.g. Makan siang"
          placeholderTextColor={colors.muted}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Amount */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.muted }]}>Amount</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="e.g. 25000"
          placeholderTextColor={colors.muted}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Category */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.muted }]}>Category</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="e.g. Food, Transport, etc."
          placeholderTextColor={colors.muted}
          value={category}
          onChangeText={setCategory}
        />
      </View>

      {/* Save button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Save Expense</Text>
      </TouchableOpacity>

      {/* Cancel */}
      <TouchableOpacity onPress={() => router.back()} style={styles.cancelBtn}>
        <Text style={[styles.cancelText, { color: colors.muted }]}>Cancel</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 15,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelBtn: {
    marginTop: 16,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
  },
});
