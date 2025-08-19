export function downsellPriceCents(cents: number) {
  if (cents === 2500) return 1500;
  if (cents === 2900) return 1900;
  return Math.max(0, cents - 1000);
}