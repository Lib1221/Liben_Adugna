export interface SearchableItem<T> {
  item: T;
  text: string;
  keywords?: string[];
}

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string): string[] => normalize(value).split(" ").filter(Boolean);

const levenshteinDistance = (a: string, b: string): number => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[a.length][b.length];
};

const wordScore = (queryToken: string, candidateToken: string): number => {
  if (!queryToken || !candidateToken) return 0;
  if (queryToken === candidateToken) return 120;
  if (candidateToken.startsWith(queryToken)) return 85;
  if (candidateToken.includes(queryToken)) return 65;

  const distance = levenshteinDistance(queryToken, candidateToken);
  const maxLen = Math.max(queryToken.length, candidateToken.length);
  const similarity = 1 - distance / maxLen;

  if (similarity >= 0.82) return 55;
  if (similarity >= 0.7) return 35;
  return 0;
};

const computeScore = (query: string, text: string, keywords: string[] = []): number => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 1;

  const queryTokens = tokenize(normalizedQuery);
  if (!queryTokens.length) return 1;

  const normalizedText = normalize(text);
  const textTokens = tokenize(normalizedText);
  const keywordTokens = keywords.flatMap((keyword) => tokenize(keyword));
  const candidateTokens = [...textTokens, ...keywordTokens];
  if (!candidateTokens.length) return 0;

  let score = 0;

  queryTokens.forEach((queryToken) => {
    let best = 0;
    candidateTokens.forEach((candidateToken) => {
      best = Math.max(best, wordScore(queryToken, candidateToken));
    });
    score += best;
  });

  if (normalizedText.includes(normalizedQuery)) score += 45;
  if (keywords.some((keyword) => normalize(keyword).includes(normalizedQuery))) score += 30;

  return score;
};

export const rankSearchResults = <T>(
  items: SearchableItem<T>[],
  query: string,
): Array<{ item: T; score: number }> => {
  const normalizedQuery = normalize(query);

  const scored = items.map(({ item, text, keywords }) => ({
    item,
    score: computeScore(normalizedQuery, text, keywords),
  }));

  if (!normalizedQuery) {
    return scored;
  }

  return scored
    .filter((result) => result.score >= 40)
    .sort((a, b) => b.score - a.score);
};
