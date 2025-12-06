// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

// Context Providers
import { TransactionsProvider } from "../src/context/TransactionsContext";
import { ThemeProvider } from "../src/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TransactionsProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Tab Navigation */}
          <Stack.Screen name="(tabs)" />

          {/* Add Expense Screen (modal) */}
          <Stack.Screen
            name="add-expense"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </TransactionsProvider>
    </ThemeProvider>
  );
}
