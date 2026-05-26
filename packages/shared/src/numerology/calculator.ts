export const PYTHAGORAS_CHART: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

export const VOWELS = new Set(["A", "E", "I", "O", "U"]);
const MASTER_NUMBERS = new Set([11, 22, 33]);

export function normalizeVietnameseName(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase();
}

export function reduce(n: number, keepMaster = true): number {
  let current = Math.abs(Math.trunc(n));
  while (current > 9) {
    if (keepMaster && MASTER_NUMBERS.has(current)) return current;
    current = String(current)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current;
}

export function rawLetterSum(str: string): number {
  return normalizeVietnameseName(str)
    .split("")
    .reduce((sum, char) => sum + (PYTHAGORAS_CHART[char] ?? 0), 0);
}

export function wordSum(str: string, keepMaster = true): number {
  return reduce(rawLetterSum(str), keepMaster);
}

export function rawVowelSum(str: string): number {
  return normalizeVietnameseName(str)
    .split("")
    .reduce((sum, char) => sum + (VOWELS.has(char) ? PYTHAGORAS_CHART[char] ?? 0 : 0), 0);
}

export function vowelSum(str: string, keepMaster = true): number {
  return reduce(rawVowelSum(str), keepMaster);
}

export function rawConsonantSum(str: string): number {
  return normalizeVietnameseName(str)
    .split("")
    .reduce((sum, char) => {
      const value = PYTHAGORAS_CHART[char];
      if (!value || VOWELS.has(char)) return sum;
      return sum + value;
    }, 0);
}

export function consonantSum(str: string, keepMaster = true): number {
  return reduce(rawConsonantSum(str), keepMaster);
}
