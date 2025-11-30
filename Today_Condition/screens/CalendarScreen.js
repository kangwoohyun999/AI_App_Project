import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getMoodColors } from "../utils/storage";

function emotionToColor(sentiment) {
  if (sentiment === "positive") return "#4C8CFF"; // 파랑
  if (sentiment === "negative") return "#FF5C5C"; // 빨강
  if (sentiment === "neutral") return "#B26BFF"; // 보라
  return "#2a2430"; // 기본 회색
}

export default function CalendarScreen({ navigation }) {
  const [moodColors, setMoodColors] = useState({});

  useEffect(() => {
    loadColors();
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener("focus", loadColors);
    return unsub;
  }, [navigation]);

  const loadColors = async () => {
    const data = await getMoodColors();
    setMoodColors(data);
  };

  const year = 2025;
  const month = 11; // 11월
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(`${year}-${month}-01`).getDay(); // 0=일요일

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null); // 시작 요일까지 빈칸
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>감정 캘린더</Text>

      {/* 요일 라벨 */}
      <View style={styles.weekRow}>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <Text key={day} style={styles.weekText}>
            {day}
          </Text>
        ))}
      </View>

      {/* 달력 Grid */}
      <View style={styles.grid}>
        {daysArray.map((d, idx) => {
          if (d === null)
            return <View key={idx} style={styles.dayEmpty}></View>;

          const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(
            d
          ).padStart(2, "0")}`;
          const mood = moodColors[dateKey];
          const bg = emotionToColor(mood);

          const isToday = dateKey === today;

          return (
            <View
              key={idx}
              style={[
                styles.dayBox,
                { backgroundColor: bg },
                isToday && styles.todayBorder,
              ]}
            >
              <Text style={styles.dayNumber}>{d}</Text>
            </View>
          );
        })}
      </View>

      {/* 뒤로가기 */}
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
  title: { color: "#fff", fontSize: 24, marginBottom: 20, textAlign: "center" },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  weekText: { color: "#bbb", width: "14.2%", textAlign: "center" },

  grid: { flexDirection: "row", flexWrap: "wrap" },

  dayEmpty: {
    width: "14.2%",
    aspectRatio: 1,
    marginVertical: 4,
  },

  dayBox: {
    width: "14.2%",
    aspectRatio: 1,
    marginVertical: 4,
    borderRadius: 10,
    justifyContent: "flex-start",
    padding: 6,
  },

  dayNumber: { color: "#fff", fontSize: 14 },

  todayBorder: {
    borderWidth: 2,
    borderColor: "#fff",
  },

  backBtn: {
    marginTop: 20,
    backgroundColor: "#2a2430",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
});
