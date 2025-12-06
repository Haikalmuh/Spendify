// app/(tabs)/explore.tsx
import React, { useMemo, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useTransactions } from "@/src/context/TransactionsContext";
import FilterSelector from "@/components/explore/FilterSelector";
import SummaryCards from "@/components/explore/SummaryCards";
import SpendingLineChart from "@/components/explore/SpendingLineChart";
import CategoryPieChart from "@/components/explore/CategoryPieChart";
import WeeklyBarChart from "@/components/explore/WeeklyBarChart";
import TopCategories from "@/components/explore/TopCategories";
import EmptyState from "@/components/explore/EmptyState";

const chartColors = ["#6D28D9", "#1D4ED8", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444"];

export default function ExploreScreen() {
  const { transactions } = useTransactions();
  const [selected, setSelected] = useState<string>("this_month");

  // build month options from transactions
  const months = useMemo(() => {
    const set = new Set<string>();
    transactions.forEach((t) => {
      const d = new Date(t.date);
      set.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    });
    // convert to array sorted desc
    const arr = Array.from(set).sort((a, b) => b.localeCompare(a));
    return ["this_month", ...arr, "all"];
  }, [transactions]);

  const labels: Record<string, string> = useMemo(() => {
    const map: Record<string, string> = { this_month: "This month", all: "All time" };
    months.forEach((m) => {
      if (m === "this_month" || m === "all") return;
      const [y, mm] = m.split("-");
      const monthName = new Date(Number(y), Number(mm) - 1, 1).toLocaleString("id-ID", { month: "long" });
      map[m] = `${monthName} ${y}`;
    });
    return map;
  }, [months]);

  // helper to filter transactions by selected
  const filtered = useMemo(() => {
    if (selected === "all") return transactions;
    if (selected === "this_month") {
      const now = new Date();
      return transactions.filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
    }
    // selected format "YYYY-MM"
    const [y, mm] = selected.split("-");
    return transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getFullYear() === Number(y) && d.getMonth() + 1 === Number(mm);
    });
  }, [transactions, selected]);

  // totals
  const totalMonth = useMemo(() => filtered.reduce((s, t) => s + t.amount, 0), [filtered]);

  // count this filtered
  const transCount = filtered.length;

  // today & week totals
  const todayTotal = useMemo(() => {
    const today = new Date().toDateString();
    return filtered.filter((t) => new Date(t.date).toDateString() === today).reduce((s, t) => s + t.amount, 0);
  }, [filtered]);

  const weekTotal = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(); oneWeekAgo.setDate(now.getDate() - 6);
    return filtered.filter((t) => {
      const d = new Date(t.date);
      return d >= oneWeekAgo && d <= now;
    }).reduce((s, t) => s + t.amount, 0);
  }, [filtered]);

  // avg per day (based on selected scope)
  const avgPerDay = useMemo(() => {
    if (selected === "all") {
      if (transactions.length === 0) return 0;
      const dates = transactions.map((t) => new Date(t.date));
      const min = new Date(Math.min(...dates.map((d) => d.getTime())));
      const max = new Date(Math.max(...dates.map((d) => d.getTime())));
      const days = Math.max(1, Math.ceil((max.getTime() - min.getTime()) / (1000 * 60 * 60 * 24)));
      return Math.round(filtered.reduce((s, t) => s + t.amount, 0) / days);
    }
    // if specific month or this_month, days in that month
    let year = (new Date()).getFullYear();
    let month = (new Date()).getMonth();
    if (selected !== "this_month") {
      const [y, mm] = selected.split("-");
      year = Number(y); month = Number(mm) - 1;
    }
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Math.round(totalMonth / Math.max(1, daysInMonth));
  }, [filtered, selected, transactions, totalMonth]);

  // pie data (grouped)
  const pieData = useMemo(() => {
    const grouped: Record<string, number> = {};
    filtered.forEach((t) => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
    const arr = Object.keys(grouped).map((k, i) => ({ name: k, population: grouped[k], color: chartColors[i % chartColors.length] }));
    return arr;
  }, [filtered]);

  // weekly data for bar chart (last 7 days)
  const weekly = useMemo(() => {
    const now = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(now.getDate() - (6 - i)); return d;
    });
    const labels = days.map((d) => d.toLocaleDateString("id-ID", { day: "numeric" }));
    const values = days.map((day) => filtered.filter((t) => new Date(t.date).toDateString() === day.toDateString()).reduce((s, t) => s + t.amount, 0));
    return { labels, values };
  }, [filtered]);

  // line chart monthly trend (last 6 months)
  const line = useMemo(() => {
    const arr: { label: string; total: number; key: string }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
      const total = transactions.filter((t) => {
        const dd = new Date(t.date);
        return dd.getFullYear() === d.getFullYear() && dd.getMonth() === d.getMonth();
      }).reduce((s, t) => s + t.amount, 0);
      arr.push({ label: d.toLocaleString("id-ID", { month: "short" }), total, key });
    }
    return arr;
  }, [transactions]);

  // top 3 categories (from filtered)
  const top3 = useMemo(() => {
    const grouped: Record<string, number> = {};
    filtered.forEach((t) => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
    const total = Object.values(grouped).reduce((s, n) => s + n, 0) || 1;
    const items = Object.keys(grouped).map((k) => ({ name: k, amount: grouped[k], percent: (grouped[k] / total) * 100 }));
    const sorted = items.sort((a,b) => b.amount - a.amount).slice(0,3);
    return sorted;
  }, [filtered]);

  const hasData = filtered.length > 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Explore</Text>

      <FilterSelector months={months} labels={labels} selected={selected} onSelect={setSelected} />

      {!hasData ? (
        <View style={{ paddingTop: 40 }}>
          <EmptyState />
        </View>
      ) : (
        <>
          <SummaryCards today={todayTotal} week={weekTotal} month={totalMonth} count={transCount} avgPerDay={avgPerDay} />

          <SpendingLineChart labels={line.map(l => l.label)} data={line.map(l => l.total)} title="6 Bulan Terakhir" />

          <CategoryPieChart data={pieData.map(d => ({ name: d.name, population: d.population, color: d.color }))} />

          <WeeklyBarChart labels={weekly.labels} data={weekly.values} />

          <TopCategories items={top3} />
        </>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8FAFF" },
  header: { fontSize: 28, fontWeight: "700", marginBottom: 12, marginTop: 40, color: "#0f172a" },
});
