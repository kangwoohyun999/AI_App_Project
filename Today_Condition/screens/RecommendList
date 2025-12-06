import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RecommendList({ navigation }) {
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
      <Text style={styles.title}>🎧 추천받은 노래 목록</Text>

      <Text style={styles.noData}>아직 저장된 곡이 없습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  backBtn: { marginBottom: 15 },
  backText: { fontSize: 18 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  noData: { fontSize: 16, color: "#555" },
});
