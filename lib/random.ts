export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Elige `count` elementos al azar, evitando `excludeIds` si quedan suficientes */
export function pickRandom<T extends { id: string }>(
  items: readonly T[],
  count: number,
  excludeIds: readonly string[],
): T[] {
  const available = items.filter((item) => !excludeIds.includes(item.id));
  const pool = available.length >= count ? available : items;
  return shuffle(pool).slice(0, count);
}
