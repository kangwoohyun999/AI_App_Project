// utils/emotionToColor.js
export function emotionToColor(score) {
  // score는 0~1 사이 (긍정 확률 또는 "긍정 - 부정" 비율)

  if (score >= 0.7) return "#FFD93D"; // 긍정 ↑ 밝은 노랑
  if (score >= 0.4) return "#6BCB77"; // 중립에 가까운 초록
  if (score >= 0.2) return "#4D96FF"; // 우울/걱정 파랑
  return "#6A4C93"; // 부정 ↑ 진보라
}
