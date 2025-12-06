// utils/format.ts
export function formatCurrency(num: number) {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    // fallback
    return "Rp " + Math.round(num).toLocaleString();
  }
}
