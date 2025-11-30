import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getMoodColors } from "../utils/storage";

export default function CalendarScreen({ navigation }) {
  const [moodColors, setMoodColors] = useState({});

  useEffect(() => {
    loadColors();
  }, []);

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
          const bg = moodColors[dateKey] || "#333";

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
