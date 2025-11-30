export const WORD_DICT = {
  행복: {
    synonyms: [
      "행복",
      "행복함",
      "행복해",
      "기쁨",
      "즐거움",
      "행복감",
      "좋음",
      "기분좋음",
      "신남",
      "신남!",
      "기분 짱",
    ],
    weight: 1.0,
    sentiment: "positive",
  },
  성취감: {
    synonyms: ["성취", "성취감", "만족", "보람", "해냈다"],
    weight: 0.9,
    sentiment: "positive",
  },
  편안: {
    synonyms: ["편안", "안정", "차분", "평온", "여유", "힐링"],
    weight: 0.8,
    sentiment: "positive",
  },
  감사: {
    synonyms: ["감사", "고맙", "고마움", "감동"],
    weight: 0.8,
    sentiment: "positive",
  },
  사랑: {
    synonyms: ["사랑", "좋아해", "사랑스러움", "애정"],
    weight: 1.0,
    sentiment: "positive",
  },

  우울: {
    synonyms: [
      "우울",
      "우울함",
      "슬퍼",
      "슬픔",
      "눈물",
      "울고싶",
      "침체",
      "기분안좋",
      "마음아픔",
    ],
    weight: 1.0,
    sentiment: "negative",
  },
  불안: {
    synonyms: ["불안", "초조", "걱정", "긴장", "두려움", "겁"],
    weight: 0.9,
    sentiment: "negative",
  },
  스트레스: {
    synonyms: ["스트레스", "압박", "과로", "부담", "짜증남", "머리 아픔"],
    weight: 1.0,
    sentiment: "negative",
  },
  피곤: {
    synonyms: ["피곤", "피로", "지침", "힘듦", "기진맥진", "탈진", "졸림"],
    weight: 0.8,
    sentiment: "negative",
  },
  화남: {
    synonyms: ["화남", "화나", "분노", "짜증", "열받", "빡침"],
    weight: 0.9,
    sentiment: "negative",
  },
  외로움: {
    synonyms: ["외로움", "외로워", "쓸쓸", "고독"],
    weight: 0.9,
    sentiment: "negative",
  },
  불행: {
    synonyms: ["불행", "불쾌", "짜증스러움", "기분나쁨"],
    weight: 1.0,
    sentiment: "negative",
  },
};
