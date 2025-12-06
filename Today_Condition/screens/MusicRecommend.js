import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MusicRecommend({ route, navigation }) {
  const { mood } = route.params;

  const badList = [
    "비오는 날 듣는 우울 노래1",
    "슬픈 감성 발라드2",
    "공허한 감성곡3",
  ];
  const goodList = ["신나는 팝1", "기분 좋은 댄스곡2", "여름 청량 음악3"];

  const songs = mood === "bad" ? badList : goodList;

  return (
    <View style={styles.container}>
      {/* 🔙 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← 뒤로가기</Text>
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>
        {mood === "bad" ? "😞 기분 안좋은 날 추천곡" : "😊 기분 좋은 날 추천곡"}
      </Text>

      {/* 추천 목록 */}
      {songs.map((s, i) => (
        <Text key={i} style={styles.song}>
          • {s}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { marginBottom: 15 },
  backText: { fontSize: 18 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  song: { fontSize: 18, marginVertical: 6 },
});
