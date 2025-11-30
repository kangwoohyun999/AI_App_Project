import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getMoodColors } from "../utils/storage";

function emotionToCalendarColor(sentiment) {
  if (sentiment === "positive") return "#4C8CFF"; // 파랑
  if (sentiment === "negative") return "#FF5C5C"; // 빨강
  if (sentiment === "neutral") return "#B26BFF"; // 보라
  return "#333"; // 기본색(기록 없을 때)
}

export default function CalendarScreen({ navigation }) {
  const [moodColors, setMoodColors] = useState({});

  useEffect(() => {
    loadColors();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadColors(); // 화면에 다시 들어올 때마다 새로 불러오기
    });

    return unsubscribe;
  }, [navigation]);

  const loadColors = async () => {
    const data = await getMoodColors();
    setMoodColors(data);
  };

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>감정 캘린더</Text>

      <View style={styles.grid}>
        {days.map((d) => {
          const dateKey = `2025-11-${String(d).padStart(2, "0")}`;
          const mood = moodColors[dateKey];
          const bg = emotionToCalendarColor(mood);

          return (
            <View key={d} style={[styles.day, { backgroundColor: bg }]}>
              <Text style={styles.dayText}>{d}</Text>
            </View>
          );
        })}
      </View>

      {/* 🔙 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#fff" }}>뒤로가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0b12", padding: 20 },
  title: { color: "#fff", fontSize: 22, marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  day: {
    width: "14.2%",
    aspectRatio: 1,
    margin: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: { color: "#fff" },
  backBtn: {
    marginTop: 20,
    backgroundColor: "#2a2430",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
