export const WORD_DICT = {
  '행복': { synonyms: ['행복', '기쁨', '즐거움', '행복감', '좋음', '기분좋음'], weight: 1.0, sentiment: 'positive' },
  '성취감': { synonyms: ['성취', '성취감', '만족', '보람'], weight: 0.9, sentiment: 'positive' },
  '우울': { synonyms: ['우울', '슬퍼', '슬픔', '침체', '기분안좋'], weight: 1.0, sentiment: 'negative' },
  '불안': { synonyms: ['불안', '초조', '걱정', '긴장'], weight: 0.9, sentiment: 'negative' },
  '스트레스': { synonyms: ['스트레스', '압박', '과로', '부담'], weight: 1.0, sentiment: 'negative' },
  '피곤': { synonyms: ['피곤', '피로', '힘듦', '졸림'], weight: 0.8, sentiment: 'negative' },
  '화남': { synonyms: ['화남', '분노', '짜증'], weight: 0.9, sentiment: 'negative' },
  '편안': { synonyms: ['편안', '안정', '차분'], weight: 0.8, sentiment: 'positive' },
};
