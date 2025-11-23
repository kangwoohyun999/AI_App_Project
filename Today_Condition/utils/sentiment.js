import { WORD_DICT } from './wordDictionary';

export function estimateSentimentFromWeighted(weighted) {
  let score = 0;
  Object.keys(weighted || {}).forEach(key => {
    const w = weighted[key] || 0;
    const s = WORD_DICT[key] ? WORD_DICT[key].sentiment : 'neutral';
    if (s === 'positive') score += w;
    else if (s === 'negative') score -= w;
  });

  if (score > 0.3) return { label: 'positive', score };
  if (score < -0.3) return { label: 'negative', score };
  return { label: 'neutral', score: 0 };
}
