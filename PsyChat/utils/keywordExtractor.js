import { WORD_DICT } from './wordDictionary';

export function extractKeywordsWithWeights(text) {
  if (!text) return { keywords: [], counts: {}, weighted: {} };
  const norm = text.toLowerCase().replace(/[.,!?;:()\[\]\"']/g, ' ');
  const tokens = norm.split(/\s+/).filter(Boolean);

  const counts = {};
  const weighted = {};

  tokens.forEach(token => {
    Object.keys(WORD_DICT).forEach(key => {
      const { synonyms, weight } = WORD_DICT[key];
      synonyms.forEach(syn => {
        if (token.includes(syn)) {
          counts[key] = (counts[key] || 0) + 1;
          weighted[key] = (weighted[key] || 0) + weight;
        }
      });
    });
  });

  const keywords = Object.keys(counts);
  return { keywords, counts, weighted };
}
